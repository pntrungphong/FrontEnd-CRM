import { stringify } from 'querystring';
import { history } from 'umi';
import { login } from '@/services/login';
import { setAuthority, setToken, removeToken } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';


const Model = {
  namespace: 'login',
  state: {
    status: undefined
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response && response.token) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const link = getRedirectLink();
        window.location.replace(link || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/login' && !redirect) {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        removeToken();
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      message.success('Đăng nhập thành công');
      setToken(payload.token.accessToken);
      setAuthority(payload.user.role.toLowerCase());
      return { ...state, status: 'ok' };
    },
  },
};

function getRedirectLink() {
  const urlParams = new URL(window.location.href);
  let { redirect } = getPageQuery();

  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/';
      return '/';
    }
  }
  return redirect;
}
export default Model;

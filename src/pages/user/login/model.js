import { history } from 'umi';
import { message } from 'antd';
import { fakeAccountLogin } from './service';
import {setToken} from '../../../utils/authority'

const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
    token:undefined
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
    },
  },
  
  reducers: {
   
    changeLoginStatus(state, { payload }) {
      message.success('Đăng nhập thành công');
      history.push('Welcome');
      setToken(payload.token);
      return { ...state};
   },
  },
};
export default Model;

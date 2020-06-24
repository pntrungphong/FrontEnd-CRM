import { history } from 'umi';
import { message } from 'antd';
import { fakeUpdate, loadUser } from './service';

const Model = {
  namespace: 'companyAndupdate',
  state: {
    data: undefined,
  },
  effects: {
    *submit({ payload }, { call }) {
      // const response =
      yield call(fakeUpdate, payload);
      // console.table(response);
      history.push({
        pathname: '/company',
      });
      message.success('Cập nhật Company thành công');
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(loadUser, payload);

      yield put({
        type: 'loadHandle',
        payload: response,
      });
    },
  },
  reducers: {
    loadHandle(state, { payload }) {
      return { ...state, data: payload };
    },
  },
};
export default Model;

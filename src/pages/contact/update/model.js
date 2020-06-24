import { history } from 'umi';
import { message } from 'antd';
import { updateContact, loadContact } from './service';

const Model = {
  namespace: 'updateContact',
  state: {
    data: undefined,
  },
  effects: {
    *submit({ payload }, { call }) {
      // const response =
      yield call(updateContact, payload);
      // console.table(response);
      history.push({
        pathname: '/contact',
      });
      message.success('Cập nhật Contact thành công');
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(loadContact, payload);

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

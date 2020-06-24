import { message } from 'antd';
import { createContact, getContact } from './service';

const Model = {
  namespace: 'contact',
  state: {
    visible: false,
    contactInfo: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(createContact, payload);
      console.table(response);

      yield put({
        type: 'modalHandle',
        payload: false,
      });
      message.success('Tạo Contact thành công');

      yield put({
        type: 'loadData',
      });
    },
    *loadData(_, { call, put }) {
      const response = yield call(getContact);
      console.table(response.data);
      yield put({
        type: 'contactHandle',
        payload: response.data,
      });
    },
  },
  reducers: {
    modalHandle(state, { payload }) {
      return { ...state, visible: payload };
    },

    contactHandle(state, { payload }) {
      return { ...state, contactInfo: payload };
    },
  },
};

export default Model;

import { message } from 'antd';
import { history } from 'umi';
import {
  createContact,
  getContact,
  updateContact,
  getContactById,
  fullCreateContact,
} from '../services/contact';

const Model = {
  namespace: 'contact',
  state: {
    visible: false,
    contactInfo: undefined,
    data: undefined,
  },
  effects: {
    *create({ payload }, { call, put }) {
      // const response =
      yield call(createContact, payload);

      yield put({
        type: 'handleCreateModal',
        payload: false,
      });
      message.success('Tạo Contact thành công');

      yield put({
        type: 'loadListContact',
      });
    },
    *loadListContact(_, { call, put }) {
      const response = yield call(getContact);

      yield put({
        type: 'saveCompanyInfo',
        payload: response.data,
      });
    },
    *fullCreate({ payload }, { call }) {
      // const response =
      yield call(fullCreateContact, payload);

      message.success('Tạo Contact thành công');
      history.push({
        pathname: '/contact/',
      });
    },
    *update({ payload }, { call }) {
      // const response =
      yield call(updateContact, payload);
      // console.table(response);
      history.push({
        pathname: '/contact',
      });
      message.success('Cập nhật Contact thành công');
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(getContactById, payload);

      yield put({
        type: 'loadContact',
        payload: response,
      });
    },
  },
  reducers: {
    loadContact(state, { payload }) {
      return { ...state, data: payload };
    },
    cleanData(state) {
      return { ...state, data: undefined };
    },
    handleCreateModal(state, { payload }) {
      return { ...state, visible: payload };
    },

    saveCompanyInfo(state, { payload }) {
      return { ...state, contactInfo: payload };
    },
  },
};

export default Model;

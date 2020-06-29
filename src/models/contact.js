import { message } from 'antd';
import { history } from 'umi';

import {
  createContact,
  getContact,
  updateContact,
  getContactById,
  fullCreateContact,
  getContactByName,
} from '../services/contact';
import { getCompanyByName } from '../services/company';

const Model = {
  namespace: 'contact',
  state: {
    visible: false,
    contactInfo: undefined,
    data: undefined,
    listCompany: [],
    searchValue: [],
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
    *searchCompanyByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getCompanyByName, payload.value);

      if (response != null) {
        yield put({
          type: 'saveListCompany',
          payload: response.data,
        });
      }
    },
    *searchContactByName({ payload }, { call, put }) {
      if (payload.value === '') return;

      const response = yield call(getContactByName, payload);

      if (response != null) {
        yield put({
          type: 'saveContactInfo',
          payload: response.data,
        });
      }
    },
    *loadListContact(_, { call, put }) {
      const response = yield call(getContact);
      console.table(response.data);
      if (response != null) {
        yield put({
          type: 'saveContactInfo',
          payload: response.data,
        });
      }
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
    saveListCompany(state, { payload }) {
      return { ...state, listCompany: payload };
    },
    handleCreateModal(state, { payload }) {
      return { ...state, visible: payload };
    },
    handleSearchChange(state, { payload }) {
      return { ...state, searchValue: payload.value, listCompany: payload.listCompany };
    },

    saveContactInfo(state, { payload }) {
      return { ...state, contactInfo: payload };
    },
  },
};

export default Model;

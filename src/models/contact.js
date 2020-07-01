import { message } from 'antd';
import { history } from 'umi';

import {
  createContact,
  getContact,
  updateContact,
  getContactById,
  fullCreateContact,
} from '../services/contact';
import { getCompanyByName } from '../services/company';

const Model = {
  namespace: 'contact',
  state: {
    visible: false,
    contactInfo: [],
    data: undefined,
    searchContactValue: '',
    itemCount: undefined,
    listCompany: [],
    searchValue: [],
    searchValueContactReferral: [],
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
    *searchContactReferralByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getContact, payload);

      if (response != null) {
        yield put({
          type: 'saveListContactReferral',
          payload: response.data,
        });
      }
    },
    *searchContactByName(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      if (payload.value === '') return;
      yield put({
        type: 'saveContactSearchValue',
        payload: payload.searchValue,
      });
      const response = yield call(getContact, payload);

      if (response != null) {
        yield put({
          type: 'saveContactInfo',
          payload: response,
        });
      }
    },
    *loadListContact(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      const response = yield call(getContact, payload);

     
      if (response != null) {
        yield put({
          type: 'saveContactInfo',
          payload: response,
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
    saveListContact(state, { payload }) {
      return { ...state, list: payload };
    },
    saveListContactReferral(state, { payload }) {
      return { ...state, contactInfo: payload };
    },
    handleCreateModal(state, { payload }) {
      return { ...state, visible: payload };
    },
    handleSearchChange(state, { payload }) {
      return { ...state, searchValue: payload.value, listCompany: payload.listCompany };
    },
    handleSearchChangeContactReferral(state, { payload }) {
      return {
        ...state,
        searchValueContactReferral: payload.value,
        contactInfo: payload.contactInfo,
      };
    },
    saveContactInfo(state, { payload }) {
      return {
        ...state,
        contactInfo: payload.data,
        itemCount: payload.meta.itemCount,
        currentPage: payload.meta.page,
      };
    },
    saveContactSearchValue(state, { payload }) {
      return { ...state, searchContactValue: payload };
    },
  },
};

export default Model;

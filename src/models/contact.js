import { message } from 'antd';
import { history } from 'umi';
import { formatedListContactData, formatedDetailContactData } from './utils';
import {
  getContact,
  updateContact,
  getContactById,
  fullCreateContact,
  quickCreateContact as quickCreateContactServices,
} from '../services/contact';
import { getCompanyByName } from '../services/company';

const Model = {
  namespace: 'contact',
  state: {
    contactInfo: [],
    data: undefined,
    searchContactValue: '',
    itemCount: undefined,
    listCompany: [],
    searchValue: [],
    searchValueContactReferral: [],
  },
  effects: {
    *searchCompanyByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getCompanyByName, payload.value);
      const formatedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id.toString(),
          label: element.name,
          value: element.id.toString(),
        };
        formatedData.push(data);
      });
      if (response != null) {
        yield put({
          type: 'saveListCompany',
          payload: formatedData,
        });
      }
    },
    *searchContactReferralByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getContact, payload);
      const formatedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id.toString(),
          label: element.name,
          value: element.id.toString(),
        };
        formatedData.push(data);
      });

      if (response != null) {
        yield put({
          type: 'saveListContactReferral',
          payload: formatedData,
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
      yield put({
        type: 'saveContactSearchValue',
        payload: payload.searchValue,
      });
      const response = yield call(getContact, payload);

      if (response != null) {
        yield put({
          type: 'saveContactInfo',
          payload: formatedListContactData(response),
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
          payload: formatedListContactData(response),
        });
      }
    },
    *fullCreate({ payload }, { call }) {
      // const response =
      yield call(fullCreateContact, payload);

      message.success('Successfully');
      history.push({
        pathname: '/contact/',
      });
    },
    *quickCreateContact({ payload }, { call }) {
      const createdContact = yield call(quickCreateContactServices, payload);
      if (createdContact.id) {
        const value = {
          value: createdContact.id.toString(),
          label: createdContact.name,
          key: createdContact.id.toString(),
        };
        return value;
      }
      return null;
    },

    *update({ payload }, { call }) {
      // const response =
      yield call(updateContact, payload);
      // console.table(response);
      history.push({
        pathname: '/contact',
      });
      message.success('Successfully');
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(getContactById, payload);

      yield put({
        type: 'loadContact',
        payload: formatedDetailContactData(response),
      });
    },
  },
  reducers: {
    loadContact(state, { payload }) {
      return { ...state, data: payload };
    },
    cleanData(state) {
      return { ...state, contactInfo: [], data: undefined };
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
    handleQuickCreate(state, { payload }) {
      return { ...state, searchValueContactReferral: payload };
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
        itemCount: payload.itemCount,
      };
    },
    saveContactSearchValue(state, { payload }) {
      return { ...state, searchContactValue: payload };
    },
    showContact(state, { payload }) {
      return { ...state, data: payload };
    },
  },
};

export default Model;

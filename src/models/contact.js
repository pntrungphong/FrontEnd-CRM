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

const Model = {
  namespace: 'contact',
  state: {
    contactInfo: [],
    data: undefined,
    searchContactValue: '',
    itemCount: undefined,
    searchValue: [],
  },
  effects: {
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
      yield call(updateContact, payload);
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
  },
};

export default Model;

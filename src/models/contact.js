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

const ContactModel = {
  namespace: 'contact',
  state: {
    list: [],
    detail: undefined,
    itemCount: undefined,
    searchValue: '',
  },
  effects: {
    *searchByName(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      yield put({
        type: 'saveSearchValue',
        payload: payload.searchValue,
      });
      const response = yield call(getContact, payload);
      if (response != null) {
        yield put({
          type: 'saveList',
          payload: formatedListContactData(response),
        });
      }
    },
    *getList(
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
          type: 'saveList',
          payload: formatedListContactData(response),
        });
      }
    },
    *create({ payload }, { call }) {
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
    *get({ payload }, { call, put }) {
      const response = yield call(getContactById, payload);
      yield put({
        type: 'loadContact',
        payload: formatedDetailContactData(response),
      });
    },
  },
  reducers: {
    loadContact(state, { payload }) {
      return { ...state, detail: payload };
    },
    cleanData(state) {
      return { ...state, list: [], detail: undefined };
    },
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload.list,
        itemCount: payload.itemCount,
      };
    },
    saveSearchValue(state, { payload }) {
      return { ...state, searchValue: payload };
    },
  },
};

export default ContactModel;

import { message } from 'antd';
import { history } from 'umi';
import { formatListContactData, formatDetailContactData } from './utils';
import { getContact, updateContact, getContactById, fullCreateContact } from '../services/contact';

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
          payload: formatListContactData(response),
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
          payload: formatListContactData(response),
        });
      }
    },
    *create({ payload }, { call }) {
      const response = yield call(fullCreateContact, payload);
      if (response && response.id) {
        message.success('Successfully');
        history.push({
          pathname: '/contact/',
        });
      }
    },
    *quickCreateContact({ payload }, { call }) {
      const createdContact = yield call(fullCreateContact, payload);
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
      const response = yield call(updateContact, payload);
      if (response && response.id) {
        history.push({
          pathname: '/contact',
        });
        message.success('Successfully');
      }
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getContactById, payload);
      yield put({
        type: 'loadContact',
        payload: formatDetailContactData(response),
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

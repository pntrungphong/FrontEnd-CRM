import { message } from 'antd';
import { history } from 'umi';
import { formatListCompanyData, formatDetailCompanyData } from './utils';
import {
  getCompany,
  updateCompany,
  getDetail,
  createCompany,
  quickCreateCompany as quickCreateCompanyServices,
} from '../services/company';

const Model = {
  namespace: 'company',
  state: {
    list: undefined,
    detail: undefined,
    itemCount: undefined,
    searchValue: '',
  },
  effects: {
    *create({ payload }, { call }) {
      const response = yield call(createCompany, payload);
      if (response && response.id) {
        message.success('Successfully');
        history.push({
          pathname: '/company/',
        });
      }
    },
    *quickCreateCompany({ payload }, { call }) {
      const createdCompany = yield call(quickCreateCompanyServices, payload);
      if (createdCompany.id) {
        const value = {
          value: createdCompany.id.toString(),
          label: createdCompany.name,
          key: createdCompany.id.toString(),
        };
        return value;
      }
      return null;
    },
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
      const response = yield call(getCompany, payload);
      if (response != null) {
        yield put({
          type: 'saveList',
          payload: formatListCompanyData(response),
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
      const response = yield call(getCompany, payload);
      if (response != null) {
        yield put({
          type: 'saveList',
          payload: formatListCompanyData(response),
        });
      }
    },
    *update({ payload }, { call }) {
      const response = yield call(updateCompany, payload);
      if (response && response.id) {
        history.push({
          pathname: '/company',
        });
        message.success('Successfully');
      }
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      yield put({
        type: 'saveDetail',
        payload: formatDetailCompanyData(response),
      });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      return { ...state, list: payload.data, itemCount: payload.itemCount };
    },
    saveDetail(state, { payload }) {
      return { ...state, detail: payload };
    },
    cleanDetail(state) {
      return { ...state, detail: undefined };
    },
    saveSearchValue(state, { payload }) {
      return { ...state, searchValue: payload };
    },
  },
};

export default Model;

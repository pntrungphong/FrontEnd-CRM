import { message } from 'antd';
import { history } from 'umi';
import { formatedListCompanyData } from './utils';
import { getCompany, updateCompany, getCompanyById, fullCreateCompany } from '../services/company';

const Model = {
  namespace: 'company',
  state: {
    companyInfo: undefined,
    data: undefined,
    itemCount: undefined,
    searchCompanyValue: '',
  },
  effects: {
    *fullCreate({ payload }, { call, put }) {
      yield call(fullCreateCompany, payload);

      message.success('Tạo Company thành công');
      history.push({
        pathname: '/company/',
      });
      yield put({
        type: 'loadListCompany',
      });
    },
    *searchCompanyByName(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      yield put({
        type: 'saveCompanySearchValue',
        payload: payload.searchValue,
      });
      console.table(payload.searchValue);
      const response = yield call(getCompany, payload);

      if (response != null) {
        yield put({
          type: 'saveCompanyInfo',
          payload: formatedListCompanyData(response),
        });
      }
    },
    *loadListCompany(
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
          type: 'saveCompanyInfo',
          payload: formatedListCompanyData(response),
        });
      }
    },
    *update({ payload }, { call }) {
      yield call(updateCompany, payload);

      history.push({
        pathname: '/company',
      });
      message.success('Cập nhật Company thành công');
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(getCompanyById, payload);

      yield put({
        type: 'loadCompany',
        payload: response,
      });
    },
  },
  reducers: {
    saveCompanyInfo(state, { payload }) {
      return { ...state, companyInfo: payload.data, itemCount: payload.itemCount };
    },
    handleCreateModal(state, { payload }) {
      return { ...state, visible: payload };
    },
    loadCompany(state, { payload }) {
      return { ...state, data: payload };
    },
    cleanData(state) {
      return { ...state, data: undefined };
    },
    saveCompanySearchValue(state, { payload }) {
      return { ...state, searchCompanyValue: payload };
    },
  },
};

export default Model;

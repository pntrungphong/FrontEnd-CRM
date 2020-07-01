import { message } from 'antd';
import { history } from 'umi';
import {
  createCompany,
  getCompany,
  updateCompany,
  getCompanyById,
  fullCreateCompany,
} from '../services/company';

const Model = {
  namespace: 'company',
  state: {
    companyInfo: undefined,
    visible: false,
    data: undefined,
  },
  effects: {
    *create({ payload }, { call, put }) {
      // const response =
      yield call(createCompany, payload);

      yield put({
        type: 'handleCreateModal',
        payload: false,
      });
      message.success('Tạo Company thành công');

      yield put({
        type: 'loadListCompany',
      });
    },
    *fullCreate({ payload }, { call }) {
      // const response =
      yield call(fullCreateCompany, payload);

      message.success('Tạo Company thành công');
      history.push({
        pathname: '/company/',
      });
    },
    *loadListCompany(_, { call, put }) {
      const response = yield call(getCompany);
      yield put({
        type: 'saveCompanyInfo',
        payload: response.data,
      });
      console.table(response);
    },
    *update({ payload }, { call }) {
      // const response =
      yield call(updateCompany, payload);
      // console.table(response);
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
      return { ...state, companyInfo: payload };
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
  },
};

export default Model;

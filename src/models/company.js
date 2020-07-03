import { message } from 'antd';
import { history } from 'umi';
import { getCompany, updateCompany, getCompanyById, fullCreateCompany } from '../services/company';

const Model = {
  namespace: 'company',
  state: {
    companyInfo: undefined,
    data: undefined,
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
    *loadListCompany(_, { call, put }) {
      const response = yield call(getCompany);
      yield put({
        type: 'saveCompanyInfo',
        payload: response.data,
      });
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

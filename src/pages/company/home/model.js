import { message } from 'antd';
import { createCompany, getCompany } from './service';

const Model = {
  namespace: 'company',
  state: {
    companyInfo: undefined,
    visible: false,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      // const response =
      yield call(createCompany, payload);

      yield put({
        type: 'modalHandle',
        payload: false,
      });
      message.success('Tạo Company thành công');

      yield put({
        type: 'loadData',
      });
    },
    *loadData(_, { call, put }) {
      const response = yield call(getCompany);
      console.table(response.data);
      yield put({
        type: 'companyHandle',
        payload: response.data,
      });
    },
  },
  reducers: {
    companyHandle(state, { payload }) {
      return { ...state, companyInfo: payload };
    },
    modalHandle(state, { payload }) {
      return { ...state, visible: payload };
    },
  },
};

export default Model;

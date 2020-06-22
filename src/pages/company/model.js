import { fakeCompany } from './service';

const Model = {
  namespace: 'company',
  state: {
    code: undefined,
    companyInfor: undefined,
  },
  effects: {
    *loadData({ payload }, { call, put }) {
      const response = yield call(fakeCompany, payload);
      console.table(response.data);
      yield put({
        type: 'companyHandle',
        payload: response,
      });
    },
  },

  reducers: {
    companyHandle(state, { payload }) {
      return { ...state, code: payload.code, companyInfor: payload.data };
    },
  },
};
export default Model;

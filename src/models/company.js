import { queryCompanyProfile } from '@/services/companyDetails';

const Model = {
  namespace: 'companyModel',
  state: {
    companyInfo: undefined,
  },
  effects: {
    *loadInfo(_, { call, put }) {
      const response = yield call(queryCompanyProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },
  reducers: {
    show(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;

import { queryContactProfile } from '@/services/contactDetails';

const Model = {
  namespace: 'contactModel',
  state: {
    contactInfo: undefined,
  },
  effects: {
    *loadInfo(_, { call, put }) {
      const response = yield call(queryContactProfile);
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

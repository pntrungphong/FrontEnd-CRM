import { getContracts } from '@/services/contract';
import merge from 'lodash/merge';
import keyBy from 'lodash/keyBy';
import { getDefaultPagination, setPagination } from './utils';

const ContractModel = {
  namespace: 'contract',
  state: {
    byId: {},
    allIds: [],
    currentPageIds: [],
    pagination: getDefaultPagination(),
  },
  effects: {
    *getContracts({ payload }, { call, put }) {
      // TODO: Inject pagination to this request
      const response = yield call(getContracts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        byId: merge({}, state.byId, keyBy(payload.results, 'id')),
        currentPageIds: payload.results.map((contract) => contract.id),
        pagination: setPagination(payload),
      };
    },
  },
};
export default ContractModel;

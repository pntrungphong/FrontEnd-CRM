import { getContact, quickCreateContact } from '../services/contact';
import { getCompany, quickCreateCompany } from '../services/company';

const searchMethod = {
  contact: getContact,
  company: getCompany,
};
const quickCreateMethod = {
  contact: quickCreateContact,
  company: quickCreateCompany,
};

const QuickCreateModel = {
  namespace: 'quickCreate',
  state: {
    listSearchData: [], // contact/company
    searchValue: [],
  },
  effects: {
    *getListDataRelated({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(searchMethod[payload.searchType], {
        page: 1,
        searchValue: payload.value,
      });
      if (response != null) {
        yield put({
          type: 'updateListSearchData',
          payload: response.data,
        });
      }
    },
    *quickCreate({ payload }, { call }) {
      if (payload.name === '') return null;
      const response = yield call(quickCreateMethod[payload.createType], {
        name: payload.name,
      });
      if (response != null) {
        const result = { key: response.id, label: response.name, value: response.id };
        return result;
      }
      return null;
    },
  },

  reducers: {
    saveLeadSearchValue(state, { payload }) {
      return { ...state, leadSearchValue: payload };
    },
    updateListSearchData(state, { payload }) {
      const listSearchData = payload.map((it) => ({
        key: it.id,
        label: it.name,
        value: it.id,
      }));
      return { ...state, listSearchData };
    },
    clearListSearchData(state) {
      return { ...state, searchValue: [], listSearchData: [] };
    },
  },
};

export default QuickCreateModel;

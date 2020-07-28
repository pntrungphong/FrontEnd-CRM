import { message } from 'antd';
import { formatedListLeadData, formatedDetailLeadData } from './utils';
import { getContact } from '../services/contact';
import { createTouchpoint } from '../services/touchpoint';
import { fullCreateLead, getLead, getLeadById, updateLead } from '../services/lead';
import { getCompany } from '../services/company';

const searchMethod = {
  contact: getContact,
  company: getCompany,
};

const Model = {
  namespace: 'lead',
  state: {
    leadInfo: [],
    data: undefined,
    itemCount: undefined,
    listSearchData: [], // contact/company
    searchValue: [],
    touchpointList: [],
    listFile: [],
    listTouchpoint: [],
    status: '',
    leadSearchValue: '',
    viewable: false,
  },
  effects: {
    *fullCreate({ payload }, { call, put }) {
      const response = yield call(fullCreateLead, payload);
      if (response && response.id) {
        message.success('Successfully');
        const loadListResponse = yield call(getLead, {
          page: 1,
          searchValue: '',
          status: 'In-progress',
        });
        if (loadListResponse != null) {
          yield put({
            type: 'saveLeadInfo',
            payload: formatedListLeadData(loadListResponse),
          });
        }
      }
    },
    *createTouchpoint({ payload }, { call, put }) {
      const createTouchpointResponse = yield call(createTouchpoint, payload.id);
      if (createTouchpointResponse) {
        message.success('Successfully');
        const response = yield call(getLead, {
          page: 1,
          searchValue: payload.searchValue,
          status: payload.status,
        });
        if (response != null) {
          yield put({
            type: 'saveLeadInfo',
            payload: formatedListLeadData(response),
          });
        }
      } else {
        message.error('Failed');
      }
    },
    *loadListLead(
      {
        payload = {
          page: 1,
          searchValue: '',
          status: 'In-progress',
        },
      },
      { call, put },
    ) {
      const response = yield call(getLead, payload);
      if (response != null) {
        yield put({
          type: 'saveLeadInfo',
          payload: formatedListLeadData(response),
        });
      }
    },
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
    *loading({ payload }, { call, put }) {
      const response = yield call(getLeadById, payload);
      yield put({
        type: 'loadLead',
        payload: formatedDetailLeadData(response),
      });
    },
    *searchLeadByName(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      yield put({
        type: 'saveLeadSearchValue',
        payload: payload.searchValue,
      });
      const response = yield call(getLead, payload);

      if (response != null) {
        yield put({
          type: 'saveLeadInfo',
          payload: formatedListLeadData(response),
        });
      }
    },

    *update({ payload }, { call, put }) {
      const response = yield call(updateLead, payload);
      if (response && response.id) {
        message.success('Successfully');
        const loadListResponse = yield call(getLead, {
          page: 1,
          searchValue: '',
          status: 'In-progress',
        });
        if (loadListResponse != null) {
          yield put({
            type: 'saveLeadInfo',
            payload: formatedListLeadData(loadListResponse),
          });
        }
      }
    },
  },

  reducers: {
    cleanData(state) {
      return { ...state, leadInfo: [], data: undefined };
    },
    cleanLeadData(state) {
      return { ...state, data: undefined };
    },
    cleanListLead(state) {
      return { ...state, leadInfo: [] };
    },
    loadLead(state, { payload }) {
      return { ...state, data: payload };
    },
    saveLeadInfo(state, { payload }) {
      return {
        ...state,
        leadInfo: payload.data,
        itemCount: payload.itemCount,
        touchpointList: payload.touchpointList,
      };
    },
    saveStatus(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
    saveLeadSearchValue(state, { payload }) {
      return { ...state, leadSearchValue: payload };
    },
    saveListFile(state, { payload }) {
      return { ...state, listFile: payload };
    },
    saveListTouchpoint(state, { payload }) {
      return { ...state, listTouchpoint: payload };
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
    handleCompleteTouchpoint(state, { payload }) {
      return { ...state, viewable: payload.viewable };
    },
    showCompleteModal(state, { payload }) {
      return { ...state, viewable: payload.viewable };
    },
    showCompleteWinModal(state, { payload }) {
      return { ...state, viewable: payload.viewable };
    },
    showCompleteLoseModal(state, { payload }) {
      return { ...state, viewable: payload.viewable };
    },

    handlecancelCompleteTouchpoint(state, { payload }) {
      return { ...state, viewable: payload.viewable };
    },
  },
};

export default Model;

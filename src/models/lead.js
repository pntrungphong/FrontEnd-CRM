import { message } from 'antd';
import { formatListLeadData, formatDetailLeadData, formatListLeadDashboard } from './utils';
import { getContact } from '../services/contact';
import { createTouchPoint } from '../services/touchpoint';
import {
  fullCreateLead,
  getLead,
  getLeadById,
  updateLead,
  getListWithLane,
} from '../services/lead';
import { getCompany } from '../services/company';

const searchMethod = {
  contact: getContact,
  company: getCompany,
};

const Model = {
  namespace: 'lead',
  state: {
    list: [],
    detail: undefined,
    itemCount: undefined,
    listSearchData: [],
    searchValue: '',
    status: '',
  },
  effects: {
    *create({ payload }, { call, put }) {
      const response = yield call(fullCreateLead, payload);
      if (response && response.id) {
        message.success('Successfully');
        yield put({
          type: 'getList',
          payload: {
            page: 1,
            searchValue: '',
            status: 'In-progress',
          },
        });
      }
    },
    *createTouchPoint({ payload }, { call, put }) {
      const createTouchPointResponse = yield call(createTouchPoint, payload.id);
      if (createTouchPointResponse) {
        message.success('Successfully');
        const response = yield call(getLead, {
          page: 1,
          searchValue: payload.searchValue,
          status: payload.status,
        });
        if (response != null) {
          yield put({
            type: 'saveLeadInfo',
            payload: formatListLeadData(response),
          });
        }
      } else {
        message.error('Failed');
      }
    },
    *getList(
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
          payload: formatListLeadData(response),
        });
      }
    },
    *getListWithLane(payload, { call, put }) {
      const response = yield call(getListWithLane, {});
      if (response != null) {
        console.table(response);
        yield put({
          type: 'saveList',
          payload: formatListLeadDashboard(response),
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
    *get({ payload }, { call, put }) {
      const response = yield call(getLeadById, payload);
      yield put({
        type: 'saveDetail',
        payload: formatDetailLeadData(response),
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
          payload: formatListLeadData(response),
        });
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateLead, payload);
      if (response && response.id) {
        message.success('Successfully');
        yield put({
          type: 'getList',
          payload: {
            page: 1,
            searchValue: '',
            status: 'In-progress',
          },
        });
      }
    },
  },

  reducers: {
    cleanData(state) {
      return { ...state, detail: undefined };
    },
    saveDetail(state, { payload }) {
      return { ...state, detail: payload };
    },
    saveLeadInfo(state, { payload }) {
      return {
        ...state,
        list: payload.data,
        itemCount: payload.itemCount,
      };
    },
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload,
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

export default Model;

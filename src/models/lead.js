import { message } from 'antd';
import { formatedListLeadData, formatedDetailLeadData } from './utils';
import { getContact } from '../services/contact';
import { createTouchpoint } from '../services/touchpoint';
import { fullCreateLead, getLead, getLeadById, updateLead } from '../services/lead';
import { getCompany } from '../services/company';

const Model = {
  namespace: 'lead',
  state: {
    leadInfo: [],
    data: undefined,
    itemCount: undefined,
    listCompany: [],
    listContact: [],
    searchValue: [],
    touchpointList: [],
    listFile: [],
    listTouchpoint: [],
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
        });
        if (loadListResponse != null) {
          yield put({
            type: 'saveLeadInfo',
            payload: formatedListLeadData(response),
          });
        }
      }
    },
    *createTouchpoint({ payload }, { call, put }) {
      const createTouchpointResponse = yield call(createTouchpoint, payload);
      if (createTouchpointResponse) {
        message.success('Successfully');
        const response = yield call(getLead, {
          page: 1,
          searchValue: '',
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
    *searchCompanyByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getCompany, {
        page: 1,
        searchValue: payload.value,
      });

      const formatedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id,
          label: element.name,
          value: element.id,
        };
        formatedData.push(data);
      });
      if (response != null) {
        yield put({
          type: 'saveListCompany',
          payload: formatedData,
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
    *searchContactByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getContact, {
        page: 1,
        searchValue: payload.value,
      });
      const formatedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id,
          label: element.name,
          value: element.id,
        };
        formatedData.push(data);
      });
      if (response != null) {
        yield put({
          type: 'saveListContact',
          payload: formatedData,
        });
      }
    },
    *update({ payload }, { call }) {
      yield call(updateLead, payload);
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
    saveListFile(state, { payload }) {
      return { ...state, listFile: payload };
    },
    saveListTouchpoint(state, { payload }) {
      return { ...state, listTouchpoint: payload };
    },
    saveListCompany(state, { payload }) {
      return { ...state, listCompany: payload };
    },
    handleSearchChange(state, { payload }) {
      return { ...state, searchValue: payload.value, listCompany: payload.listCompany };
    },
    saveListContact(state, { payload }) {
      return { ...state, listContact: payload };
    },
    handleSearchContactChange(state, { payload }) {
      return { ...state, searchValue: payload.value, listContact: payload.listContact };
    },
    handleCompleteTouchpoint(state, { payload }) {
      return { ...state, viewable: payload.viewable };
    },
    showCompleteModal(state, { payload }) {
      // nsole.log(payload)co
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

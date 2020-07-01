import { message } from 'antd';
import { history } from 'umi';
import { createLead, getLead, updateLead, getLeadById, fullCreateLead } from '../services/lead';

const Model = {
  namespace: 'lead',
  state: {
    leadInfo: undefined,
    visible: false,
    data: undefined,
  },
  effects: {
    *create({ payload }, { call, put }) {
      // const response =
      yield call(createLead, payload);

      yield put({
        type: 'handleCreateModal',
        payload: false,
      });
      message.success('Tạo Lead thành công');

      yield put({
        type: 'loadListLead',
      });
    },
    *fullCreate({ payload }, { call }) {
      // const response =
      yield call(fullCreateLead, payload);

      message.success('Tạo Lead thành công');
      history.push({
        pathname: '/lead/',
      });
    },
    *loadListLead(_, { call, put }) {
      const response = yield call(getLead);
      yield put({
        type: 'saveLeadInfo',
        payload: response.data,
      });
    },
    *update({ payload }, { call }) {
      // const response =
      yield call(updateLead, payload);
      // console.table(response);
      history.push({
        pathname: '/lead',
      });
      message.success('Cập nhật Lead thành công');
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(getLeadById, payload);

      yield put({
        type: 'loadLead',
        payload: response,
      });
    },
  },
  reducers: {
    saveLeadInfo(state, { payload }) {
      return { ...state, leadInfo: payload };
    },
    handleCreateModal(state, { payload }) {
      return { ...state, visible: payload };
    },
    loadLead(state, { payload }) {
      return { ...state, data: payload };
    },
    cleanData(state) {
      return { ...state, data: undefined };
    },
  },
};

export default Model;

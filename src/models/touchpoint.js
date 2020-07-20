import { message } from 'antd';
import {
  createTouchpoint,
  updateTouchpoint,
  markDoneTouchpoint,
  getTouchpoint,
} from '../services/touchpoint';
import { formatedDetailTouchpointData } from './utils';

const Model = {
  namespace: 'touchpoint',
  state: {
    touchpointInfo: [],
    data: undefined,
    itemCount: undefined,
  },
  effects: {
    *create({ payload }, { call }) {
      yield call(createTouchpoint, payload);
      message.success('Successfully');
    },
    *update({ payload }, { call }) {
      const response = yield call(updateTouchpoint, payload);
      if (response) message.success('Successfully');
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getTouchpoint, payload);
      if (response) {
        yield put({
          type: 'saveInfo',
          payload: formatedDetailTouchpointData(response),
        });
      }
    },
    *markDone({ payload }, { call }) {
      const response = yield call(markDoneTouchpoint, payload);
      if (response) message.success('Mark done Successfully');
    },
  },

  reducers: {
    saveInfo(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    cleanData(state) {
      return {
        ...state,
        data: undefined,
      };
    },
  },
};

export default Model;

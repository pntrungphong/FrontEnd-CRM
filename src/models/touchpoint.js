import { message } from 'antd';
import {
  createTouchpoint,
  updateTouchpoint,
  markDoneTouchpoint,
  getTouchpoint,
} from '../services/touchpoint';
import { changeRank, changeStatus } from '../services/lead';
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
      console.table(payload);
      let changeRankresponse = payload.rankData ? yield call(changeRank, payload.rankData) : true;
      let changeStatusresponse = payload.statusData
        ? yield call(changeStatus, payload.statusData)
        : true;
      if (changeStatusresponse === '') changeStatusresponse = true;
      if (changeRankresponse === '') changeRankresponse = true;
      const response = yield call(markDoneTouchpoint, payload.markDoneData);
      if (response.id && changeStatusresponse && changeRankresponse) {
        message.success('Mark done Successfully');
        return true;
      }
      return false;
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

import { message } from 'antd';
import {
  createTouchPoint,
  updateTouchPoint,
  markDoneTouchpoint,
  getTouchpoint,
} from '../services/touchpoint';
import { getAllFile } from '../services/lead';
import { formatDetailTouchPointData } from './utils';

const Model = {
  namespace: 'touchpoint',
  state: {
    touchpointInfo: [],
    data: undefined,
    itemCount: undefined,
  },
  effects: {
    *create({ payload }, { call }) {
      const response = yield call(createTouchPoint, payload);
      if (response && response.id) {
        message.success('Create Successfully');
        return true;
      }
      return false;
    },
    *update({ payload }, { call }) {
      const response = yield call(updateTouchPoint, payload);
      if (response && response.id) {
        message.success('Update Successfully');
        return true;
      }
      return false;
      // let changeRankresponse =
      //     payload.rank.rank !== undefined ?
      //     yield call(changeRank, {
      //         rank: payload.rank.rank,
      //         reason: payload.rank.reason,
      //         id: payload.leadId,
      //     }) :
      //     true;

      // if (changeRankresponse === '') changeRankresponse = true;
      // if (response.id && changeRankresponse) {
      //     message.success('Update Successfully');
      //     return true;
      // }
      // return false;
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getTouchpoint, payload);
      const fileResponse = yield call(getAllFile, payload);
      if (response && fileResponse) {
        yield put({
          type: 'saveInfo',
          payload: formatDetailTouchPointData(response, fileResponse),
        });
      }
    },
    *markDone({ payload }, { call }) {
      const response = yield call(markDoneTouchpoint, payload);
      if (response.id) {
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

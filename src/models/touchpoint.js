import { message } from 'antd';
import {
  createTouchPoint,
  updateTouchPoint,
  markDoneTouchpoint,
  getTouchpoint,
} from '../services/touchpoint';
import { changeRank, changeStatus, getAllFile } from '../services/lead';
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
      yield call(createTouchPoint, payload);
      message.success('Create Successfully');
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
      let changeRankResponse =
        payload.rankData !== undefined ? yield call(changeRank, payload.rankData) : true;
      let changeStatusResponse =
        payload.statusData !== undefined ? yield call(changeStatus, payload.statusData) : true;
      if (changeStatusResponse === '') changeStatusResponse = true;
      if (changeRankResponse === '') changeRankResponse = true;
      const response = yield call(markDoneTouchpoint, payload.markDoneData);
      if (response.id && changeStatusResponse && changeRankResponse) {
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

import { message } from 'antd';
import {
  createTouchpoint,
  updateTouchpoint,
  markDoneTouchpoint,
  getTouchpoint,
} from '../services/touchpoint';
import { changeRank, changeStatus, getAllFile } from '../services/lead';
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
      message.success('Create Successfully');
    },
    *update({ payload }, { call }) {
      const response = yield call(updateTouchpoint, payload);
      let changeRankresponse =
        payload.rank.rank !== undefined
          ? yield call(changeRank, {
              rank: payload.rank.rank,
              reason: payload.rank.reason,
              id: payload.leadId,
            })
          : true;

      if (changeRankresponse === '') changeRankresponse = true;
      if (response.id && changeRankresponse) {
        message.success('Update Successfully');
        return true;
      }
      return false;
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getTouchpoint, payload);
      const fileResponse = yield call(getAllFile, payload);
      if (response && fileResponse) {
        yield put({
          type: 'saveInfo',
          payload: formatedDetailTouchpointData(response, fileResponse),
        });
      }
    },
    *markDone({ payload }, { call }) {
      let changeRankresponse =
        payload.rankData !== undefined ? yield call(changeRank, payload.rankData) : true;
      let changeStatusresponse =
        payload.statusData !== undefined ? yield call(changeStatus, payload.statusData) : true;
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

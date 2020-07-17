import { message } from 'antd';
import { createTouchpoint } from '../services/touchpoint';

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
  },

  reducers: {},
};

export default Model;

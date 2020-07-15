import { message } from 'antd';
import { history } from 'umi';
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
      history.push({
        pathname: '/lead/',
      });
    },
  },

  reducers: {},
};

export default Model;

import { history } from 'umi';
import { message } from 'antd';

import { createContact } from './service';

const Model = {
  namespace: 'createContact',
  state: {},
  effects: {
    *submit({ payload }, { call }) {
      // const response =
      yield call(createContact, payload);

      message.success('Tạo Contact thành công');
      history.push({
        pathname: '/contact/',
      });
    },
  },
  reducers: {},
};
export default Model;

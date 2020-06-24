import { history } from 'umi';
import { message } from 'antd';
import { createCompany } from './service';

const Model = {
  namespace: 'companyAndcreatedetail',
  state: {},
  effects: {
    *submit({ payload }, { call }) {
      // const response =
      yield call(createCompany, payload);

      message.success('Tạo Company thành công');
      history.push({
        pathname: '/company/',
      });
    },
  },
  reducers: {},
};
export default Model;

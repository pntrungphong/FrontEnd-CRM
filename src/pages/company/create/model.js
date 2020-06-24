import { createCompany } from './service';
import { history } from 'umi';
import { message } from 'antd';

const Model = {
    namespace: 'companyAndcreatedetail',
    state: {

    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(createCompany, payload);

            yield put({
                type: 'registerHandle',
                payload: response,
            });
            message.success('Tạo Company thành công');
            history.push({
                pathname: '/company/',

            });
        },

    },
    reducers: {

    },
};
export default Model;
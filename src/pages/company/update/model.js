import { fakeUpdate, loadUser } from './service';
import { history } from 'umi';
import { message } from 'antd';

const Model = {
    namespace: 'companyAndupdate',
    state: {
        data: undefined
    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(fakeUpdate, payload);
            // console.table(response);
            history.push({
                pathname: '/company',

            });
            message.success('Cập nhật Company thành công');


        },
        * loading({ payload }, { call, put }) {
            // console.table(payload);
            const response = yield call(loadUser, payload);
            // console.table(response);

            yield put({
                type: 'loadHandle',
                payload: response,
            });
        },

    },
    reducers: {

        loadHandle(state, { payload }) {
            return {...state, data: payload };
        },

    },
};
export default Model;
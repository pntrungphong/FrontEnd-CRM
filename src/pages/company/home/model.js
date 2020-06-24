import { createCompany, getCompany } from './service';
import { message } from 'antd';

const Model = {
    namespace: 'company',
    state: {
        companyInfo: undefined,
        visible: false,

    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(createCompany, payload);

            yield put({
                type: 'modalHandle',
                payload: false,
            });
            message.success('Tạo Company thành công');

            yield put({
                type: 'loadData',
            });
        },
        * loadData(_, { call, put }) {
            const response = yield call(getCompany);

            let data = [];
            response.data.forEach(element => {
                data.push(element);
                data[data.length - 1]["key"] = element.id;
            });

            yield put({
                type: 'companyHandle',
                payload: data,
            });

        },

    },
    reducers: {
        companyHandle(state, { payload }) {
            return {...state, companyInfo: payload };
        },
        modalHandle(state, { payload }) {
            return {...state, visible: payload };
        },

    },
};


export default Model;
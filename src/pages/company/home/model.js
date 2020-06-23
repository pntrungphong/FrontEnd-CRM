import { fakeCreate, getCompany } from './service';

const Model = {
    namespace: 'company',
    state: {
        createStatus: undefined,
        loadStatus: undefined,
        companyInfo: undefined,

    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(fakeCreate, payload);

            yield put({
                type: 'registerHandle',
                payload: response,
            });
        },
        * loadData({ payload }, { call, put }) {
            const response = yield call(getCompany, payload);

            yield put({
                type: 'companyHandle',
                payload: response,
            });
        },

    },
    reducers: {
        registerHandle(state, { payload }) {

            return {...state, createStatus: payload.code };
        },
        companyHandle(state, { payload }) {
            return {...state, loadStatus: payload.code, companyInfo: payload.data };
        },

        changeStatus(state) {
            return {...state, createStatus: undefined };
        },
    },
};


export default Model;
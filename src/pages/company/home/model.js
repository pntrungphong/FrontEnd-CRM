import { fakeCreate } from './service';

const Model = {
    namespace: 'companyAndcreate',
    state: {
        status: undefined,
        submit: true,
    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(fakeCreate, payload);

            yield put({
                type: 'registerHandle',
                payload: response,
            });
        },

    },
    reducers: {
        registerHandle(state, { payload }) {

            return {...state, status: 0 };
        },
        submitHandle(state) {
            return {...state, submit: false };
        },
        changeStatus(state) {
            return {...state, status: undefined };
        },
    },
};



export default Model;
import { fakeCreate } from './service';

const Model = {
    namespace: 'companyAndcreate',
    state: {
        status: undefined,
    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(fakeCreate, payload);
            console.table(response);
            yield put({
                type: 'registerHandle',
                payload: response,
            });
        },

    },
    reducers: {
        registerHandle(state, { payload }) {

            return {...state, status: payload.status };
        },
        changeStatus(state) {
            return {...state, status: false };
        },
    },
};
export default Model;
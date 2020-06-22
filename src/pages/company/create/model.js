import { fakeCreate } from './service';

const Model = {
    namespace: 'companyAndcreatedetail',
    state: {
        status: undefined,
    },
    effects: {
        * submit({ payload }, { call, put }) {
            console.table(payload);
            const response = yield call(fakeCreate, payload);

            yield put({
                type: 'registerHandle',
                payload: response,
            });
        },

    },
    reducers: {
        registerHandle(state, { payload }) {
            return {...state, status: payload.code };
        },
        changeStatus(state) {
            return {...state, status: false };
        },
    },
};
export default Model;
import { fakeUpdate } from './service';

const Model = {
    namespace: 'companyAndupdate',
    state: {
        status: undefined,
    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(fakeUpdate, payload);
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
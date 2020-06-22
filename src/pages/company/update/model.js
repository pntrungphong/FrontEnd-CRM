import { fakeUpdate, loadUser } from './service';

const Model = {
    namespace: 'companyAndupdate',
    state: {
        status: undefined,
        data: undefined
    },
    effects: {
        * submit({ payload }, { call, put }) {

            const response = yield call(fakeUpdate, payload);
            // console.table(response);

            yield put({
                type: 'registerHandle',
                payload: response,
            });
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
        registerHandle(state, { payload }) {
            return {...state, status: payload.status };
        },
        loadHandle(state, { payload }) {
            return {...state, data: payload };
        },
        changeStatus(state) {
            return {...state, status: false };
        },
    },
};
export default Model;
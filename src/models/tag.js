import { getTag } from '../services/tag';

const Model = {
  namespace: 'tag',
  state: {
    tag: [],
  },
  effects: {
    *getTag({ payload }, { call, put }) {
      const response = yield call(getTag, payload);
      const formatedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id.toString(),
          label: element.tag,
          value: element.id.toString(),
        };
        formatedData.push(data);
      });
      yield put({
        type: 'saveListTag',
        payload: formatedData,
      });
    },
  },
  reducers: {
    saveListTag(state, { payload }) {
      return { ...state, tag: payload };
    },
  },
};

export default Model;

import { getTag } from '../services/tag';

const Model = {
  namespace: 'tag',
  state: {
    tag: [],
  },
  effects: {
    *getTag({ payload }, { call, put }) {
      const response = yield call(getTag, payload);
      const formattedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id.toString(),
          label: element.tag,
          value: element.id.toString(),
        };
        formattedData.push(data);
      });

      yield put({
        type: 'saveListTag',
        payload: formattedData,
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

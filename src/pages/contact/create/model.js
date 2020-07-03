const Model = {
  namespace: 'searchModel',
  state: {
    searchValue: undefined,
  },
  effects: {},
  reducers: {
    saveSearchValue(state, { payload }) {
      return { ...state, searchValue: payload };
    },
  },
};

export default Model;

import { message } from 'antd';
import { history } from 'umi';
import { formatedListLeadData, formatedDetailLeadData } from './utils';
// import { getContactByName } from '../services/contact';
import { fullCreateLead, getLead, getLeadById } from '../services/lead';
import { getCompanyByName } from '../services/company';

const Model = {
  namespace: 'lead',
  state: {
    leadInfo: [],
    data: undefined,
    itemCount: undefined,
    listCompany: [],
    searchValue: [],
    listContact: [],
    searchContactValue: [],
  },
  effects: {
    *fullCreate({ payload }, { call }) {
      yield call(fullCreateLead, payload);
      message.success('Tạo Lead thành công');
      history.push({
        pathname: '/lead/',
      });
    },
    *loadListLead(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      const response = yield call(getLead, payload);
      console.table(response);
      if (response != null) {
        yield put({
          type: 'saveLeadInfo',
          payload: formatedListLeadData(response),
        });
      }
    },
    *searchCompanyByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getCompanyByName, payload.value);
      const formatedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id,
          label: element.name,
          value: element.id,
        };
        formatedData.push(data);
      });
      if (response != null) {
        yield put({
          type: 'saveListCompany',
          payload: formatedData,
        });
      }
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(getLeadById, payload);

      yield put({
        type: 'loadLead',
        payload: formatedDetailLeadData(response),
      });
    },
    // *searchContactByName({ payload }, { call, put }) {
    //   if (payload.value === '') return;
    //   const response = yield call(getContactByName, payload.value);
    //   const formatedData = [];

    //   response.data.forEach((element) => {
    //     const data = {
    //       key: element.id,
    //       label: element.name,
    //       value: element.id,
    //     };
    //     formatedData.push(data);
    //   });
    //   if (response != null) {
    //     yield put({
    //       type: 'saveListContact',
    //       payload: formatedData,
    //     });
    //   }
    // },
  },
  // *update({ payload }, { call }) {
  //   // const response =
  //   yield call(updateContact, payload);
  //   // console.table(response);
  //   history.push({
  //     pathname: '/contact',
  //   });
  //   message.success('Cập nhật Contact thành công');
  // },

  reducers: {
    loadLead(state, { payload }) {
      return { ...state, data: payload };
    },
    saveLeadInfo(state, { payload }) {
      return {
        ...state,
        leadInfo: payload.data,
        itemCount: payload.itemCount,
      };
    },
    saveListLead(state, { payload }) {
      return { ...state, listLead: payload };
    },
    handleSearchChange(state, { payload }) {
      return { ...state, searchValue: payload.value, listLead: payload.listLead };
    },
    saveListContact(state, { payload }) {
      return { ...state, listContact: payload };
    },
    handleSearchContactChange(state, { payload }) {
      return { ...state, searchContactValue: payload.value, listContact: payload.listContact };
    },
  },
};

export default Model;

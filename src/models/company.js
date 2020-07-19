import { message } from 'antd';
import { history } from 'umi';
import { formatedListCompanyData, formatedDetailCompanyData } from './utils';
import { getCompany, updateCompany, getCompanyById, fullCreateCompany, quickCreateCompany as quickCreateCompanyServices } from '../services/company';
import { getContact } from '../services/contact';

const Model = {
  namespace: 'company',
  state: {
    companyInfo: undefined,
    contactInfo: [],
    searchValueContact: [],
    data: undefined,
    itemCount: undefined,
    searchCompanyValue: '',
  },
  effects: {
    *fullCreate({ payload }, { call }) {
      yield call(fullCreateCompany, payload);

      message.success('Tạo Company thành công');
      history.push({
        pathname: '/company/',
      });
    },
    *quickCreateCompany({ payload }, { call }) {
      const createdCompany = yield call(quickCreateCompanyServices, payload);
      if (createdCompany.id) {
        const value = {
          value: createdCompany.id.toString(),
          label: createdCompany.name,
          key: createdCompany.id.toString()
        }
        return value;
      }
    },
    *searchContactByName({ payload }, { call, put }) {
      if (payload.value === '') return;
      const response = yield call(getContact, payload);
      const formatedData = [];

      response.data.forEach((element) => {
        const data = {
          key: element.id.toString(),
          label: element.name,
          value: element.id.toString(),
        };
        formatedData.push(data);
      });

      if (response != null) {
        yield put({
          type: 'saveListContact',
          payload: formatedData,
        });
      }
    },
    *searchCompanyByName(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      yield put({
        type: 'saveCompanySearchValue',
        payload: payload.searchValue,
      });

      const response = yield call(getCompany, payload);

      if (response != null) {
        yield put({
          type: 'saveCompanyInfo',
          payload: formatedListCompanyData(response),
        });
      }
    },
    *loadListCompany(
      {
        payload = {
          page: 1,
          searchValue: '',
        },
      },
      { call, put },
    ) {
      const response = yield call(getCompany, payload);
      if (response != null) {
        yield put({
          type: 'saveCompanyInfo',
          payload: formatedListCompanyData(response),
        });
      }
    },
    *update({ payload }, { call }) {
      yield call(updateCompany, payload);

      history.push({
        pathname: '/company',
      });
      message.success('Cập nhật Company thành công');
    },
    *loading({ payload }, { call, put }) {
      const response = yield call(getCompanyById, payload);

      yield put({
        type: 'loadCompany',
        payload: formatedDetailCompanyData(response),
      });
    },
  },
  reducers: {
    saveCompanyInfo(state, { payload }) {
      return { ...state, companyInfo: payload.data, itemCount: payload.itemCount };
    },
    handleCreateModal(state, { payload }) {
      return { ...state, visible: payload };
    },
    loadCompany(state, { payload }) {
      return { ...state, data: payload };
    },
    cleanData(state) {
      return { ...state, data: undefined, searchValueContact: [] };
    },
    handleSearchContactChange(state, { payload }) {
      return {
        ...state,
        searchValueContact: payload.value,
        contactInfo: payload.contactInfo,
      };
    },
    saveCompanySearchValue(state, { payload }) {
      return { ...state, searchCompanyValue: payload };
    },
    saveListContact(state, { payload }) {
      return { ...state, contactInfo: payload };
    },
  },
};

export default Model;

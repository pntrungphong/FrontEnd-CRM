import { message } from 'antd';
import { uploadLink, updateNote, uploadFile } from '../services/file';

const FileModel = {
  namespace: 'file',
  state: {
    file: undefined,
  },
  effects: {
    *uploadLink({ payload }, { call }) {
      const response = yield call(uploadLink, payload);
      if (response && response.id) {
        message.success('Successfully');
        return response;
      }
      message.error('Fail');
      return null;
    },
    *uploadFile({ payload }, { call }) {
      const response = yield call(uploadFile, payload);
      if (response && response.id) {
        message.success('Successfully');
        return response;
      }
      message.error('Fail');
      return null;
    },
    *updateNote({ payload }, { call }) {
      const response = yield call(updateNote, payload);
      if (response && response.id) {
        message.success('Successfully');
        return response;
      }
      message.error('Fail');
      return null;
    },
  },
  reducers: {},
};
export default FileModel;

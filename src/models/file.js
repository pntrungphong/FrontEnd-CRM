import { message } from 'antd';
import { uploadLink } from '../services/file';

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
  },
  reducers: {},
};
export default FileModel;

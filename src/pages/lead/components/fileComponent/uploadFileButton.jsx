import React from 'react';
import { Button, Upload, message } from 'antd';

import moment from 'moment';
import { getToken } from '../../../../utils/authority';
import fileConfig from '../../../../../config/apiConfig';

class UploadFileButton extends React.Component {
  onUpload = {
    name: 'file',
    action: fileConfig.uploadFile,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    state: this,
    props: this.props,
    onChange(info) {
      if (info.file.status === 'done') {
        const { dataSource, count } = this.state.state;
        const fileData = {
          key: count,
          originalname: info.file.name,
          order: this.props.order,
          id: info.file.response.id,
          createdAt: moment(info.file.createdAt).format('DD-MM-YYYY'),
          createdBy: info.file.response.createdBy,
          note: '',
          fileType: 'file',
          fileUrl: info.file.response.url ?? '',
        };
        const newSource = [...dataSource, fileData];
        this.state.setState({
          dataSource: newSource,
          count: this.state.state.count + 1,
        });
        message.success(`${info.file.name} file uploaded successfully`);
        this.props.onChange([...newSource]);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  render() {
    return (
      <div>
        <Upload {...this.props.onUpload}>
          <Button size="small">Upload file</Button>
        </Upload>
      </div>
    );
  }
}

export default UploadFileButton;

import React from 'react';
import { Button, message, Form, Upload } from 'antd';
import moment from 'moment';
import { getToken } from '../../../../utils/authority';
import UploadLinkModal from './uploadLinkModal';
import styles from './style.less';
import fileConfig from '../../../../../config/apiConfig';
import ListFile from './listFile';

class CustomUploadFile extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    const fileData = value
      ? value.map((file, index) => {
          return {
            key: index,
            order: file.order,
            id: file.id,
            originalname: file.originalname,
            createdAt: file.createdAt,
            createdBy: file.createdBy,
            note: file.note,
            old: true,
            fileType: file.fileType,
            fileUrl: file.fileUrl,
          };
        })
      : [];
    this.state = {
      dataSource: [...fileData],
      count: fileData.length,
    };
  }

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
          old: false,
          fileType: info.file.response.mimetype,
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
    showUploadList: false,
  };

  onAddLink = (fileData) => {
    this.updateDataSource(fileData);
  };

  updateDataSource = (fileData) => {
    if (!fileData) return;
    const { dataSource, count } = this.state;
    const newFileData = {
      ...fileData,
      key: count,
      order: this.props.order,
      old: false,
      fileType: fileData.mimetype,
      fileUrl: fileData.url,
    };
    const newSource = [...dataSource, newFileData];
    this.setState({
      dataSource: newSource,
      count: count + 1,
    });
    this.props.onChange([...newSource]);
  };

  removeFile = (key) => {
    const { dataSource, count } = this.state;
    const fileData = [...dataSource];
    const index = fileData.findIndex((item) => key === item.key);
    fileData.splice(index, 1);
    const newFileData = fileData.map((file, newIndex) => {
      return {
        key: newIndex,
        order: file.order,
        id: file.id,
        originalname: file.originalname,
        createdAt: file.createdAt,
        createdBy: file.createdBy,
        note: file.note,
        old: file.old,
        fileType: file.fileType,
        fileUrl: file.fileUrl,
      };
    });
    this.setState({
      dataSource: newFileData,
      count: count - 1,
    });
    if (fileData.length !== 0) {
      this.props.onChange([...fileData]);
    } else {
      this.props.onChange([]);
    }
  };

  render() {
    return (
      <div>
        <div className={styles.actionBtn}>
          <UploadLinkModal
            touchPointId={this.props.touchPointId}
            leadId={this.props.leadId}
            onAddLink={this.onAddLink}
            count={this.state.count}
            hidden={!!(this.props.status === 'Done' || this.props.status === 'Planning')}
          />
          <Form.Item name={this.props.dataIndex} className={styles.customFormItemUploadFile}>
            <Upload {...this.onUpload}>
              <Button
                size="small"
                hidden={!!(this.props.status === 'Done' || this.props.status === 'Planning')}
              >
                Upload file
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <ListFile
          onChange={this.props.onChange}
          removeFile={(key) => this.removeFile(key)}
          status={this.props.status}
          order={this.props.order}
          dataIndex={this.props.dataIndex}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}

export default CustomUploadFile;

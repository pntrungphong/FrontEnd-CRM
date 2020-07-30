import React from 'react';
import { Button, message, Form, Upload, Modal, Tag, Input, List } from 'antd';
import moment from 'moment';
import { PaperClipOutlined, FormOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { getToken } from '../../../../utils/authority';
import { downloadFile } from '../../../../utils/downloadfile';
import UploadLinkModal from './uploadLinkModal';
import styles from './style.less';

const { TextArea } = Input;

function showNote(note) {
  Modal.info({
    title: 'Note',
    content: note,
    cancelText: 'Close',
  });
}

const iff = (condition, then, otherwise) => (condition ? then : otherwise);

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
      visible: false,
      dataSource: [...fileData],
      count: fileData.length,
      currentFile: 0,
    };
  }

  onUpload = {
    name: 'file',
    action: 'https://api-harmonia.geekup.io/file',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    state: this,
    props: this.props,
    onChange(info) {
      if (info.file.status === 'done') {
        const { dataSource, count } = this.state.state;
        console.table(info);
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

  addNote = (key) => {
    this.state.currentFile = key;
    this.setState({
      visible: true,
    });
  };

  onAddLink = (fileData) => {
    this.updateDataSource(fileData);
  };

  updateDataSource = (fileData) => {
    const { dataSource, count } = this.state;
    const newFileData = {
      ...fileData,
      key: count,
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
      currentFile: 0,
    });
    if (fileData.length !== 0) {
      this.props.onChange([...fileData]);
    } else {
      this.props.onChange([]);
    }
  };

  onFinish = (values) => {
    this.state.tempValue = values;
    const { dataSource } = this.state;
    const fileData = [...dataSource];
    const index = fileData.findIndex((item) => this.state.currentFile === item.key);
    const selectItem = fileData[index];
    selectItem.note = values.note;
    fileData.splice(index, 1, { ...selectItem });
    this.setState({
      visible: false,
      dataSource: fileData,
    });
    this.props.onChange([...fileData]);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Add note"
          visible={this.state.visible}
          destroyOnClose
          footer={false}
          onCancel={this.handleCancel}
        >
          <Form
            onFinish={this.onFinish}
            initialValues={{
              note:
                this.state.dataSource.length > 0
                  ? this.state.dataSource[this.state.currentFile].note
                  : '',
            }}
          >
            <Form.Item name="note">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add note
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className={styles.actionBtn}>
          <UploadLinkModal
            onAddLink={this.onAddLink}
            count={this.state.count}
            hidden={!!(this.props.status === 'Done' || this.props.status === 'Draft')}
          />
          <Form.Item name={this.props.dataIndex} className={styles.customFormItemUploadFile}>
            <Upload {...this.onUpload}>
              <Button
                size="small"
                hidden={!!(this.props.status === 'Done' || this.props.status === 'Draft')}
              >
                Upload file
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.dataSource}
          locale={{ emptyText: 'No file' }}
          renderItem={(item) => (
            <List.Item>
              <h3>
                {item.fileType === 'link' ? (
                  <>
                    <LinkOutlined style={{ color: '#666666' }} />{' '}
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                      {item.originalname}
                    </a>
                  </>
                ) : (
                  <>
                    <PaperClipOutlined style={{ color: '#666666' }} />{' '}
                    <a onClick={() => downloadFile(item)}>{item.originalname}</a>
                  </>
                )}
              </h3>
              {this.props.dataIndex !== 'brief' ? (
                <span
                  onClick={() => {
                    if (
                      item.order !== this.props.order ||
                      this.props.status === 'Done' ||
                      this.props.status === 'Draft'
                    ) {
                      showNote(this.state.dataSource[item.key].note);
                    } else this.addNote(item.key);
                  }}
                >
                  {(this.state.dataSource[item.key].note &&
                    this.state.dataSource[item.key].note !== '') ||
                  item.order !== this.props.order ||
                  this.props.status === 'Done' ||
                  this.props.status === 'Draft' ? (
                    <div className={styles.viewNote}>View Note</div>
                  ) : (
                    <Tag>
                      <FormOutlined />
                      Add Note
                    </Tag>
                  )}
                </span>
              ) : (
                iff(
                  this.props.dataIndex !== 'brief',
                  <Tag
                    onClick={() => {
                      this.addNote(item.key);
                    }}
                  >
                    <FormOutlined /> Add Note
                  </Tag>,
                  null,
                )
              )}
              <h3>
                <span>{item.createdAt}</span>
              </h3>
              <h3>
                <span>{item.createdBy}</span>
              </h3>
              {item.order !== this.props.order ? (
                <Tag
                  style={{ color: 'black', borderRadius: '20px', fontWeight: '600' }}
                >{`TouchPoint ${item.order}`}</Tag>
              ) : (
                iff(
                  item.order !== undefined,
                  <Tag
                    color="#EFDBFF"
                    style={{ color: 'black', borderRadius: '20px', fontWeight: '600' }}
                  >{`TouchPoint ${item.order}`}</Tag>,
                  <Tag style={{ color: 'black', borderRadius: '20px', fontWeight: '600' }}>
                    Lead Generation
                  </Tag>,
                )
              )}
              {!this.state.dataSource[item.key].old ? (
                <DeleteOutlined
                  onClick={() => {
                    this.removeFile(item.key);
                  }}
                />
              ) : null}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CustomUploadFile;

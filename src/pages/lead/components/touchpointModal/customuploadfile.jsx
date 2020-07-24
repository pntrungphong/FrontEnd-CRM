import React from 'react';
import { Button, message, Form, Upload, Modal, Tag, Input, List } from 'antd';
import moment from 'moment';
import { getToken } from '../../../../utils/authority';
import { downloadFile } from '../../../../utils/downloadfile';

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
    const fileData = props.value.map((file, index) => {
      return {
        key: index,
        order: file.order,
        id: file.id,
        originalname: file.originalname,
        createdAt: file.createdAt,
        createdBy: file.createdBy,
        note: file.note,
        old: true,
      };
    });
    this.state = {
      visible: false,
      dataSource: [...fileData],
      count: fileData.length,
      currentFile: 0,
    };
  }

  onUpload = {
    name: 'file',
    action: 'http://api-harmonia.geekup.io/file',
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

  removeFile = (key) => {
    const { dataSource, count } = this.state;
    const fileData = [...dataSource];
    const index = fileData.findIndex((item) => key === item.key);
    fileData.splice(index, 1);
    const newfileData = fileData.map((file, newIndex) => {
      return {
        key: newIndex,
        order: file.order,
        id: file.id,
        originalname: file.originalname,
        createdAt: file.createdAt,
        createdBy: file.createdBy,
        note: file.note,
        old: false,
      };
    });

    this.setState({
      dataSource: newfileData,
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
        <Form.Item name={this.props.dataIndex}>
          <Upload {...this.onUpload}>
            <Button hidden={!!(this.props.status === 'Done' || this.props.status === 'Draft')}>
              {' '}
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <List
          itemLayout="horizontal"
          dataSource={this.state.dataSource}
          locale={{ emptyText: 'No file' }}
          renderItem={(item) => (
            <List.Item
              actions={
                this.props.dataIndex !== 'brief'
                  ? [
                      <Button
                        onClick={() => {
                          if (
                            item.order !== this.props.order ||
                            this.props.status === 'Done' ||
                            this.props.status === 'Draft'
                          ) {
                            showNote(this.state.dataSource[item.key].note);
                          } else this.addNote(item.key);
                        }}
                        type="text"
                      >
                        {(this.state.dataSource[item.key].note &&
                          this.state.dataSource[item.key].note !== '') ||
                        item.order !== this.props.order ||
                        this.props.status === 'Done' ||
                        this.props.status === 'Draft'
                          ? 'View Note'
                          : 'Add Note'}
                      </Button>,

                      !this.state.dataSource[item.key].old ? (
                        <Button
                          onClick={() => {
                            this.removeFile(item.key);
                          }}
                        >
                          Remove
                        </Button>
                      ) : null,
                    ]
                  : []
              }
            >
              <a
                onClick={() => {
                  downloadFile(item);
                }}
              >
                {item.originalname}
              </a>
              <a>{item.createdAt}</a>

              {item.order !== this.props.order ? (
                <Tag>{`Touchpoint ${item.order}`}</Tag>
              ) : (
                iff(
                  item.order !== undefined,
                  <Tag color="red">{`Touchpoint ${item.order}`}</Tag>,
                  <Tag>Lead Generation</Tag>,
                )
              )}

              <a>{item.createdBy}</a>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CustomUploadFile;

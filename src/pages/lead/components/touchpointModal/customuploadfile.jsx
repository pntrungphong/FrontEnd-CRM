import React from 'react';
import { Button, message, Form, Upload, Modal, Input, List } from 'antd';
import { FileAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { getToken } from '../../../../utils/authority';

const { TextArea } = Input;

function showNote(note) {
  Modal.info({
    title: 'Note',
    content: note,
    cancelText: 'Close',
  });
}

class CustomUploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataSource: [],
      count: 0,
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
          name: info.file.name,
          note: undefined,
        };
        const newSource = [...dataSource, fileData];
        this.state.setState({
          dataSource: newSource,
          count: this.state.state.count + 1,
        });

        message.success(`${info.file.name} file uploaded successfully`);

        this.props.onChange({
          fileData: newSource,
        });
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

    this.setState({
      dataSource: fileData,
      count: count - 1,
    });
    if (fileData.length !== 0) {
      this.props.onChange({
        fileData,
      });
    } else {
      this.props.onChange({
        fileData: undefined,
      });
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
    this.props.onChange({
      fileData,
    });
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
          <Form onFinish={this.onFinish}>
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
        <Form.Item name={['lead', this.props.dataIndex]}>
          <Upload {...this.onUpload}>
            <Button>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <List
          itemLayout="horizontal"
          dataSource={this.state.dataSource}
          locale={{ emptyText: 'No file' }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <FileAddOutlined
                  onClick={() => {
                    this.addNote(item.key);
                  }}
                />,
                <Button
                  onClick={() => {
                    showNote(this.state.dataSource[item.key].note);
                  }}
                  type="text"
                >
                  View Note
                </Button>,
                <DeleteOutlined
                  onClick={() => {
                    this.removeFile(item.key);
                  }}
                />,
              ]}
            >
              <a>{item.name}</a>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CustomUploadFile;

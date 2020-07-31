import React from 'react';
import { Button, Form, Modal, Tag, Input, List } from 'antd';
import { PaperClipOutlined, FormOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { downloadFile } from '../../../../utils/downloadfile';
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

class ListFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentFile: 0,
    };
  }

  addNote = (key) => {
    this.state.currentFile = key;
    this.setState({
      visible: true,
    });
  };

  onFinish = (values) => {
    const { dataSource } = this.props;
    const fileData = [...dataSource];
    const index = fileData.findIndex((item) => this.state.currentFile === item.key);
    const selectItem = fileData[index];
    selectItem.note = values.note;
    fileData.splice(index, 1, { ...selectItem });
    this.setState({
      visible: false,
    });
    this.props.onChange([...fileData]);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { dataSource, order } = this.props;
    return (
      <>
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
              note: dataSource.length > 0 ? dataSource[this.state.currentFile].note : '',
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
        <List
          itemLayout="horizontal"
          dataSource={dataSource}
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
                      item.order !== order ||
                      this.props.status === 'Done' ||
                      this.props.status === 'Planning'
                    ) {
                      showNote(dataSource[item.key].note);
                    } else this.addNote(item.key);
                  }}
                >
                  {(dataSource[item.key].note && dataSource[item.key].note !== '') ||
                  item.order !== order ||
                  this.props.status === 'Done' ||
                  this.props.status === 'Planning' ? (
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
              {item.order !== order ? (
                <Tag className={styles.customTagStyle}>{`TouchPoint ${item.order}`}</Tag>
              ) : (
                iff(
                  item.order !== undefined,
                  <Tag color="#EFDBFF" className={styles.customTagStyle}>
                    {`TouchPoint ${item.order}`}
                  </Tag>,
                  <Tag className={styles.customTagStyle}>Lead Generation</Tag>,
                )
              )}
              {!dataSource[item.key].old ? (
                <DeleteOutlined
                  onClick={() => {
                    this.props.removeFile(item.key);
                  }}
                />
              ) : null}
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default ListFile;

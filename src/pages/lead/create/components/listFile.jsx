import React from 'react';
import { connect } from 'umi';
import { Button, Form, Modal, Tag, Input, List } from 'antd';
import { PaperClipOutlined, FormOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import { downloadFile } from '../../../../utils/downloadfile';
import styles from './style.less';

const { TextArea } = Input;

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
    const { dataSource } = this.props;

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
            <Form.Item className={styles.actionNoteBtn}>
              <Button htmlType="reset" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={this.props.adding}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <List
          itemLayout="horizontal"
          split={false}
          dataSource={dataSource}
          locale={{ emptyText: 'No file' }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                className={styles.titleDisplay}
                title={
                  <h3 className={styles.listH3}>
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
                }
              />
              <div
                onClick={() => {
                  this.addNote(item.key, false);
                }}
              >
                {dataSource[item.key].note && dataSource[item.key].note !== '' ? (
                  <div className={styles.viewNote}>View note</div>
                ) : (
                  <Tag>
                    <FormOutlined /> Add note
                  </Tag>
                )}
              </div>
              <DeleteOutlined
                onClick={() => {
                  this.props.removeFile(item.key);
                }}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default connect(({ file, loading }) => ({
  file,
  adding: loading.effects['file/updateNote'],
}))(ListFile);

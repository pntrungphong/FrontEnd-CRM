import React from 'react';
import { Button, Form, Modal, Tag, Input, List } from 'antd';
import { PaperClipOutlined, LinkOutlined } from '@ant-design/icons';
import moment from 'moment';
import { downloadFile } from '../../../../utils/downloadfile';
import styles from './style.less';

const { TextArea } = Input;

class ListFileView extends React.Component {
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
          title="View note"
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
              <TextArea rows={4} disabled />
            </Form.Item>
            <Form.Item className={styles.actionNoteBtn}>
              <Button htmlType="reset" onClick={this.handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <List
          itemLayout="horizontal"
          dataSource={dataSource}
          locale={{ emptyText: 'No file' }}
          renderItem={(item, index) => (
            <List.Item>
              <h5>
                {item.mimetype === 'link' ? (
                  <>
                    <LinkOutlined style={{ color: '#666666' }} />{' '}
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.originalname}
                    </a>
                  </>
                ) : (
                  <>
                    <PaperClipOutlined style={{ color: '#666666' }} />{' '}
                    <a onClick={() => downloadFile(item)}>{item.originalname}</a>
                  </>
                )}
              </h5>
              {this.props.dataIndex !== 'brief' ? (
                <span onClick={() => this.addNote(index)}>
                  <h5 className={styles.viewNote}>View note </h5>
                </span>
              ) : (
                ''
              )}
              <h5>
                <span>{moment(item.createdAt).format('DD-MM-YYYY')}</span>
              </h5>
              <h5>
                <span>{item.createdBy}</span>
              </h5>
              <Tag className={styles.customTagStyle}>
                {item.order ? `TouchPoint ${item.order}` : 'Brief'}
              </Tag>
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default ListFileView;

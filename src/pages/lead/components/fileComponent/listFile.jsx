import React from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { Button, Form, Modal, Tag, Input, List } from 'antd';
import {
  PaperClipOutlined,
  FormOutlined,
  LinkOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { downloadFile } from '../../../../utils/downloadfile';
import styles from './style.less';

const { TextArea } = Input;

const iff = (condition, then, otherwise) => (condition ? then : otherwise);

class ListFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      canEdit: true,
      currentFile: 0,
      showLess: true,
    };
  }

  addNote = (key, canEdit) => {
    this.state.currentFile = key;
    this.setState({
      visible: true,
      canEdit,
    });
  };

  onFinish = async (values) => {
    const { dataSource } = this.props;
    const fileData = [...dataSource];
    const index = fileData.findIndex((item) => this.state.currentFile === item.key);
    const selectItem = fileData[index];
    selectItem.note = values.note;
    await this.props.dispatch({
      type: 'file/updateNote',
      payload: {
        ...selectItem,
      },
    });
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

  onLoadMore = (showLess) => {
    this.setState({
      showLess,
    });
  };

  ControllerButton = (btnProps) => {
    if (!btnProps) return null;
    return (
      <div className={styles.controllerButton}>
        {this.state.showLess ? (
          <a onClick={() => this.onLoadMore(false)}>
            Show more <DownOutlined style={{ fontSize: '10px' }} />
          </a>
        ) : (
          <a onClick={() => this.onLoadMore(true)}>
            Show less <UpOutlined style={{ fontSize: '10px' }} />
          </a>
        )}
      </div>
    );
  };

  render() {
    const { dataSource, order } = this.props;
    const listData = dataSource.slice(0, this.state.showLess ? 3 : dataSource.length);
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
              <TextArea rows={4} disabled={this.state.canEdit} />
            </Form.Item>
            <Form.Item className={styles.actionNoteBtn}>
              <Button htmlType="reset" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.state.canEdit}
                hidden={this.state.canEdit}
                loading={this.props.adding}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          loadMore={this.ControllerButton(dataSource.length > 3)}
          locale={{ emptyText: 'No file' }}
          renderItem={(item) => (
            <List.Item className={styles.briefDisplay}>
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
                      this.addNote(item.key, true);
                    } else this.addNote(item.key, false);
                  }}
                >
                  {(dataSource[item.key].note && dataSource[item.key].note !== '') ||
                  item.order !== order ||
                  this.props.status === 'Done' ||
                  this.props.status === 'Planning' ? (
                    <div className={styles.viewNote}>View Note</div>
                  ) : (
                    <Tag>
                      {' '}
                      <FormOutlined /> Add Note
                    </Tag>
                  )}
                </span>
              ) : (
                ''
              )}
              <h3>
                <span>{moment(item.createdAt).format('DD-MM-YYYY')}</span>
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

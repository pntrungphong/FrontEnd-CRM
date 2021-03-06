import React from 'react';
import { connect } from 'umi';
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
      currentFile: 0,
      showLess: true,
    };
  }

  addNote = (key) => {
    this.state.currentFile = key;
    this.setState({
      visible: true,
    });
  };

  onFinish = async (values) => {
    const { dataSource } = this.props;
    const fileData = [...dataSource];
    const index = fileData.findIndex((item) => this.state.currentFile === item.key);
    const selectItem = fileData[index];
    selectItem.note = values.note;
    this.props
      .dispatch({
        type: 'file/updateNote',
        payload: {
          note: values.note,
          id: selectItem.id,
        },
      })
      .then((result) => {
        if (result) {
          fileData.splice(index, 1, { ...selectItem });
          this.setState({
            visible: false,
          });
          this.props.onChange([...fileData]);
        }
      });
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
          dataSource={listData}
          loadMore={this.ControllerButton(dataSource.length > 3)}
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
              <h4 className={styles.listH3}>
                <span>{item.createdAt}</span>
              </h4>
              <span
                onClick={() => {
                  this.addNote(item.key, false);
                }}
              >
                {dataSource[item.key].note && dataSource[item.key].note !== '' ? (
                  <div className={styles.viewNote}>View note</div>
                ) : (
                  <Tag style={{ margin: 0 }}>
                    <FormOutlined /> Add note
                  </Tag>
                )}
              </span>
              <h4 className={styles.listH3}>
                <span>{item.createdBy}</span>
                {/* <Tooltip title={item.userName}>
                      <Avatar
                        key={item.createdBy}
                        className={styles.picAvatar}
                        src={taskItem.avatar}
                        style={{ width: 24, height: 24 }}>
                        {taskItem.userName}
                      </Avatar>
                    </Tooltip> */}
              </h4>
              {item.order !== order ? (
                <Tag className={styles.customTagStyle}>{`Touchpoint ${item.order}`}</Tag>
              ) : (
                iff(
                  item.order !== undefined,
                  <Tag color="#EFDBFF" className={styles.customTagStyle}>
                    {`Touchpoint ${item.order}`}
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

import React from 'react';
import { connect } from 'umi';
import { Button, Form, Modal, Input } from 'antd';
import styles from './style.less';

class UploadLinkModal extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  onFinish = (values) => {
    this.props
      .dispatch({
        type: 'file/uploadLink',
        payload: values,
      })
      .then((uploadedLink) => {
        this.props.onAddLink(uploadedLink);
      });
    this.setModalVisible(false);
  };

  render() {
    return (
      <div className={styles.uploadLinkModalBtn}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.setModalVisible(true)}
          hidden={this.props.hidden}
        >
          Upload link
        </Button>
        <Modal
          title="Upload link"
          centered
          destroyOnClose
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          footer={[
            <Button onClick={() => this.setModalVisible(false)}>Cancel</Button>,
            <Button
              form="upload-link-form"
              key="submit"
              type="primary"
              htmlType="submit"
              loading={this.props.adding}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            labelCol={{ span: 3 }}
            name="upload-link"
            onFinish={this.onFinish}
            id="upload-link-form"
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="url" label="Link" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="note" label="Note">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(({ file, loading }) => ({
  file,
  adding: loading.effects['file/uploadLink'],
}))(UploadLinkModal);

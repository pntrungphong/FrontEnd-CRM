import React from 'react';
import { connect } from 'umi';
import { Button, Form, Modal, Input } from 'antd';

class UploadLinkModal extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  onFinish = (values) => {
    const payload = {
      ...values,
      touchPointId: this.props.touchPointId,
      leadId: this.props.leadId,
    };
    this.props
      .dispatch({
        type: 'file/uploadLink',
        payload,
      })
      .then((uploadedLink) => {
        this.props.onAddLink({ ...uploadedLink, note: payload.note });
      });
    this.setModalVisible(false);
  };

  render() {
    return (
      <div>
        <a onClick={() => this.setModalVisible(true)}>Upload link</a>
        <Modal
          title="Upload link"
          centered
          destroyOnClose
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          footer={[
            <Button onClick={() => this.setModalVisible(false)} key="cancelBtn">
              Cancel
            </Button>,
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

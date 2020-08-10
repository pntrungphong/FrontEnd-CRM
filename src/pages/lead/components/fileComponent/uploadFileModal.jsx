import React from 'react';
import { connect } from 'umi';
import { Button, Form, Col, Row, Modal, Input, Upload, message } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getToken } from '../../../../utils/authority';
import fileConfig from '../../../../../config/apiConfig';

class UploadFileModal extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      buttonVisible: true,
      modalVisible: false,
      file: undefined,
    };
  }

  onUpload = {
    name: 'file',
    action: fileConfig.uploadFile,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    props: this,
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        this.props.setState({
          buttonVisible: false,
          file: this.props.formatFileData(info),
        });
        this.props.formRef.current.setFieldsValue({ file: this.props.formatFileData(info) });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  onRemove = () => {
    this.setState({
      buttonVisible: true,
      file: undefined,
    });
    this.formRef.current.setFieldsValue({ file: undefined });
  };

  formatFileData = (info) => {
    return {
      key: this.props.count,
      originalname: info.file.name,
      order: this.props.order,
      id: info.file.response.id,
      createdAt: moment(info.file.createdAt).format('DD-MM-YYYY'),
      createdBy: info.file.response.createdBy,
      note: '',
      fileType: info.file.response.mimetype,
      fileUrl: info.file.response.url ?? '',
    };
  };

  onFinish = (values) => {
    const payload = {
      fileId: this.formRef.current.getFieldValue('file').id,
      note: values.note,
      touchPointId: this.props.touchPointId,
      leadId: this.props.leadId,
    };

    this.props
      .dispatch({
        type: 'file/uploadFile',
        payload,
      })
      .then((uploadedFile) => {
        this.props.onAddFile({ ...uploadedFile, note: payload.note });
      });
    this.setModalVisible(false);
  };

  render() {
    return (
      <div>
        <a onClick={() => this.setModalVisible(true)}>Upload file</a>
        <Modal
          title="Upload file"
          centered
          destroyOnClose
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          footer={[
            <Button onClick={() => this.setModalVisible(false)} key="cancelBtn">
              Cancel
            </Button>,
            <Button
              form="upload-file-form"
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
            ref={this.formRef}
            labelCol={{ span: 3 }}
            name="upload-file"
            onFinish={this.onFinish}
            id="upload-file-form"
          >
            {this.state.buttonVisible ? (
              <Form.Item name="file" label="File" rules={[{ required: true }]}>
                <Upload {...this.onUpload}>
                  <Button size="small">Upload file</Button>
                </Upload>
              </Form.Item>
            ) : null}

            {this.state.file ? (
              <Form.Item name="file" label="File" rules={[{ required: true }]}>
                <Row>
                  <Col flex="2">{this.state.file.originalname}</Col>
                  <Col flex="1">
                    <DeleteOutlined onClick={this.onRemove} />
                  </Col>
                </Row>
              </Form.Item>
            ) : null}

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
  adding: loading.effects['file/uploadFile'],
}))(UploadFileModal);

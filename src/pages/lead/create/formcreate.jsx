import { Form, Input, message, Button, Select, Upload, Radio } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { getToken } from '../../../utils/authority';
import styles from './style.less';
import QuickCreate, { CreateType } from '../../common/quickCreate';

const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrappercol: { span: 16 },
};

const validateMessages = (label) => ({
  required: `${label} is required!`,
});

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  onUpload = {
    name: 'file',
    action: 'http://api-harmonia.geekup.io/file',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    props: this.props,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);

        this.props.dispatch({
          type: 'lead/saveListFile',
          payload: info.fileList,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  onFinish = (values) => {
    this.props.dispatch({
      type: 'lead/fullCreate',
      payload: { ...values, listFile: this.props.lead.listFile },
    });
    this.props.closeModal();
  };

  render() {
    return (
      <Form
        id={this.props.id}
        {...layout}
        className={styles.formCreateLead}
        ref={this.formRef}
        name="nest-messages"
        onFinish={this.onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Lead Name"
          rules={[{ required: true, message: 'Please input lead name' }]}
        >
          <Input placeholder="Enter lead name" />
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: 'Please input company' }]}
        >
          <QuickCreate
            formRef={this.formRef}
            placeholder="Type and select a company"
            createType={CreateType.COMPANY}
            dataIndex="company"
          />
        </Form.Item>

        <Form.Item
          name="contact"
          label="Contact"
          rules={[{ required: true, message: 'Please input contact' }]}
        >
          <QuickCreate
            formRef={this.formRef}
            placeholder="Type and select contact"
            createType={CreateType.CONTACT}
            dataIndex="contact"
          />
        </Form.Item>

        <Form.Item name="relation" label="Related To">
          <QuickCreate
            formRef={this.formRef}
            placeholder="Type and select relation contact"
            createType={CreateType.CONTACT}
            dataIndex="relation"
          />
        </Form.Item>

        <Form.Item name="tag" label="Tag">
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select tags"
            labelInValue
            tokenSeparators={[',']}
          >
            <Option key="Coffee shop">Coffee shop</Option>
            <Option key="Loyalty">Loyalty</Option>
            <Option key="Technical">Technical</Option>
            <Option key="Financial">Financial</Option>
            <Option key="Stock">Stock</Option>
            <Option key="Mobile app">Mobile app</Option>
          </Select>
        </Form.Item>

        <Form.Item name="rank" label="Rank" rules={[{ required: true, message: 'Choose rank' }]}>
          <Radio.Group className={styles.customRadioRank}>
            <Radio value="0">A</Radio>
            <Radio value="1">B</Radio>
            <Radio value="2">C</Radio>
            <Radio value="3">D</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="reason"
          label="Rank Explanation"
          rules={[{ required: true, message: 'Explanation for this rank' }]}
        >
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder="Add reason for the ranking"
          />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} placeholder="Add lead description here" />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <TextArea rows={4} placeholder="Add a note here" />
        </Form.Item>

        <Form.Item name="brief" label="Brief">
          <Upload {...this.onUpload}>
            <Button>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    );
  }
}
export default connect(({ lead, loading }) => ({
  lead,
  submitting: loading.effects['lead/fullCreate'],
  fetchingCompany: loading.effects['lead/searchCompanyByName'],
  fetchingContact: loading.effects['lead/searchContactByName'],
}))(CreateForm);

import { Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './style.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const Create = connect(({ contact, loading }) => ({
  contact,
  submitting: loading.effects['contact/fullCreate'],
}))(function (props) {
  const onFinish = (values) => {
    props.dispatch({
      type: 'contact/fullCreate',
      payload: { ...values },
    });
  };
  const [form] = Form.useForm();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2> Create contact</h2>
      </div>

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['contact', 'name']}
          label="Name"
          initialValue={props.location.state === undefined ? '' : props.location.state.name}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact', 'phone']}
          label="Phone"
          initialValue={props.location.state === undefined ? '' : props.location.state.phone}
        >
          <Input />
        </Form.Item>

        <Form.Item name={['contact', 'email']} label="Email">
          <Input />
        </Form.Item>

        <Form.Item name={['contact', 'website']} label="Website">
          <Input />
        </Form.Item>

        <Form.Item name={['contact', 'address']} label="Address">
          <Input />
        </Form.Item>
        <Form.Item name={['contact   ', 'tag']} label="Tag">
          <Input />
        </Form.Item>
        <Form.Item name={['contact', 'referral']} label="Referral">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={props.submitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Create;

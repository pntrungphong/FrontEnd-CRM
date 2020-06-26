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
const Create = connect(({ company, loading }) => ({
  company,
  submitting: loading.effects['company/fullCreate'],
}))(function (props) {
  const onFinish = (values) => {
    props.dispatch({
      type: 'company/fullCreate',
      payload: { ...values },
    });
  };

  const [form] = Form.useForm();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.title}> Create company</h2>
      </div>

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['company', 'name']}
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
          name={['company', 'website']}
          label="Website"
          initialValue={props.location.state === undefined ? '' : props.location.state.website}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['company', 'phone']} label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name={['company', 'address']} label="Address">
          <Input />
        </Form.Item>
        <Form.Item name={['company', 'tag']} label="Tag">
          <Input />
        </Form.Item>
        <Form.Item name={['company', 'email']} label="Email">
          <Input />
        </Form.Item>
        <Form.Item name={['company', 'url']} label="URL">
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

import { Spin, Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { useMount, useUnmount } from 'ahooks';
import styles from './style.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const Update = connect(({ contact, loading }) => ({
  contact,
  submitting: loading.effects['contact/create'],
  querying: loading.effects['contact/loading'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'contact/loading',
      payload: { id: props.location.query.id },
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'contact/cleanData',
    });
  });

  const onFinish = (values) => {
    props.dispatch({
      type: 'contact/update',
      payload: { ...values, id: props.location.query.id },
    });
  };
  const [form] = Form.useForm();

  if (props.contact.data === undefined) {
    return <Spin />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2> Update company</h2>
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
          initialValue={props.contact.data.name}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['contact', 'website']}
          label="Website"
          initialValue={props.contact.data.website}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact', 'email']}
          label="Email"
          initialValue={props.contact.data.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact', 'phone']}
          label="Phone"
          initialValue={props.contact.data.phone}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact', 'address']}
          label="Address"
          initialValue={props.contact.data.address}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['contact', 'tag']} label="Tag">
          <Input />
        </Form.Item>
        <Form.Item name={['contact', 'url']} label="URL" initialValue={props.contact.data.url}>
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

export default Update;

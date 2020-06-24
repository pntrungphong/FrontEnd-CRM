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

const Update = connect(({ company, loading }) => ({
  company,
  submitting: loading.effects['company/update'],
  querying: loading.effects['company/loading'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'company/loading',
      payload: { id: props.location.query.id },
    });
  });
  useUnmount(() => {
    props.dispatch({
      type: 'company/cleanData',
    });
  });
  const onFinish = (values) => {
    props.dispatch({
      type: 'company/update',
      payload: { ...values, id: props.location.query.id },
    });
    // console.log(props.submitting);
  };
  const [form] = Form.useForm();

  if (props.company.data === undefined) {
    return <Spin />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2> Update company </h2>
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
          initialValue={props.company.data.name}
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
          initialValue={props.company.data.website}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['company', 'phone']}
          label="Phone"
          initialValue={props.company.data.phone}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['company', 'email']}
          label="Email"
          initialValue={props.company.data.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['company', 'address']}
          label="Address"
          initialValue={props.company.data.address}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['company', 'tag']} label="Tag">
          <Input />
        </Form.Item>
        <Form.Item name={['company', 'url']} label="URL" initialValue={props.company.data.url}>
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

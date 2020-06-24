import { Spin, Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import 'antd/dist/antd.css';
import { useMount } from 'ahooks';
import styles from './style.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const Update = connect(({ updateContact, loading }) => ({
  updateContact,
  submitting: loading.effects['updateContact/submit'],
  querying: loading.effects['updateContact/loading'],
}))(function (props) {
  useMount(() => {
    console.log(props.querying);
    console.log(props.submitting);
    props.dispatch({
      type: 'updateContact/loading',
      payload: { id: props.location.query.id },
    });
  });
  const onFinish = (values) => {
    props.dispatch({
      type: 'updateContact/submit',
      payload: { ...values, id: props.location.query.id },
    });
  };
  const [form] = Form.useForm();

  if (props.updateContact.data === undefined) {
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
          initialValue={props.updateContact.data.name}
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
          initialValue={props.updateContact.data.website}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact', 'phone']}
          label="Phone"
          initialValue={props.updateContact.data.phone}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact', 'address']}
          label="Address"
          initialValue={props.updateContact.data.address}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['contact', 'tag']} label="Tag">
          <Input />
        </Form.Item>
        <Form.Item
          name={['contact', 'url']}
          label="URL"
          initialValue={props.updateContact.data.url}
        >
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

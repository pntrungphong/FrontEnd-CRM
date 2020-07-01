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

const Update = connect(({ lead, loading }) => ({
  lead,
  submitting: loading.effects['lead/update'],
  querying: loading.effects['lead/loading'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'lead/loading',
      payload: { id: props.location.query.id },
    });
  });
  useUnmount(() => {
    props.dispatch({
      type: 'lead/cleanData',
    });
  });
  const onFinish = (values) => {
    props.dispatch({
      type: 'lead/update',
      payload: { ...values, id: props.location.query.id },
    });
    // console.log(props.submitting);
  };
  const [form] = Form.useForm();

  if (props.lead.data === undefined) {
    return <Spin />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.title}> Update lead </h2>
      </div>

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['lead', 'name']}
          label="Name"
          initialValue={props.lead.data.name}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['lead', 'website']}
          label="Website"
          initialValue={props.lead.data.website}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['lead', 'phone']} label="Phone" initialValue={props.lead.data.phone}>
          <Input />
        </Form.Item>
        <Form.Item name={['lead', 'email']} label="Email" initialValue={props.lead.data.email}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['lead', 'address']}
          label="Address"
          initialValue={props.lead.data.address}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['lead', 'tag']} label="Tag">
          <Input />
        </Form.Item>
        <Form.Item name={['lead', 'url']} label="URL" initialValue={props.lead.data.url}>
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

import { Alert, Modal, Form, Input, InputNumber, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, Link, history } from 'umi';
import 'antd/dist/antd.css';
import styles from './style.less';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};





const Create = connect(({ companyAndcreatedetail, loading }) => ({
  companyAndcreatedetail,
  submitting: loading.effects['companyAndcreatedetail/submit'],
}))(function (props) {


  const onFinish = values => {
    props.dispatch({
      type: 'companyAndcreatedetail/submit',
      payload: { ...values },
    });
  };
  const [form] = Form.useForm();
  console.table(props.location);

  useEffect(() => {
   
    if (!props.companyAndcreatedetail) {
      return;
    }

    if (props.companyAndcreatedetail.status === 0) {
      history.push({
        pathname: '/company/',

      });
      props.dispatch({
        type: 'companyAndcreatedetail/changeStatus',
      });
    }
  }, [props.companyAndcreatedetail]);



  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2> Create company</h2>
      </div>

      <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'name']}
          label="Name"
          initialValue={(props.location.state == undefined||props.location.state.company==undefined)  ? "" : props.location.state.company.name}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          name={['user', 'website']}
          label="Website"
          initialValue={(props.location.state == undefined||props.location.state.company==undefined) ? "" : props.location.state.company.website}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'phone']}
          label="Phone"

        >
          <Input />

        </Form.Item>
        <Form.Item
          name={['user', 'address']}
          label="Address"

        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'tag']}
          label="Tag"

        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'url']}
          label="URL"

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


export default Create;
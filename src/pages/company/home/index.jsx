import { message, Modal, Form, Input, InputNumber, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect, Link, Row, Col, history } from 'umi';
import 'antd/dist/antd.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
  },
};
const success = () => {
  message.success('Tạo Company thành công');
};


class App extends React.Component {
  state = {

    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with async logic
        </Button>
        <Modal
          title="Create Company"
          visible={visible}
          footer={null}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >

          <Create />
        </Modal>
      </div>
    );
  }
}


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


const Create = connect(({ companyAndcreate, loading }) => ({
  companyAndcreate,
  submitting: loading.effects['companyAndcreate/submit'],
}))(function (props) {

  const onFinish = values => {
    props.dispatch({
      type: 'companyAndcreate/submit',
      payload: { ...values },
    });
  };

  const createDetail = () => {

    const company = form.getFieldValue('user');
    console.table(company);
    history.push({
      pathname: '/company/create',
      state: {
        company,
      },
    });

  };
  const [form] = Form.useForm();
  useEffect(() => {
    if (!props.companyAndcreate) {
      return;
    }
  
    if (props.companyAndcreate.status === 0 ) {
      success();
      // props.dispatch({
      //   type: 'companyAndupdate/changeStatus',
      // });

    }

  }, [props.companyAndcreate]);


  return (
    <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>

      <Form.Item  {...tailLayout}>
        <Button
          htmlType="button"
          style={{
            margin: '0 8px',
          }}
          onClick={createDetail}
        >
          Create Detail
        </Button>
        <Button type="primary" htmlType="submit" loading={props.submitting}>
          Submit
        </Button>




      </Form.Item>

    </Form>
  );
});



export default App;


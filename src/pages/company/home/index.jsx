import { message, Modal, Form, Input, Table, Button } from 'antd';
import React, {  useEffect } from 'react';
import { connect, history } from 'umi';
import 'antd/dist/antd.css';
import { useMount } from 'ahooks';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
  },
};
const columns = [

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
 
];


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
   
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create Company
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
        <ListCompany/>
      </div>
     
    );
  }
}


const validateMessages  = (label) => ({
  required: `${label} is required!`,

});


const ListCompany = connect(({ company }) => ({
  company,
}))(function (props) {
 
  useMount(() => {
    props.dispatch({
      type: 'company/loadData',
    });
  });


  return (
    <Table pagination={false} columns={columns} dataSource={props.company.companyInfo}></Table>
  );
});




const Create = connect(({ company, loading }) => ({
  company,
  submitting: loading.effects['company/submit'],
}))(function (props) {
  const [form] = Form.useForm();
  const onFinish = values => {
    props.dispatch({
      type: 'company/submit',
      payload: { ...values },
    });
  };

  const createDetail = () => {

    const company = form.getFieldValue('user');
  
    history.push({
      pathname: '/company/create',
      state: {
        company,
      },
    });

  };
 
  useEffect(() => {
    if (!props.company) {
      return;
    }
  
    if (props.company.createStatus === 0 ) {
      success();
      window.location.reload();
      // props.dispatch({
      //   type: 'companyAndupdate/changeStatus',
      // });

    }

  }, [props.company]);


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


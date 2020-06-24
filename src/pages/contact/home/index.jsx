import { Modal, Form, Input, Table, Button } from 'antd';
import React from 'react';
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
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <span>
        <a
          onClick={() => {
            window.location.href = `http://localhost:8000/contact/update?id=${record.id}`;
          }}
        >
          Update
        </a>
      </span>
    ),
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      props,
      confirmLoading: false,
    };
  }

  showModal = () => {
    this.state.props.dispatch({
      type: 'contact/modalHandle',
      payload: true,
    });
  };

  state = {
    visible: false,
    confirmLoading: false,
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
          Create Contact
        </Button>
        <Modal
          title="Create Contact"
          visible={visible}
          footer={null}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Create />
        </Modal>
        <ListContact />
      </div>
    );
  }
}

const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const ListContact = connect(({ contact, loading }) => ({
  contact,
  loading: loading.effects['contact/loadData'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'contact/loadData',
    });
  });

  return (
    <Table
      bordered
      loading={props.loading}
      pagination
      columns={columns}
      rowKey="id"
      dataSource={props.contact.contactInfo}
    />
  );
});

const Create = connect(({ contact, loading }) => ({
  contact,
  submitting: loading.effects['contact/submit'],
}))(function (props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.table(values);
    props.dispatch({
      type: 'contact/submit',
      payload: { ...values },
    });
  };

  const createDetail = () => {
    const contact = form.getFieldValue('contact');

    history.push({
      pathname: '/contact/create',
      state: {
        name: contact.name,
        phone: contact.phone,
      },
    });
  };

  return (
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
        initialValue=""
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['contact', 'phone']} label="Phone" initialValue="">
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
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

export default connect(({ contact }) => ({
  contact,
}))(App);

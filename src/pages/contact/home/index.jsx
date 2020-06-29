import { Modal, Tag, Form, Row, Pagination, Col, Input, Table, Button } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';

const { Search } = Input;

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
    render: (address) => (
      <>
        {address.map((item) => {
          return <Tag key={item}>{item.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone) => (
      <>
        {phone.map((item) => {
          return <Tag key={item}>{item.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
    render: (website) => (
      <>
        {website.map((item) => {
          return <Tag key={item}>{item.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email) => (
      <>
        {email.map((item) => {
          return <Tag key={item}>{item.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <ul>
        <li>
          <a
            onClick={() => {
              history.push({
                pathname: '/contact/update',
                query: {
                  id: record.id,
                },
              });
            }}
          >
            Update
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              history.push({
                pathname: '/contact/detail',
                query: {
                  id: record.id,
                },
              });
            }}
          >
            Detail
          </a>
        </li>
      </ul>
    ),
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      props,
    };
  }

  showModal = () => {
    this.state.props.dispatch({
      type: 'contact/handleCreateModal',
      payload: true,
    });
  };

  handleCancel = () => {
    this.props.dispatch({
      type: 'contact/handleCreateModal',
      payload: false,
    });
  };

  onSearch = (value) => {
    this.props.dispatch({
      type: 'contact/searchContactByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };

  render() {
    const { visible } = this.props.contact;
    return (
      <div>
        <Modal title="Create Contact" visible={visible} footer={null} onCancel={this.handleCancel}>
          <Create />
        </Modal>
        <Row>
          <Col span={16}>
            <Button type="primary" onClick={this.showModal}>
              Create Contact
            </Button>
          </Col>
          <Col span={8}>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={this.onSearch}
            />
          </Col>
        </Row>
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
  loading: loading.effects['contact/loadListContact'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'contact/loadListContact',
    });
  });

  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'contact/loadListContact',
      payload: {
        page,
        searchValue: props.contact.searchContactValue,
      },
    });
  };

  return (
    <div>
      <Table
        bordered
        loading={props.loading}
        pagination={false}
        columns={columns}
        rowKey="id"
        dataSource={props.contact.contactInfo}
      />
      <Pagination total={props.contact.itemCount} onChange={onPaginitionChange} />
    </div>
  );
});

const Create = connect(({ contact, loading }) => ({
  contact,
  submitting: loading.effects['contact/create'],
}))(function (props) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.dispatch({
      type: 'contact/create',
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

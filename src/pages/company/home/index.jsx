import { Modal, Form, Input, Tag, Table, Button } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
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
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
    render: (company) => (
      <>
        {company.map((item) => {
          return item.id !== undefined ? (
            <Tag key={item.id}>
              <a
                onClick={() => {
                  history.push({
                    pathname: '/contact/detail',
                    query: {
                      id: item.id,
                    },
                  });
                }}
              >
                {' '}
                {item.name.toUpperCase()}
              </a>
            </Tag>
          ) : (
            ''
          );
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
          return <Tag key={item.number}>{item.number.toUpperCase()}</Tag>;
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
          return <Tag key={item.url}>{item.url.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address',
  // },
  // {
  //   title: 'Phone',
  //   dataIndex: 'phone',
  //   key: 'phone',
  // },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  //   key: 'email',
  // },
  // {
  //   title: 'Website',
  //   dataIndex: 'website',
  //   key: 'website',
  // },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <ul>
        <li>
          <a
            onClick={() => {
              history.push({
                pathname: '/company/update',
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
                pathname: '/company/detail',
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
      type: 'company/handleCreateModal',
      payload: true,
    });
  };

  handleCancel = () => {
    this.props.dispatch({
      type: 'company/handleCreateModal',
      payload: false,
    });
  };

  render() {
    const { visible } = this.props.company;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create Company
        </Button>
        <Modal title="Create Company" visible={visible} footer={null} onCancel={this.handleCancel}>
          <Create />
        </Modal>
        <ListCompany />
      </div>
    );
  }
}

const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const ListCompany = connect(({ company, loading }) => ({
  company,
  loading: loading.effects['company/loadListCompany'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'company/loadListCompany',
    });
  });

  return (
    <Table
      bordered
      loading={props.loading}
      pagination
      columns={columns}
      rowKey="id"
      dataSource={props.company.companyInfo}
    />
  );
});

const Create = connect(({ company, loading }) => ({
  company,
  submitting: loading.effects['company/create'],
}))(function (props) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    props.dispatch({
      type: 'company/create',
      payload: { ...values },
    });
  };

  const createDetail = () => {
    const company = form.getFieldValue('company');

    history.push({
      pathname: '/company/create',
      state: {
        name: company.name,
        website: company.website,
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
        name={['company', 'name']}
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

      <Form.Item name={['company', 'website']} label="Website" initialValue="">
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

export default connect(({ company }) => ({
  company,
}))(App);

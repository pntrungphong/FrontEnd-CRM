import { Modal, Form, Input, Table, Button } from 'antd';
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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
      <ul>
        <li>
          <a
            onClick={() => {
              history.push({
                pathname: '/lead/update',
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
      type: 'lead/handleCreateModal',
      payload: true,
    });
  };

  handleCancel = () => {
    this.props.dispatch({
      type: 'lead/handleCreateModal',
      payload: false,
    });
  };

  render() {
    const { visible } = this.props.lead;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create lead
        </Button>
        <Modal title="Create lead" visible={visible} footer={null} onCancel={this.handleCancel}>
          <Create />
        </Modal>
        <ListLead />
      </div>
    );
  }
}

const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const ListLead = connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/loadListLead'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'lead/loadListLead',
    });
  });

  return (
    <Table
      bordered
      loading={props.loading}
      pagination
      columns={columns}
      rowKey="id"
      dataSource={props.lead.leadInfo}
    />
  );
});

const Create = connect(({ lead, loading }) => ({
  lead,
  submitting: loading.effects['lead/create'],
}))(function (props) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    props.dispatch({
      type: 'lead/create',
      payload: { ...values },
    });
  };

  const createDetail = () => {
    const lead = form.getFieldValue('lead');

    history.push({
      pathname: '/lead/create',
      state: {
        name: lead.name,
        website: lead.website,
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
        name={['lead', 'name']}
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

      <Form.Item name={['lead', 'website']} label="Website" initialValue="">
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

export default connect(({ lead }) => ({
  lead,
}))(App);

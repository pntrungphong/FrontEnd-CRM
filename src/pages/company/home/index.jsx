import { Form, Tag, Table, Button } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';

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
      // props,
    };
  }

  render() {
    return (
      <div>
        <Create />

        <ListCompany />
      </div>
    );
  }
}

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
}))(function () {
  const createDetail = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  return (
    <Form>
      <Form.Item>
        <Button
          htmlType="button"
          style={{
            margin: '0 8px',
          }}
          onClick={createDetail}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
});

export default connect(({ company }) => ({
  company,
}))(App);

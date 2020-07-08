import { Tag, Form, Pagination, Input, Table, Button, Row, Col } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount, useUnmount } from 'ahooks';
import Styles from './style.less';

const { Search } = Input;
const columns = [
  // {
  //   title: 'STT',
  //   dataIndex: 'stt',
  //   sorter: {
  //     compare: (a, b) => a.math - b.math,
  //     multiple: 10,
  //   },
  //   key: 'stt',
  // },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (company) => (
      <>
        {company.map((item) => {
          return item.key !== undefined ? (
            <Tag key={item.key}>
              <a
                onClick={() => {
                  history.push({
                    pathname: '/company/detail',
                    query: {
                      id: item.key,
                    },
                  });
                }}
              >
                {' '}
                {item.label.toUpperCase()}
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
          return (
            <div>
              <Row>
                <Col flex="40%">
                  <Tag key={item.type}>{item.type.toUpperCase()}</Tag>
                </Col>
                <Col flex="60%" style={{ textAlign: 'left' }}>
                  <Tag key={item.number}>{item.number.toUpperCase()}</Tag>
                </Col>
              </Row>
            </div>
          );
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
          return (
            <div>
              <Row>
                <Col flex="30%">
                  <Tag key={item.url}>{item.type.toUpperCase()}</Tag>
                </Col>
                <Col flex="70%">
                  <Tag key={item.url}>{item.url.toUpperCase()}</Tag>
                </Col>
              </Row>
            </div>
          );
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
    this.state = {};
  }

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
    return (
      <div>
        <div className={Styles.display}>
          <Create />
          <Search
            className={Styles.search}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={this.onSearch}
          />
        </div>
        <ListContact />
      </div>
    );
  }
}
const ListContact = connect(({ contact, loading }) => ({
  contact,
  loading: loading.effects['contact/loadListContact'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'contact/loadListContact',
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'contact/cleanData',
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

const Create = connect(({ contact }) => ({
  contact,
}))(function () {
  const createDetail = () => {
    history.push({
      pathname: '/contact/create',
    });
  };
  return (
    <Form>
      <Form.Item>
        <Button htmlType="button" onClick={createDetail}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
});
export default connect(({ contact }) => ({
  contact,
}))(App);

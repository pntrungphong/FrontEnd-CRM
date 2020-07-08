import { Form, Tag, Table, Pagination, Input, Button, Row, Col } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import Styles from './style.less';

const { Search } = Input;
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
          return item.key !== undefined ? (
            <Tag key={item.key}>
              <a
                onClick={() => {
                  history.push({
                    pathname: `/contact/detail/${item.key}`,
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
                  <Tag key={item.type}>{item.number.toUpperCase()}</Tag>
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
                <Col flex="50%">
                  <Tag key={item.url}>{item.type.toUpperCase()}</Tag>
                </Col>
                <Col flex="50%">
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
                pathname: `/company/update/${record.id}`,
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
                pathname: `/company/detail/${record.id}`,
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

  onSearch = (value) => {
    this.props.dispatch({
      type: 'company/searchCompanyByName',
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

  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'company/loadListCompany',
      payload: {
        page,
        searchValue: props.company.searchCompanyValue,
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
        dataSource={props.company.companyInfo}
      />
      <Pagination total={props.company.itemCount} onChange={onPaginitionChange} />
    </div>
  );
});

const Create = connect(({ company }) => ({
  company,
}))(function () {
  const createDetail = () => {
    history.push({
      pathname: '/company/create',
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

export default connect(({ company }) => ({
  company,
}))(App);

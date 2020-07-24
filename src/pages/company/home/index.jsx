import { Tag, Table, Pagination, Input, Button, Row } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './style.less';

const { Search } = Input;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => <h3>{name}</h3>,
    width: '15%',
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
    size: 'small',
    width: '30%',
    render: (company) => (
      <>
        {company.map((item) => {
          return item.key !== undefined ? (
            <a
              key={item.key}
              className={styles.customCell}
              onClick={() => {
                history.push({
                  pathname: `/contact/detail/${item.key}`,
                });
              }}
            >
              {item.label}
            </a>
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
    size: 'small',
    width: '15%',
    render: (phone) => (
      <>
        {phone.map((item) => {
          return item.number ? (
            <div>
              <Row>
                <Tag key={item.number} className={styles.customField}>
                  {item.number}
                </Tag>
              </Row>
            </div>
          ) : (
            ''
          );
        })}
      </>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    size: 'small',
    width: '30%',

    render: (email) => (
      <>
        {email.map((item) => {
          return item.type && item.url ? (
            <div>
              <Row>
                <Tag key={item.type} className={styles.customField}>
                  {item.type}: {item.url}
                </Tag>
              </Row>
            </div>
          ) : (
            ''
          );
        })}
      </>
    ),
  },

  {
    title: 'Action',
    key: 'action',
    size: 'small',
    width: '10%',

    render: (record) => (
      <ul className={styles.customUl}>
        <li>
          <a
            onClick={() => {
              history.push({
                pathname: `/company/update/${record.id}`,
              });
            }}
          >
            <FormOutlined /> Update
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
            <EyeOutlined /> Detail
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
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Create />
          <Search
            className={styles.search}
            placeholder="Search company by name"
            enterButton="Search"
            size="large"
            loading={this.props.loadingSearch}
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
  loadingSearch: loading.effects['company/searchCompanyByName'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'company/loadListCompany',
    });
  });
  const [currentPage, setcurrentPage] = useState(1);

  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'company/loadListCompany',
      payload: {
        page,
        searchValue: props.company.searchCompanyValue,
      },
    });
    setcurrentPage(page);
  };

  return (
    <div>
      <Table
        bordered
        loading={props.loading === true || props.loadingSearch === true}
        pagination={false}
        columns={columns}
        rowKey="id"
        size="small"
        dataSource={props.company.companyInfo}
      />
      {props.company.itemCount / 10 >= 1 ? (
        <Pagination
          current={currentPage}
          total={props.company.itemCount}
          onChange={onPaginitionChange}
        />
      ) : null}
    </div>
  );
});

const Create = connect(({ company }) => ({
  company,
}))(() => {
  const createDetail = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  return (
    <Button type="primary" onClick={createDetail}>
      Create New Company
    </Button>
  );
});

export default connect(({ company, loading }) => ({
  company,
  loadingSearch: loading.effects['lead/searchCompanyByName'],
}))(App);

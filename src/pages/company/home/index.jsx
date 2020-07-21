import { Tag, Table, Pagination, Input, Button, Row } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import styles from './style.less';

const { Search } = Input;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => <div className={styles.customField}>{name}</div>,
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
            <Tag key={item.key} className={styles.customFieldContact}>
              <a
                onClick={() => {
                  history.push({
                    pathname: `/contact/detail/${item.key}`,
                  });
                }}
              >
                {item.label}
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
    size: 'small',
    width: '20%',

    render: (phone) => (
      <>
        {phone.map((item) => {
          return item.type && item.number ? (
            <div>
              <Row>
                <Tag key={item.type} className={styles.customField}>
                  {item.type}: {item.number}
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
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Create />
          <Search
            className={styles.search}
            placeholder="input search text"
            enterButton="Search company"
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
}))((props) => {
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
        size="small"
        dataSource={props.company.companyInfo}
      />
      <Pagination total={props.company.itemCount} onChange={onPaginitionChange} />
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
    <Button htmlType="button" onClick={createDetail}>
      Create
    </Button>
  );
});

export default connect(({ company }) => ({
  company,
}))(App);

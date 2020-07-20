import { Tag, Pagination, Input, Table, Button, Row } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount, useUnmount } from 'ahooks';
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
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title) => <div className={styles.customField}>{title}</div>,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    size: 'small',
    render: (company) => (
      <>
        {company.map((item) => {
          return item.key !== undefined ? (
            <Tag key={item.key} className={styles.customFieldContact}>
              <a
                onClick={() => {
                  history.push({
                    pathname: `/company/detail/${item.key}`,
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
    render: (record) => (
      <ul className={styles.customUl}>
        <li>
          <a
            onClick={() => {
              history.push({
                pathname: `/contact/update/${record.id}`,
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
                pathname: `/contact/detail/${record.id}`,
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
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Create />
          <Search
            className={styles.search}
            placeholder="Search contact"
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
        size="small"
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
    <Button htmlType="button" onClick={createDetail}>
      Create
    </Button>
  );
});
export default connect(({ contact }) => ({
  contact,
}))(App);

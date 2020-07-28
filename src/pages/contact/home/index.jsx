import { Tag, Pagination, Input, Table, Button, Row } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import { useMount, useUnmount } from 'ahooks';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './style.less';

const { Search } = Input;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
    render: (name) => <h3>{name}</h3>,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: '15%',
    render: (title) => <h3>{title}</h3>,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    size: 'small',
    width: '25%',
    render: (company) => (
      <>
        {company.map((item) => {
          return item.key !== undefined ? (
            <a
              key={item.key}
              className={styles.customCell}
              onClick={() => {
                history.push({
                  pathname: `/company/detail/${item.key}`,
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
    width: '20%',
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
    width: '10%',
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
            <FormOutlined /> Update
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
            <EyeOutlined /> Detail
          </a>
        </li>
      </ul>
    ),
  },
];

class ListContactPage extends React.Component {
  onSearch = (value) => {
    this.props.dispatch({
      type: 'contact/searchByName',
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
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/contact/create',
              });
            }}
          >
            Create New Contact
          </Button>
          <Search
            className={styles.search}
            placeholder="Search contact by name"
            enterButton="Search"
            size="large"
            loading={this.props.loadingSearch}
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
  loading: loading.effects['contact/getList'],
  loadingSearch: loading.effects['contact/searchByName'],
}))((props) => {
  const [currentPage, setcurrentPage] = useState(1);

  useMount(() => {
    props.dispatch({
      type: 'contact/getList',
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'contact/cleanData',
    });
  });

  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'contact/getList',
      payload: {
        page,
        searchValue: props.contact.searchContactValue,
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
        size="small"
        rowKey="id"
        dataSource={props.contact.list}
      />
      {props.contact.itemCount / 10 >= 1 ? (
        <Pagination
          current={currentPage}
          total={props.contact.itemCount}
          onChange={onPaginitionChange}
        />
      ) : null}
    </div>
  );
});

export default connect(({ contact, loading }) => ({
  contact,
  loadingSearch: loading.effects['contact/searchByName'],
}))(ListContactPage);

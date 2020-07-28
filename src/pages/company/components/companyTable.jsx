import { Table, Tag, Pagination, Row } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import styles from '../style.less';

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
    render: (contact) => (
      <>
        {contact.map((item) => {
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
            <div key={item.number}>
              <Row>
                <Tag className={styles.customField}>{item.number}</Tag>
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
            <div key={item.url}>
              <Row>
                <Tag className={styles.customField}>
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

const CompanyTable = connect(({ company, loading }) => ({
  company,
  loading: loading.effects['company/getList'],
  loadingSearch: loading.effects['company/searchByName'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'company/getList',
    });
  });
  const [currentPage, setCurrentPage] = useState(1);

  const onPaginationChange = (page) => {
    props.dispatch({
      type: 'company/getList',
      payload: {
        page,
        searchValue: props.company.searchValue,
      },
    });
    setCurrentPage(page);
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
        dataSource={props.company.list}
      />
      {props.company.itemCount / 10 >= 1 ? (
        <Pagination
          current={currentPage}
          pageSizeOptions={[]}
          total={props.company.itemCount}
          onChange={onPaginationChange}
        />
      ) : null}
    </div>
  );
});

export default CompanyTable;

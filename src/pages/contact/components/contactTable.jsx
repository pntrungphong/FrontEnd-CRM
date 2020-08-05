import { Tag, Pagination, Table, Row } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import { useMount, useUnmount } from 'ahooks';
import { EyeOutlined } from '@ant-design/icons';
import UpdateContactDrawer from '../update/updateDrawer';
import styles from '../style.less';

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
            <Tag
              key={item.key}
              className={styles.customCell}
              onClick={() => {
                history.push({
                  pathname: `/company/detail/${item.key}`,
                });
              }}
            >
              {item.label}
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
    width: '15%',
    render: (phone) => (
      <>
        {phone.map((item) => {
          return item.number ? (
            <div key={item.number}>
              <Row>
                <h4 className={styles.customField}>{item.number}</h4>
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
            <div key={item.url}>
              <Row>
                <h4 className={styles.customField}>
                  {item.url} ({item.type})
                </h4>
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
          <span>
            <UpdateContactDrawer contactId={record.id} />
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              history.push({
                pathname: `/contact/detail/${record.id}`,
              });
            }}
          >
            <EyeOutlined />
          </span>
        </li>
      </ul>
    ),
  },
];

const ListContact = connect(({ contact, loading }) => ({
  contact,
  loading: loading.effects['contact/getList'],
  loadingSearch: loading.effects['contact/searchByName'],
}))((props) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const onPaginationChange = (page) => {
    props.dispatch({
      type: 'contact/getList',
      payload: {
        page,
        searchValue: props.contact.searchValue,
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
        size="small"
        rowKey="id"
        dataSource={props.contact.list}
      />
      {props.contact.itemCount / 10 >= 1 ? (
        <Pagination
          pageSizeOptions={[]}
          current={currentPage}
          total={props.contact.itemCount}
          onChange={onPaginationChange}
        />
      ) : null}
    </div>
  );
});

export default ListContact;

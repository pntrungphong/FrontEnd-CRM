import { Tag, Pagination, Input, Table, Button, Row, Col } from 'antd';
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
    size :"small",
    render: (company) => (
      <>
        {company.map((item) => {
          return item.key !== undefined ? (
           <Tag key={item.key} >
                <a
                  onClick={() => {
                    history.push({
                      pathname: `/company/detail/${item.key}`,
                    });
                  }}
                >
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
    size :"small",
    render: (phone) => (
      <>
        {phone.map((item) => {
          return item.type && item.number ? (
            <div>
              <Row>
                <Col flex="50%"><Tag key={item.type}>{item.type.toUpperCase()}</Tag></Col>
                <Col flex="50%"><Tag key={item.number} className={styles.tagM}>{item.number.toUpperCase()}</Tag></Col>              
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
    size :"small",

    render: (email) => (
      <>
        {email.map((item) => {
          return item.type && item.url ? (
            <div>
              <Row>
                <Col flex="100px"><Tag key={item.type}>{item.type.toUpperCase()}</Tag></Col>
                <Col flex="auto"><Tag key={item.url} className={styles.tagM}>{item.url.toUpperCase()}</Tag></Col>
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
            size="small"
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

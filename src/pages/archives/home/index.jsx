import { Tag, Table, Pagination, Input, Button, Row, Col } from 'antd';
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
    render: (archives) => (
      <>
        {archives.map((item) => {
          return item.key !== undefined ? (
            <Row>
              <Col flex="50%">
                <Tag key={item.key}>
                  <a
                    onClick={() => {
                      history.push({
                        pathname: `/contact/detail/${item.key}`,
                      });
                    }}
                  >
                    {item.label.toUpperCase()}
                  </a>
                </Tag>
              </Col>
              <Col flex="50%">
                <Tag key={item.key}>
                  <a
                    onClick={() => {
                      history.push({
                        pathname: `/contact/detail/${item.key}`,
                      });
                    }}
                  >
                    {item.label.toUpperCase()}
                  </a>
                </Tag>
              </Col>
            </Row>
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
          return item.type && item.number ? (
            <div>
              <Row>
                <Col flex="50%">
                  <Tag key={item.type}>{item.type.toUpperCase()}</Tag>
                </Col>
                <Col flex="50%">
                  <Tag key={item.number}>{item.number.toUpperCase()}</Tag>
                </Col>
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
    render: (email) => (
      <>
        {email.map((item) => {
          return item.type && item.url ? (
            <div>
              <Row>
                <Col flex="35%">
                  <Tag key={item.type}>{item.type.toUpperCase()}</Tag>
                </Col>
                <Col flex="63%">
                  <Tag key={item.url}>{item.url.toUpperCase()}</Tag>
                </Col>
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
      <ul className={Styles.customUl}>
        <li>
          <a
            onClick={() => {
              history.push({
                pathname: `/archives/update/${record.id}`,
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
                pathname: `/archives/detail/${record.id}`,
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
      type: 'archives/searchArchivesByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };

  render() {
    return (
      <div className={Styles.containerBox}>
        <div className={Styles.top}>
          <Create />
          <Search
            className={Styles.search}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={this.onSearch}
          />
        </div>
        <ListArchives />
      </div>
    );
  }
}

const ListArchives = connect(({ archives, loading }) => ({
  archives,
  loading: loading.effects['archives/loadListArchives'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'archives/loadListArchives',
    });
  });

  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'archives/loadListArchives',
      payload: {
        page,
        searchValue: props.archives.searchArchivesValue,
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
        // dataSource={props.archives.ArchivesInfo}
      />
      <Pagination onChange={onPaginitionChange} />
    </div>
  );
});

const Create = connect(({ archives }) => ({
  archives,
}))(() => {
  const createDetail = () => {
    history.push({
      pathname: '/archives/create',
    });
  };

  return (
    <Button htmlType="button" onClick={createDetail}>
      Create
    </Button>
  );
});

export default connect(({ archives }) => ({
  archives,
}))(App);

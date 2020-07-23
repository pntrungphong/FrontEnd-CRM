import { Tag, Pagination, Input, Table, Radio } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount, useUnmount } from 'ahooks';
import styles from './style.less';

const { Search } = Input;
const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};
const colorStatusStore = {
  'In-progress': 'blue',
  Win: 'green',
  Lost: 'red',
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (leadName) => <h3 className={styles.customField}>{leadName}</h3>,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (company) => (
      <>
        <a
          key={company.id}
          className={styles.customCell}
          onClick={() => {
            history.push({
              pathname: `/company/detail/${company.id}`,
            });
          }}
        >
          {company.name}
        </a>
      </>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Tag color={colorStatusStore[status]}>{status}</Tag>,
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    render: (rank) => <div className={styles.customCell}>{rankStore[rank]}</div>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <ul className={styles.customUl}>
        <li>
          <a onClick={() => history.push({ pathname: `/lead/detail/${record.id}` })}>Detail</a>
        </li>
      </ul>
    ),
  },
];

class App extends React.Component {
  onSearch = (value) => {
    this.props.dispatch({
      type: 'lead/searchLeadByName',
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
          <Search
            className={styles.search}
            placeholder="Search lead"
            enterButton="Search"
            size="large"
            onSearch={this.onSearch}
          />
        </div>
        <ListLead />
      </div>
    );
  }
}

const ListLead = connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/loadListLead'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'lead/loadListLead',
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'lead/cleanData',
    });
  });

  onchange(() => {});
  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'lead/loadListLead',
      payload: {
        page,
        searchValue: props.lead.searchLeadValue,
      },
    });
  };

  return (
    <div>
      <div className={styles.filterBox}>
        <h3>Status</h3>
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="In-progress">In-progress</Radio.Button>
          <Radio.Button value="Win">Win</Radio.Button>
          <Radio.Button value="Lost">Lost</Radio.Button>
        </Radio.Group>
      </div>

      <Table
        bordered
        loading={props.loading}
        pagination={false}
        columns={columns}
        size="small"
        rowKey="id"
        dataSource={props.lead.leadInfo}
      />
      <Pagination total={props.lead.itemCount} onChange={onPaginitionChange} />
    </div>
  );
});

export default connect(({ lead }) => ({
  lead,
}))(App);

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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (leadName) => <div className={styles.customField}>{leadName}</div>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (rank) => <div className={styles.customField}>{rankStore[rank]}</div>,
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    render: (rank) => <div className={styles.customField}>{rankStore[rank]}</div>,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    size: 'small',
    render: (company) => (
      <>
        {/* {company.name}  */}
        <Tag key={company.id} className={styles.ta}>
          <a
            onClick={() => {
              history.push({
                pathname: `/company/detail/${company.id}`,
              });
            }}
          >
            {company.name}
          </a>
        </Tag>
      </>
    ),
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
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          {/* <Create /> */}
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
      <div>
        <h3>Filter</h3>
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={1}>A</Radio.Button>
          <Radio.Button value={2}>B</Radio.Button>
          <Radio.Button value={3}>C</Radio.Button>
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

// const Create = connect(({ lead }) => ({
//   lead,
// }))(() => {
//   const createDetail = () => {
//     history.push({
//       pathname: '/lead/create',
//     });
//   };
//   return (
//     <Button htmlType="button" onClick={createDetail}>
//       Create
//     </Button>
//   );
// });
export default connect(({ lead }) => ({
  lead,
}))(App);

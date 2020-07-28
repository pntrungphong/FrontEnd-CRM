import { Pagination, Input, Table, Radio } from 'antd';
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
// const colorStatusStore = {
//   'In-progress': 'blue',
//   Win: 'green',
//   Lost: 'red',
// };

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (leadName) => <h3>{leadName}</h3>,
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
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
    render: (contact) => (
      <>
        {contact.map((item) => {
          return item.id !== undefined ? (
            <a
              key={contact.id}
              className={styles.customCell}
              onClick={() => {
                history.push({
                  pathname: `/contact/detail/${item.id}`,
                });
              }}
            >
              {item.name}
            </a>
          ) : (
            ''
          );
        })}
      </>
    ),
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
        status: this.props.lead.status,
      },
    });
  };

  render() {
    return (
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Search
            className={styles.search}
            placeholder="Search lead by name"
            loading={this.props.loadingSearch}
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
  loadingSearch: loading.effects['lead/searchLeadByName'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'lead/loadListLead',
      payload: {
        page: 1,
        searchValue: '',
        status: '',
      },
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'lead/cleanData',
    });
  });

  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'lead/loadListLead',
      payload: {
        page,
        searchValue: props.lead.leadSearchValue,
        status: props.lead.status,
      },
    });
  };

  const onFilter = (filterValue) => {
    switch (filterValue.target.value) {
      case 'All': {
        props.dispatch({
          type: 'lead/loadListLead',
          payload: {
            page: 1,
            searchValue: props.lead.leadSearchValue,
            status: '',
          },
        });
        props.dispatch({
          type: 'lead/saveStatus',
          payload: '',
        });
        break;
      }
      case 'In-progress': {
        props.dispatch({
          type: 'lead/loadListLead',
          payload: {
            page: 1,
            searchValue: props.lead.leadSearchValue,
            status: 'In-progress',
          },
        });
        props.dispatch({
          type: 'lead/saveStatus',
          payload: 'In-progress',
        });
        break;
      }
      case 'Lost': {
        props.dispatch({
          type: 'lead/loadListLead',
          payload: {
            page: 1,
            searchValue: props.lead.leadSearchValue,
            status: 'Lost',
          },
        });
        props.dispatch({
          type: 'lead/saveStatus',
          payload: 'Lost',
        });
        break;
      }
      case 'Win': {
        props.dispatch({
          type: 'lead/loadListLead',
          payload: {
            page: 1,
            searchValue: props.lead.leadSearchValue,
            status: 'Win',
          },
        });
        props.dispatch({
          type: 'lead/saveStatus',
          payload: 'Win',
        });
        break;
      }
      default:
        break;
    }
  };

  return (
    <div>
      <div className={styles.filterBox}>
        <h3>Status</h3>
        <Radio.Group defaultValue="All" buttonStyle="solid" onChange={onFilter}>
          <Radio.Button value="All">All</Radio.Button>
          <Radio.Button value="In-progress">In-progress</Radio.Button>
          <Radio.Button value="Win">Win</Radio.Button>
          <Radio.Button value="Lost">Lost</Radio.Button>
        </Radio.Group>
      </div>

      <Table
        bordered
        loading={props.loading === true || props.loadingSearch === true}
        pagination={false}
        columns={columns}
        size="small"
        rowKey="id"
        dataSource={props.lead.leadInfo}
      />
      {props.lead.itemCount / 10 >= 1 ? (
        <Pagination total={props.lead.itemCount} onChange={onPaginitionChange} />
      ) : null}
    </div>
  );
});

export default connect(({ lead, loading }) => ({
  lead,
  loadingSearch: loading.effects['lead/searchLeadByName'],
}))(App);

import { Pagination, Table, Radio } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { EyeOutlined } from '@ant-design/icons';
import styles from '../style.less';

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
    render: (leadName) => <h4>{leadName}</h4>,
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
              pathname: `/client/company/detail/${company.id}`,
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
                  pathname: `/client/contact/detail/${item.id}`,
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
          <a onClick={() => history.push({ pathname: `/sales/lead/detail/${record.id}` })}>
            <EyeOutlined />
          </a>
        </li>
      </ul>
    ),
  },
];

const ListLead = connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/getList'],
  loadingSearch: loading.effects['lead/searchLeadByName'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'lead/getList',
      payload: {
        page: 1,
        searchValue: '',
        status: '',
      },
    });
  });
  const [currentPage, setCurrentPage] = useState(1);

  const onPaginationChange = (page) => {
    props.dispatch({
      type: 'lead/getList',
      payload: {
        page,
        searchValue: props.lead.searchValue,
        status: props.lead.status,
      },
    });
    setCurrentPage(page);
  };

  const onFilter = (filterValue) => {
    switch (filterValue.target.value) {
      case 'All': {
        props.dispatch({
          type: 'lead/getList',
          payload: {
            page: 1,
            searchValue: props.lead.searchValue,
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
          type: 'lead/getList',
          payload: {
            page: 1,
            searchValue: props.lead.searchValue,
            status: 'In-progress',
          },
        });
        props.dispatch({
          type: 'lead/saveStatus',
          payload: 'In-progress',
        });
        break;
      }
      case 'Undeal': {
        props.dispatch({
          type: 'lead/getList',
          payload: {
            page: 1,
            searchValue: props.lead.searchValue,
            status: 'Undeal',
          },
        });
        props.dispatch({
          type: 'lead/saveStatus',
          payload: 'Undeal',
        });
        break;
      }
      case 'Deal': {
        props.dispatch({
          type: 'lead/getList',
          payload: {
            page: 1,
            searchValue: props.lead.searchValue,
            status: 'Deal',
          },
        });
        props.dispatch({
          type: 'lead/saveStatus',
          payload: 'Deal',
        });
        break;
      }
      default:
        break;
    }
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={styles.filterBox}>
        <h3>Status</h3>
        <Radio.Group defaultValue="All" buttonStyle="solid" onChange={onFilter}>
          <Radio.Button value="All">All</Radio.Button>
          <Radio.Button value="In-progress">In-progress</Radio.Button>
          <Radio.Button value="Deal">Deal</Radio.Button>
          <Radio.Button value="Undeal">Undeal</Radio.Button>
        </Radio.Group>
      </div>

      <Table
        bordered
        loading={props.loading === true || props.loadingSearch === true}
        pagination={false}
        columns={columns}
        size="small"
        rowKey="id"
        dataSource={props.lead.list}
      />
      {props.lead.itemCount / 10 >= 1 ? (
        <Pagination
          current={currentPage}
          pageSizeOptions={[]}
          total={props.lead.itemCount}
          onChange={onPaginationChange}
        />
      ) : null}
    </div>
  );
});

export default ListLead;

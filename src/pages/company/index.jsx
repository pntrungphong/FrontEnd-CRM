import React from 'react';
import './style.less';
import 'antd/dist/antd.css';
import { Typography, Table, Tag, Space } from 'antd';
import { } from 'antd';
import { connect } from 'umi';
import { useMount } from 'ahooks';
const Company = connect(({ company }) => ({
  company,
}))(function (props) {
  // const { companyLog = {}, submitting } = props;
  // const { companyInfor = { URL, email, name, address, contact, tag, phone, website } } = companyLog;

  useMount(() => {
    props.dispatch({
      type: 'company/loadData',
    });
  });


  //userMount in hooks
  //class + componentDidMoun

  return (
    <Table pagination={false} columns={columns} dataSource={props.company.companyInfor}></Table>
  );
});

const columns = [
  // {
  //   address: "string",
  //   name: "aa",
  //   phone: "string",
  //   website: "string",
  //   render: (text) => <a>{text}</a>,
  // },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag classname="one" color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <Space className="two" size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default Company;

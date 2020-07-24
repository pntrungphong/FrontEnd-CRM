import React from 'react';
import { history } from 'umi';
import { Tag, List } from 'antd';
import { PaperClipOutlined, FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { downloadFile } from '../../../../utils/downloadfile';
import styles from './style.less';

// if function
const LeadInfomation = (props) => {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Lead Information</h2>
      </div>
      <div className={styles.contentLead}>
        <h4>Name: {props.lead.name}</h4>
        <h4>
          Company:{' '}
          <a
            onClick={() => {
              history.push({
                pathname: `/company/detail/${props.lead.company.key}`,
              });
            }}
          >
            {props.lead.company.label}
          </a>{' '}
        </h4>
        <h4>
          Contact:{' '}
          {props.lead.contact.map((item, index, listContact) => (
            <a
              onClick={() => {
                history.push({
                  pathname: `/contact/detail/${item.key}`,
                });
              }}
              key={item.label}
            >
              {' '}
              {item.label}
              {index + 1 === listContact.length ? '' : ','}
            </a>
          ))}
        </h4>
        <h4>
          Relation to:{' '}
          {props.lead.relation.map((item, index, listContact) => (
            <a
              onClick={() => {
                history.push({
                  pathname: `/contact/detail/${item.key}`,
                });
              }}
              key={item.label}
            >
              {' '}
              {item.label}
              {index + 1 === listContact.length ? '' : ','}
            </a>
          ))}
        </h4>
        <h4>
          Description: <p>{props.lead.description}</p>
        </h4>
        {props.lead.note ? (
          <h4>
            Note: <p>{props.lead.note}</p>
          </h4>
        ) : (
          ''
        )}
        <h4>
          {props.lead.tag.map((item) => (
            <a key={item.label}>#{item.label}</a>
          ))}
        </h4>
        <h4>Brief:</h4>
        <List
          itemLayout="horizontal"
          dataSource={props.lead.file}
          locale={{ emptyText: 'No file' }}
          renderItem={(item) => (
            <List.Item>
              <h3>
                <PaperClipOutlined style={{ color: '#66666666' }} />{' '}
                <a onClick={() => downloadFile(item)}>{item.originalname}</a>
              </h3>
              <Tag>
                <FormOutlined /> Add Note
              </Tag>
              <h3>{moment(item.createdAt).format('DD/MM/YYYY')}</h3>
              <Tag
                color="#EFDBFF"
                style={{ color: 'black', borderRadius: '20px', fontWeight: '500' }}
              >
                Lead generation
              </Tag>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
export default LeadInfomation;

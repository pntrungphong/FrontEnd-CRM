import React from 'react';
import { history } from 'umi';
import { Tag, List } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import moment from 'moment';
import { downloadFile } from '../../../../../utils/downloadfile';
import styles from './style.less';

// if function
const LeadInfomation = (props) => {
  return (
    <>
      <div className={styles.contentLead}>
        <h4>Name: {props.lead.name}</h4>
        <h4>
          Company:{' '}
          <a
            onClick={() => {
              history.push({
                pathname: `/client/company/detail/${props.lead.company.key}`,
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
                  pathname: `/client/contact/detail/${item.key}`,
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
          Related to:{' '}
          {props.lead.relation.map((item, index, listContact) => (
            <a
              onClick={() => {
                history.push({
                  pathname: `/client/contact/detail/${item.key}`,
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
          className={styles.customBrief}
          itemLayout="horizontal"
          dataSource={props.lead.file}
          locale={{ emptyText: 'No file' }}
          renderItem={(item) => (
            <List.Item>
              <h3>
                <PaperClipOutlined style={{ color: '#66666666' }} />{' '}
                <a onClick={() => downloadFile(item)}>{item.originalname}</a>
              </h3>
              <h3>{moment(item.createdAt).format('DD/MM/YYYY')}</h3>
              <h3>
                <a>{item.createdBy}</a>
              </h3>
              <Tag
                color="#EFDBFF"
                style={{ color: 'black', borderRadius: '20px', fontWeight: '600' }}
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
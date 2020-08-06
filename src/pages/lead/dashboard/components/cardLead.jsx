import React from 'react';
import { Avatar, Typography } from 'antd';
import moment from 'moment';
import { AntDesignOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from './cardLead.less';

const { Title } = Typography;

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};
const rankColor = {
  '0': '#fa7580',
  '1': '#f1753b',
  '2': '#269f99',
  '3': '#f1753b',
};

const CardLead = (props) => {
  const { lead } = props;
  return (
    <div className={styles.cardLead}>
      <div className={styles.contentBox}>
        <Title
          ellipsis={{ rows: 1, expandable: true, symbol: '..' }}
          level={4}
          className={styles.leadName}
        >
          {lead.name}
        </Title>
        <div className={styles.meetingDate}>
          {moment(lead.touchPoint.meetingDate).format('MMM DD - h:mm a')}
        </div>
        <div className={styles.rankTitle} style={{ background: rankColor[lead.rank] }}>
          <span>{rankStore[lead.rank]}</span>
        </div>
        <div className={styles.pic}>
          <div className={styles.picAvatar}>
            <Avatar.Group>
              <Avatar size="small" className={styles.avatar} icon={<AntDesignOutlined />} />
              <Avatar
                size="small"
                className={styles.avatar}
                style={{ backgroundColor: '#f56a00' }}
                icon={<AntDesignOutlined />}
              />
              <Avatar
                size="small"
                className={styles.avatar}
                style={{ backgroundColor: '#1890ff' }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </div>
          <div className={styles.picIcon}>
            {lead.touchPoint.task?.length} <UnorderedListOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLead;

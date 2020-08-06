import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';
import PICTask from './picBox';
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
const laneColor = {
  LM: '#D3ADF7',
  PC: '#B5F5EC',
  PH: '#FFCCC7',
};
const getDateInfo = (meetingDate) => {
  const data = moment(meetingDate);
  let color = '#979797';
  let description = data.fromNow();
  const title = data.format('MMM DD - HH:MM');
  if (data.isSame(moment(), 'day')) {
    color = '#1890FF';
    description = 'Today';
  } else if (data.isAfter(moment(), 'day')) {
    color = '#D4B106';
  } else if (data.isBefore(moment(), 'day')) {
    color = '#A8071A';
  }
  return { color, description, title };
};

const CardLead = (props) => {
  const { lead } = props;
  const touchPoint = lead.touchPoint[0] ?? {};
  const dateInfo = getDateInfo(touchPoint.meetingDate);
  return (
    <div className={styles.cardLead}>
      <div className={styles.contentBox} style={{ borderColor: laneColor[touchPoint.lane] }}>
        <Title
          ellipsis={{ rows: 1, expandable: true, symbol: '..' }}
          level={4}
          className={styles.leadName}
        >
          {lead.name}
        </Title>
        <div className={styles.meetingDateBox}>
          <div className={styles.meetingDate} style={{ background: dateInfo.color }}>
            <CalendarOutlined /> {dateInfo.title}
          </div>
          <div className={styles.dueDay}>{dateInfo.description}</div>
        </div>
        <div className={styles.rankTitle} style={{ background: rankColor[lead.rank] }}>
          <span>{rankStore[lead.rank]}</span>
        </div>
        {touchPoint.task?.length ? (
          <PICTask task={touchPoint.task ?? []} />
        ) : (
          <span style={{ marginBottom: '5px', display: 'block' }} />
        )}
      </div>
    </div>
  );
};

export default CardLead;

import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PICTask from './picBox';
import styles from './cardLead.less';
import * as def from '../../components/definition';

const { Title } = Typography;

const getDateInfo = (meetingDate) => {
  const data = moment(meetingDate);
  let backgroundColor = '#979797';
  let color = '#FFFFFF';
  let description = data.fromNow();
  const title = data.format('MMM DD - HH:MM');
  if (data.isSame(moment(), 'day')) {
    backgroundColor = '#1890FF';
    description = 'Today';
  } else if (data.isAfter(moment(), 'day')) {
    backgroundColor = '#D4B106';
  } else if (data.isBefore(moment(), 'day')) {
    backgroundColor = '#D7D5D5';
    color = '#373D40';
  }
  return { backgroundColor, color, description, title };
};

const CardLead = (props) => {
  const { lead } = props;
  const touchPoint = lead.touchPoint[0] ?? {};
  const dateInfo = getDateInfo(touchPoint.meetingDate);
  const tpIsDone = touchPoint.status === 'Done';
  return (
    <div className={styles.cardLead}>
      <div
        className={styles.contentBox}
        style={{ borderColor: def.laneBoderColor[touchPoint.lane] }}
      >
        <Title
          ellipsis={{ rows: 1, expandable: true, symbol: '..' }}
          level={4}
          className={styles.leadName}
        >
          {lead.name}
        </Title>
        {tpIsDone ? (
          <div className={styles.showPlanning}>
            <FontAwesomeIcon icon={faArrowRight} size="2x" />
          </div>
        ) : (
          <>
            <div className={styles.meetingDateBox}>
              <div
                className={styles.meetingDate}
                style={{ background: dateInfo.backgroundColor, color: dateInfo.color }}
              >
                <CalendarOutlined /> {dateInfo.title}
              </div>
              <div className={styles.dueDay}>{dateInfo.description}</div>
            </div>
            <PICTask tasks={touchPoint.task ?? []} />
          </>
        )}
      </div>
      <div className={styles.rankTitle} style={{ background: def.laneBoderColor[touchPoint.lane] }}>
        <span>{def.rankTitle[lead.rank]}</span>
      </div>
    </div>
  );
};

export default CardLead;

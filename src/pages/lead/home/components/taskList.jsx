import React from 'react';
import { Divider, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ViewTaskTable from '../../components/touchpointModal/viewtask';
import styles from '../style.less';

const taskColorStore = {
  'Proposal Handling': '#B5F5EC',
  'Lead Management': '#D3ADF7',
  'Product Consulting': '#1890FF',
};
const TaskList = (props) => {
  return props.showTask ? (
    <>
      <Divider className={styles.customDivider} />
      <div className={styles.spanTwo}>
        {props.touchpointItem.task.slice(0, 3).map((taskItem) => {
          return (
            <div key={taskItem.id} className={styles.spaceTask}>
              <span className={styles.textTouchPoint}>
                <FontAwesomeIcon
                  icon={faDotCircle}
                  size="xs"
                  style={{
                    marginRight: '5px',
                    color: taskColorStore[taskItem.type],
                    background: taskColorStore[taskItem.type],
                    borderRadius: '50%',
                  }}
                />
                {taskItem.taskName}
                <br />
              </span>
              <span className={styles.taskDueDate}>{moment(taskItem.dueDate).format('DD-MM')}</span>
              <span className={styles.avatarPIC}>
                <Avatar style={{ verticalAlign: 'middle' }} src={taskItem.avatar} size="small">
                  {taskItem.userName}
                </Avatar>
              </span>
            </div>
          );
        })}
        <div className={styles.viewmore}>
          {props.touchpointItem.task.length > 3 ? (
            <ViewTaskTable
              touchpointId={props.touchpointItem.id}
              listTask={props.touchpointItem.task}
              dispatch={props.dispatch}
              rank={props.item.rank}
              name={props.item.name}
              status={props.touchpointItem.status}
              leadId={props.item.id}
            />
          ) : null}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default TaskList;

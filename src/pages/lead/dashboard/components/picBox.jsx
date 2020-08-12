import React from 'react';
import { Avatar } from 'antd';
import { AntDesignOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from './cardLead.less';

const PICBox = (props) => {
  return (
    <div className={styles.pic}>
      <div className={styles.picAvatar}>
        <Avatar.Group>
          {props.tasks.map((task) => {
            return (
              <Avatar
                key={task.id}
                size="small"
                className={styles.avatar}
                src={task.user.avatar}
                icon={<AntDesignOutlined />}
              />
            );
          })}
        </Avatar.Group>
      </div>
      <div className={styles.picIcon}>
        {props.tasks.length} <UnorderedListOutlined />
      </div>
    </div>
  );
};

export default PICBox;

import React from 'react';
import { Avatar } from 'antd';
import { AntDesignOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from './cardLead.less';

const PICBox = (props) => {
  return (
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
        {props.task.length} <UnorderedListOutlined />
      </div>
    </div>
  );
};

export default PICBox;
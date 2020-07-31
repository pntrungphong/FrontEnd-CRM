import React from 'react';
import styles from '../style.less';

const tagBackgroundStore = {
  Done: styles.doneStatusTag,
  'In-progress': styles.inProgressStatusTag,
  Planning: styles.daftStatusTag,
};

const StatusTag = (statusProps) => {
  const tagBackground = tagBackgroundStore[statusProps.status];
  return <div className={[styles.statusTag, tagBackground].join(' ')}>{statusProps.status}</div>;
};

export default StatusTag;

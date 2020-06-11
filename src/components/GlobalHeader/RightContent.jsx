import React from 'react';
import { connect } from 'umi';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';

const GlobalHeaderRight = () => {
  const className = styles.right;

  return (
    <div className={className}>
      <NoticeIconView />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);

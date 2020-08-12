import React from 'react';
import { Space } from 'antd';
import styles from '../style.less';
import * as def from '../../components/definition';

const LISTDEFAULTLANE = ['HOV', 'LM', 'PC', 'PH'];
const LaneTitle = () => {
  return (
    <div className={styles.laneColumn}>
      <h3 className={styles.touchPointTitle}>#</h3>
      <div className={styles.stateColumn}>
        <Space align="center" direction="vertical" className={styles.stateBox}>
          {LISTDEFAULTLANE.map((item) => {
            return (
              <div
                className={styles.laneTitle}
                key={item}
                style={{ background: def.laneColor[item] }}
              >
                <h3>{def.laneTitle[item]}</h3>
              </div>
            );
          })}
        </Space>
      </div>
    </div>
  );
};

export default LaneTitle;
export { LISTDEFAULTLANE };

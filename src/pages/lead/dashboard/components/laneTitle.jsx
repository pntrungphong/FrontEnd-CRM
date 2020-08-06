import React from 'react';
import { Space } from 'antd';
import styles from '../style.less';

const LISTDEFAULTLANE = ['#HOV', '#LM', '#PC', '#PH'];
const laneColor = {
  '#HOV': '#A8071A',
  '#LM': '#D3ADF7',
  '#PC': '#B5F5EC',
  '#PH': '#FFCCC7',
};
const LaneTitle = () => {
  return (
    <div className={styles.laneColumn}>
      <h3 className={styles.touchPointTitle}>LANE</h3>
      <div className={styles.stateColumn}>
        <Space align="center" direction="vertical">
          {LISTDEFAULTLANE.map((item) => {
            return (
              <div className={styles.laneTitle} key={item} style={{ borderColor: laneColor[item] }}>
                <h3> {item} </h3>
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

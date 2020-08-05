import { Spin, Space, Card } from 'antd';
import React from 'react';
import { connect } from 'umi';
import CardLead from './components/cardLead';
import styles from './style.less';

const listLane = ['#HOV', '#LM', '#PC', '#PH'];

const DashBoard = (props) => {
  if (props.loading === true) return <Spin />;
  return (
    <div className={styles.containerBox}>
      <div className={styles.controllerBox}>
        <div className={styles.laneColumn}>
          <h3 className={styles.touchPointTitle}>LANE</h3>
          <div className={styles.stateColumn}>
            <Space align="center" direction="vertical">
              {listLane.map((item) => {
                return (
                  <div className={styles.laneTitle}>
                    <h3> {item} </h3>
                  </div>
                );
              })}
            </Space>
          </div>
        </div>
        <div className={styles.horScroll}>
          <div className={styles.touchPointCol}>
            {listLane.map((item, index) => {
              return (
                <Space
                  key={item.id}
                  align="center"
                  direction="horizontal"
                  className={styles.customSpaceTP}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, touchPointIndex) => {
                    return (
                      <div key={touchPointIndex}>
                        {index === 0 ? (
                          <h1 className={styles.touchPointTitle}>#{touchPointIndex + 1}</h1>
                        ) : null}
                        <Card className={styles.touchPointBox}>
                          <CardLead />
                          <CardLead />
                        </Card>
                      </div>
                    );
                  })}
                </Space>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/getList'],
}))(DashBoard);

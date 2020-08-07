import { Spin, Space, Card } from 'antd';
import React from 'react';
import { connect } from 'umi';
import CardLead from './components/cardLead';
import CreateLead from '../create/createlead';
import styles from './style.less';
import LaneTitle, { LISTDEFAULTLANE } from './components/laneTitle';
import TouchPointCreateForm from './components/leadDetailModal/leadModal';

const DEFAULTLISTTP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class DashBoard extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: 'lead/getListWithLane', payload: {} });
  }

  render() {
    const { lead, loading } = this.props;
    if (lead.onGoingList?.length === 0) return <Spin />;

    const { leadHov, leadLM, leadPC, leadPH } = lead.onGoingList;
    const lanes = [leadHov, leadLM, leadPC, leadPH];

    return (
      <Spin spinning={loading === true}>
        <div className={styles.containerBox}>
          <div className={styles.titleBox}>
            <h1>Sales Dashboard</h1>
            <CreateLead />
          </div>
          <div className={styles.controllerBox}>
            <LaneTitle />
            <div className={styles.horScroll}>
              <div className={styles.touchPointCol}>
                {lanes.map((listLead, index) => {
                  return (
                    <Space
                      key={LISTDEFAULTLANE[index]}
                      align="center"
                      direction="horizontal"
                      className={styles.customSpaceTP}
                    >
                      {DEFAULTLISTTP.map((_, tpIndex) => {
                        return (
                          <div className={styles.boxStateTP} key={LISTDEFAULTLANE[index] + tpIndex}>
                            {index === 0 ? (
                              <h1 className={styles.touchPointTitle}>#{tpIndex || 'Bus stop'}</h1>
                            ) : (
                              ''
                            )}
                            <Card className={styles.touchPointBox}>
                              {listLead.map((leadItem) => {
                                if (leadItem.touchPoint[0]?.order === tpIndex)
                                  return (
                                    <TouchPointCreateForm
                                      currentStatus={leadItem.touchPoint[0].status}
                                      currentType={leadItem.touchPoint[0].lane}
                                      currentTouchPoint={leadItem.touchPoint[0]}
                                      leadDetail={leadItem}
                                      show={false}
                                      key={`TPUpt${leadItem.touchPoint[0]?.id}`}
                                    >
                                      <CardLead key={leadItem.touchPoint[0]?.id} lead={leadItem} />
                                    </TouchPointCreateForm>
                                  );
                                return null;
                              })}
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
      </Spin>
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/getListWithLane'],
}))(DashBoard);

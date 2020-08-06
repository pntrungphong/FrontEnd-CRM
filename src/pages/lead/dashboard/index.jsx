import { Spin, Space, Card, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import CardLead from './components/cardLead';
import styles from './style.less';
import LaneTitle, { LISTDEFAULTLANE } from './components/laneTitle';

const DEFAULTLISTTP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class DashBoard extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch({ type: 'lead/getListWithLane', payload: {} });
  }

  componentDidMount() {
    // this.props.dispatch({ type: 'lead/getListWithLane', payload: {} });
  }

  render() {
    const { lead, loading } = this.props;
    if (loading === true || lead.list?.length === 0) return <Spin />;

    const { leadHov, leadLM, leadPC, leadPH } = lead.list;
    const lanes = [leadHov, leadLM, leadPC, leadPH];
    return (
      <div className={styles.containerBox}>
        <div className={styles.titleBox}>
          <h1>Sales Dashboard</h1>
          <Button type="primary">Create new lead</Button>
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
                            <h1 className={styles.touchPointTitle}>#{tpIndex + 1}</h1>
                          ) : (
                            ''
                          )}
                          <Card className={styles.touchPointBox}>
                            {listLead.map((leadItem) => {
                              if (leadItem.touchPoint[0]?.order === tpIndex + 1)
                                return (
                                  <CardLead key={leadItem.touchPoint[0]?.id} lead={leadItem} />
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
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/getListWithLane'],
  // listLane: mocks.getListLead,
}))(DashBoard);

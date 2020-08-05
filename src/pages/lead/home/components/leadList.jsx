import { Space, Card, Col, Row, Spin } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { useMount } from 'ahooks';
import moment from 'moment';
import TouchPointCreateForm from '../../components/touchpointModal/touchpointmodal';
import styles from '../style.less';
import AddTouchPointButton from '../../components/addButton/addtouchpointbutton';
import CreateLead from '../../create/createlead';
import LeadCard from './leadCard';
import TaskList from './taskList';
import StatusTag from './statusTag';

const statusPhaseBorderStore = {
  Done: styles.donePhase,
  'In-progress': styles.inProgressPhase,
  Planning: styles.daftPhase,
};

const ListLead = connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/getList'],
  loadingSearch: loading.effects['lead/searchLeadByName'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'lead/getList',
    });
    props.dispatch({
      type: 'lead/saveStatus',
      payload: 'In-progress',
    });
  });

  return (
    <Spin spinning={props.loading === true || props.loadingSearch === true}>
      <div className={styles.spaceAll}>
        <div className={styles.spaceOne}>
          <div className={styles.spanTitle}>
            <span>Name</span>
            <span>Rank</span>
            <span>
              <CreateLead />
            </span>
          </div>
          <div className={styles.spacing}>
            <Space align="center" direction="vertical">
              {props.lead.list.map((item) => {
                return <LeadCard item={item} key={item.id} />;
              })}
            </Space>
          </div>
        </div>
        <div className={styles.horScroll}>
          <div className={styles.touchPointCol}>
            {props.lead.list.map((item, index) => {
              return (
                <Space key={item.id} align="center" direction="horizontal">
                  {item.touchPoint.map((touchPointItem, touchPointIndex) => {
                    // const listType = [];
                    return (
                      <div key={touchPointIndex}>
                        {index === 0 ? (
                          <h3 className={styles.titleOne}>TouchPoint {touchPointIndex + 1}</h3>
                        ) : null}
                        <Card
                          className={[
                            styles.phaseCard,
                            statusPhaseBorderStore[touchPointItem.status],
                          ]}
                        >
                          <div className={styles.spaceTouchPoint}>
                            <p className={styles.titleTwo}>{touchPointItem.duration}</p>
                            <StatusTag status={touchPointItem.status} />

                            <TouchPointCreateForm
                              touchpointId={touchPointItem.id}
                              company={item.company}
                              listTask={touchPointItem.task}
                              dispatch={props.dispatch}
                              rank={item.rank}
                              actualdate={touchPointItem.actualDate}
                              name={item.name}
                              goal={touchPointItem.goal}
                              status={touchPointItem.status}
                              leadId={item.id}
                            />
                            <div>
                              <Row>
                                <Col flex="2">
                                  <h3 className={styles.meetingDate}>
                                    {touchPointItem.status === 'Done' ? (
                                      <>
                                        Actual date:{' '}
                                        {moment(touchPointItem.actualDate).format('DD-MM')}
                                      </>
                                    ) : (
                                      <>
                                        Meeting date:{' '}
                                        {touchPointItem.meetingDate
                                          ? moment(touchPointItem.meetingDate).format('DD-MM')
                                          : 'Not set'}
                                      </>
                                    )}
                                  </h3>
                                </Col>
                                {touchPointItem.task.length <= 0 ? (
                                  <div className={styles.counttime}>
                                    <Col flex="2">{moment(touchPointItem.createdAt).fromNow()}</Col>
                                  </div>
                                ) : null}
                              </Row>
                            </div>
                            <h3 className={styles.goalText}>
                              <span>Goal</span>: {touchPointItem.goal}
                            </h3>
                            {touchPointItem.status === 'Done' ? (
                              <h3 className={styles.goalText}>
                                <span>Review</span>: {touchPointItem.review}
                              </h3>
                            ) : (
                              <></>
                            )}
                          </div>
                          <TaskList
                            showTask={touchPointItem.status !== 'Done'}
                            touchpointItem={touchPointItem}
                            item={item}
                          />
                        </Card>
                      </div>
                    );
                  })}
                  <div>
                    {index === 0 ? (
                      <h3 className={styles.titleOne}>Touchpoint {item.touchPoint.length + 1}</h3>
                    ) : null}
                    <Card className={styles.emptyCard}>
                      <AddTouchPointButton key={item.id} id={item.id} />
                    </Card>
                  </div>
                  {props.lead.list.map((_, secondIndex) => {
                    const key = secondIndex;
                    if (
                      secondIndex >=
                      props.lead.list.length - props.lead.list[0].touchPoint.length
                    )
                      return null;
                    return (
                      <div key={`additioncolum-${item.id} ${key}`}>
                        {index === 0 ? (
                          <h3 className={styles.titleOne}>
                            Touchpoint {item.touchPoint.length + secondIndex + 2}
                          </h3>
                        ) : null}
                        <Card className={styles.emptyCard} />
                      </div>
                    );
                  })}
                </Space>
              );
            })}
          </div>
        </div>
      </div>
    </Spin>
  );
});

export default ListLead;
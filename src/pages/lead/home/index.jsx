import { Input, Space, Card, Col, Row, Spin } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { useMount } from 'ahooks';
import moment from 'moment';
import TouchpointCreateForm from '../components/touchpointModal/touchpointmodal';
import styles from './style.less';
import AddTouchpointButton from '../components/addButton/addtouchpointbutton';
import CreateLead from '../create/createlead';
import LeadCard from './components/leadCard';
import TaskList from './components/taskList';

const { Search } = Input;
class App extends React.Component {
  onSearch = (value) => {
    this.props.dispatch({
      type: 'lead/searchLeadByName',
      payload: {
        page: 1,
        searchValue: value,
        status: this.props.lead.status,
      },
    });
  };

  render() {
    return (
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Search
            className={styles.search}
            placeholder="Search lead by name"
            enterButton="Search"
            loading={this.props.loadingSearch}
            size="large"
            onSearch={this.onSearch}
          />
        </div>
        <ListLead />
      </div>
    );
  }
}

const statusPhaseBoderStore = {
  Done: styles.donePhase,
  'In-progress': styles.inprogessPhase,
  Draft: styles.daftPhase,
};

const tagBackgoundStore = {
  Done: styles.doneStatusTag,
  'In-progress': styles.inprogessStatusTag,
  Draft: styles.daftStatusTag,
};

const StatusTag = (statusProps) => {
  const tagBackgound = tagBackgoundStore[statusProps.status];
  return <div className={[styles.statusTag, tagBackgound].join(' ')}>{statusProps.status}</div>;
};

const ListLead = connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/loadListLead'],
  loadingSearch: loading.effects['lead/searchLeadByName'],
  loadingCreate: loading.effects['lead/createTouchpoint'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'lead/loadListLead',
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
          <div className={styles.spcing}>
            <Space align="center" direction="vertical">
              {props.lead.leadInfo.map((item) => {
                return <LeadCard item={item} />;
              })}
            </Space>
          </div>
        </div>
        <div className={styles.horScroll}>
          <div className={styles.touchPointCol}>
            {props.lead.leadInfo.map((item, index) => {
              return (
                <Space key={item.id} align="center" direction="horizontal">
                  {item.touchPoint.map((touchpointItem, touchpointIndex) => {
                    // const listType = [];
                    return (
                      <div key={touchpointIndex}>
                        {index === 0 ? (
                          <h3 className={styles.titleOne}>Touchpoint {touchpointIndex + 1}</h3>
                        ) : null}
                        <Card
                          className={[
                            styles.phaseCard,
                            statusPhaseBoderStore[touchpointItem.status],
                          ]}
                        >
                          <div className={styles.spaceTouchpoint}>
                            <p className={styles.titleTwo}>{touchpointItem.duration}</p>
                            <StatusTag status={touchpointItem.status} />

                            <TouchpointCreateForm
                              touchpointId={touchpointItem.id}
                              company={item.company}
                              listTask={touchpointItem.task}
                              dispatch={props.dispatch}
                              rank={item.rank}
                              actualdate={touchpointItem.actualDate}
                              name={item.name}
                              goal={touchpointItem.goal}
                              status={touchpointItem.status}
                              leadId={item.id}
                            />
                            {/* {touchpointItem.task.map((taskItem, taskIndex) => {
                              if (listType.includes(taskItem.type)) return null;
                              listType.push(taskItem.type);
                              return (
                                <div key={taskItem.id}>
                                  <Row>
                                    <Col flex="2">
                                      <Tag
                                        key={taskItem.type}
                                        className={styles.customTaskTag}
                                        style={{ background: taskColorStore[taskItem.type] }}
                                      >
                                        {taskItem.type} <br />
                                      </Tag>
                                    </Col>
                                    {taskIndex === 0 ? (
                                      <div className={styles.counttime}>
                                        <Col flex="1">
                                          {moment(touchpointItem.createdAt).fromNow()}
                                        </Col>
                                      </div>
                                    ) : null}
                                  </Row>
                                </div>
                              );
                            })} */}
                            <div>
                              <Row>
                                <Col flex="2">
                                  <h3 className={styles.meetingDate}>
                                    {touchpointItem.status === 'Done' ? (
                                      <>
                                        Actual date:{' '}
                                        {moment(touchpointItem.actualDate).format('DD-MM')}
                                      </>
                                    ) : (
                                      <>
                                        Meeting date:{' '}
                                        {touchpointItem.meetingDate
                                          ? moment(touchpointItem.meetingDate).format('DD-MM')
                                          : 'Not set'}
                                      </>
                                    )}
                                  </h3>
                                </Col>
                                {touchpointItem.task.length <= 0 ? (
                                  <div className={styles.counttime}>
                                    <Col flex="2">{moment(touchpointItem.createdAt).fromNow()}</Col>
                                  </div>
                                ) : null}
                              </Row>
                            </div>
                            <h3 className={styles.goalText}>
                              <span>Goal</span>: {touchpointItem.goal}
                            </h3>
                            {touchpointItem.status === 'Done' ? (
                              <h3 className={styles.goalText}>
                                <span>Review</span>: {touchpointItem.review}
                              </h3>
                            ) : (
                              <></>
                            )}
                          </div>
                          <TaskList
                            showTask={touchpointItem.status !== 'Done'}
                            touchpointItem={touchpointItem}
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
                      <AddTouchpointButton key={item.id} id={item.id} />
                    </Card>
                  </div>
                  {props.lead.touchpointList.map((_, secondIndex) => {
                    const key = secondIndex;
                    if (
                      secondIndex >=
                      props.lead.touchpointList.length - props.lead.leadInfo[0].touchPoint.length
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

export default connect(({ lead, loading }) => ({
  lead,
  loadingSearch: loading.effects['lead/searchLeadByName'],
}))(App);

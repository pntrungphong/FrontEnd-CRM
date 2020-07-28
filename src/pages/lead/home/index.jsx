import { Input, Space, Card, Pagination, Tag, Col, Row, Spin, Divider, Avatar } from 'antd';
import React, { useState } from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import TouchpointCreateForm from '../components/touchpointModal/touchpointmodal';
// import TouchpointCreatenotForm from '../components/addButton/notdatatouchpoint'
import ViewTaskTable from '../components/touchpointModal/viewtask';
import styles from './style.less';
import AddTouchpointButton from '../components/addButton/addtouchpointbutton';
import CreateLead from '../create/createlead';
import UpdateLead from '../update/updateLeadForm';

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

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};
const taskColorStore = {
  'Proposal Handling': '#B5F5EC',
  'Lead Management': '#D3ADF7',
  'Product Consulting': '#1890FF',
};

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

const LeadTitle = ({ leadName, rank, id }) => {
  return (
    <>
      <div className={styles.leadTitle}>
        <div
          onClick={() => history.push({ pathname: `/lead/detail/${id}` })}
          className={styles.textTwo}
        >
          {leadName}
        </div>
        <div className={styles.rankHeader}>{rankStore[rank]}</div>
        <div id="components-dropdown-demo-dropdown-button">
          <UpdateLead leadId={id} />
        </div>
      </div>
    </>
  );
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

  const [currentPage, setcurrentPage] = useState(1);

  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'lead/loadListLead',
      payload: {
        page,
        searchValue: props.lead.leadSearchValue,
        status: props.lead.status,
      },
    });
    setcurrentPage(page);
  };

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
                return (
                  <div key={item.id}>
                    <Card
                      headStyle={{ padding: 0 }}
                      bodyStyle={{ padding: 5, paddingLeft: 10 }}
                      title={<LeadTitle leadName={item.name} rank={item.rank} id={item.id} />}
                      className={styles.cardOne}
                    >
                      <div className={styles.textOne}>
                        <h3>
                          <strong>Company: </strong>
                          <a
                            onClick={() => {
                              history.push({
                                pathname: `/company/detail/${item.company.id}`,
                              });
                            }}
                          >
                            {item.company.name}
                          </a>
                        </h3>
                        <h3>
                          <strong>Description: </strong> {item.description}
                        </h3>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </Space>

            {props.lead.itemCount / 10 >= 1 ? (
              <Pagination
                total={props.lead.itemCount}
                current={currentPage}
                onChange={onPaginitionChange}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.horScroll}>
          <div className={styles.touchPointCol}>
            {props.lead.leadInfo.map((item, index) => {
              return (
                <Space key={item.id} align="center" direction="horizontal">
                  {item.touchPoint.map((touchpointItem, touchpointIndex) => {
                    const listType = [];
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
                            {touchpointItem.task.map((taskItem, taskIndex) => {
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
                            })}
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
                              {touchpointItem.status === 'Done'
                                ? `Review: ${touchpointItem.review}`
                                : `Goal: ${touchpointItem.goal}`}
                            </h3>
                          </div>
                          {touchpointItem.status !== 'Done' ? (
                            <>
                              <Divider className={styles.customDivider} />
                              <div className={styles.spanTwo}>
                                {touchpointItem.task.slice(0, 3).map((taskItem) => {
                                  return (
                                    <div key={taskItem.id} className={styles.spaceTask}>
                                      <span className={styles.textTouchpoint}>
                                        <FontAwesomeIcon
                                          icon={faDotCircle}
                                          size="xs"
                                          style={{
                                            marginRight: '5px',
                                            color: taskColorStore[taskItem.type],
                                            background: taskColorStore[taskItem.type],
                                            borderRadius: '50%',
                                          }}
                                        />
                                        {taskItem.taskname}
                                        <br />
                                        <span className={styles.taskDueDate}>
                                          {moment(taskItem.dueDate).format('DD-MM-YYYY')}
                                        </span>
                                      </span>
                                      <span className={styles.avatarPIC}>
                                        <Avatar
                                          style={{ verticalAlign: 'middle' }}
                                          src={taskItem.avatar}
                                          size="small"
                                        >
                                          {taskItem.userName}
                                        </Avatar>
                                      </span>
                                    </div>
                                  );
                                })}
                                <div className={styles.viewmore}>
                                  {touchpointItem.task.length > 3 ? (
                                    <ViewTaskTable
                                      touchpointId={touchpointItem.id}
                                      listTask={touchpointItem.task}
                                      dispatch={props.dispatch}
                                      rank={item.rank}
                                      name={item.name}
                                      status={touchpointItem.status}
                                      leadId={item.id}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
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

import { Input, Space, Card, Pagination, Tag, Spin, Divider, Dropdown, Menu } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import TouchpointCreateForm from '../components/touchpointModal/touchpointmodal';
import styles from './style.less';
import AddTouchpointButton from '../components/addButton/addtouchpointbutton';
import CreateLead from '../create/createlead';

const { Search } = Input;

class App extends React.Component {
  onSearch = (value) => {
    this.props.dispatch({
      type: 'lead/searchLeadByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };

  render() {
    return (
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Search
            className={styles.search}
            placeholder="Search lead"
            enterButton="Search"
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

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank">
        <FontAwesomeIcon icon={faCheckCircle} size="1x" /> Win
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank">
        <FontAwesomeIcon icon={faTimesCircle} size="1x" /> Archive
      </a>
    </Menu.Item>
  </Menu>
);
const LeadTitle = ({ leadName, rank, id }) => {
  return (
    <>
      <div className={styles.leadTitle}>
        <div onClick={() => history.push({ pathname: `/lead/detail/${id}` })}>{leadName}</div>
        <div>{rankStore[rank]}</div>
        <div id="components-dropdown-demo-dropdown-button">
          <Dropdown overlay={menu}>
            <div className={styles.iconOne}>
              <FontAwesomeIcon icon={faEllipsisH} size="lg" />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

const ListLead = connect(({ lead, loading }) => ({
  lead,
  loading: loading.effects['lead/loadListLead'],
  loadingCreate: loading.effects['lead/createTouchpoint'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'lead/loadListLead',
    });
  });
  const onPaginitionChange = (page) => {
    props.dispatch({
      type: 'lead/loadListLead',
      payload: {
        page,
        searchValue: props.lead.searchValue,
      },
    });
  };

  return (
    <Spin spinning={props.loading}>
      <div className={styles.spaceAll}>
        <div className={styles.spaceOne}>
          <div className={styles.spanTitle}>
            <span>Name</span>
            <span>Rank</span>
            <span>
              {/* <Create /> */}
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
                    </Card>
                  </div>
                );
              })}
            </Space>

            <Pagination total={props.lead.itemCount} onChange={onPaginitionChange} />
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
                        <Card className={styles.phaseCard}>
                          <div className={styles.spaceTouchpoint}>
                            <p className={styles.titleTwo}>{touchpointItem.duration}</p>
                            {touchpointItem.status === 'In-progress' ? (
                              <Tag color="cyan">{touchpointItem.status}</Tag>
                            ) : (
                              <Tag color="gold">{touchpointItem.status}</Tag>
                            )}
                            <TouchpointCreateForm
                              touchpointId={touchpointItem.id}
                              listTask={touchpointItem.task}
                              dispatch={props.dispatch}
                              rank={item.rank}
                              name={item.name}
                              status={touchpointItem.status}
                              leadId={item.id}
                            />
                            {touchpointItem.task.map((taskItem) => {
                              if (listType.includes(taskItem.type)) return null;
                              listType.push(taskItem.type);
                              return (
                                <Tag
                                  key={taskItem.type}
                                  className={styles.customTaskTag}
                                  style={{ background: taskColorStore[taskItem.type] }}
                                >
                                  {taskItem.type} <br />
                                </Tag>
                              );
                            })}
                            <h3 className={styles.phaseCardOne}>
                              {moment(touchpointItem.createdAt).fromNow()}
                            </h3>
                            <h3 className={styles.phaseCardOne}>
                              {touchpointItem.status === 'Done'
                                ? touchpointItem.review
                                : touchpointItem.goal}
                            </h3>
                          </div>
                          <Divider className={styles.customDivider} />
                          <div className={styles.spanTwo}>
                            {touchpointItem.task.slice(0, 2).map((taskItem) => {
                              return (
                                <div key={taskItem.id} className={styles.spaceTask}>
                                  <span className={styles.textTouchpoint}>
                                    {taskItem.taskname}
                                    <br />
                                    {moment(taskItem.dueDate).format('HH:mm DD-MM-YYYY')}
                                  </span>
                                  <span className={styles.textTouchpoint}>{taskItem.userName}</span>
                                </div>
                              );
                            })}
                            <div className={styles.viewmore}>
                              {touchpointItem.task.length > 2 ? <a href="#">View More</a> : null}
                            </div>
                          </div>
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

export default connect(({ lead }) => ({
  lead,
}))(App);

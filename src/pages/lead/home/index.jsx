import { Input, Button, Space, Card, Pagination, Spin, Dropdown, Menu } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEllipsisH,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { PlusOutlined } from '@ant-design/icons';
import TouchpointCreateForm from '../components/touchpointModal/touchpointmodal';
// import TouchpointCompleteForm from '../components/completeModal/completemodal';
import styles from './style.less';

const { Search } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // props,
    };
  }

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

const Create = connect(({ lead }) => ({
  lead,
}))(function () {
  const createDetail = () => {
    history.push({
      pathname: '/lead/create',
    });
  };
  return (
    <FontAwesomeIcon
      icon={faPlus}
      size="md"
      onClick={createDetail}
      className={styles.customCreateBtn}
    />
  );
});

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
};

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank">
        <FontAwesomeIcon icon={faCheckCircle} size="md" /> Win
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank">
        <FontAwesomeIcon icon={faTimesCircle} size="md" /> Archive
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
            <div>
              <FontAwesomeIcon icon={faEllipsisH} size="md" />
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
}))(function (props) {
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
        searchValue: props.lead.searchContactValue,
      },
    });
  };

  // const showComplete = () => {
  //   const { dispatch } = props;
  //   dispatch({
  //     type: 'lead/showCompleteModal',
  //     payload: { viewable: true },
  //   });
  // };

  // const onComplete = (values) => {
  //   const { dispatch } = props;
  //   console.log(values);
  //   dispatch({
  //     type: 'lead/handleCompleteTouchpoint',
  //     payload: { viewable: false },
  //   });
  // };

  // const onCancelComplete = () => {
  //   const { dispatch } = props;
  //   dispatch({
  //     type: 'lead/handlecancelCompleteTouchpoint',
  //     payload: { viewable: false },
  //   });
  // };
  const fakeAdd = () => {
    const touchpoint = {
      status: 'Done',
      goal: 'lorem ispum lorem ispum lorem ispum lorem ispum',
      duration: '2 Weeks',
      meetingDate: 'Jun 7',
      task: [
        {
          type: 'Product Consulting',
          PIC: 'Quan',
        },
        {
          type: 'Product Consulting',
          PIC: 'Ngan',
        },
        {
          type: 'Proposal Handling',
          PIC: 'Hoang',
        },
      ],
    };
    const list = props.lead.leadInfo;
    list[0].touchPoint.push(touchpoint);
    props.dispatch({
      type: 'lead/saveListLead',
      payload: list,
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
              <Create />
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
                    return (
                      <div>
                        {index === 0 ? (
                          <h3 className={styles.titleOne}>Touchpoint {touchpointIndex + 1}</h3>
                        ) : null}
                        <Card
                          title="Lead 1"
                          className={styles.phaseCard}
                          extra={<p className={styles.titleTwo}>{touchpointItem.duration}</p>}
                        >
                          <h2 className={styles.phaseCardOne}>{touchpointItem.meetingDate}</h2>
                          <TouchpointCreateForm leadId={item.id} />
                          {touchpointItem.task.map((taskItem) => {
                            return (
                              <Button className={styles.btnOne}>
                                {taskItem.type}|{taskItem.PIC}
                              </Button>
                            );
                          })}
                        </Card>
                      </div>
                    );
                  })}
                  <div>
                    {index === 0 ? (
                      <h3 className={styles.titleOne}>Touchpoint {item.touchPoint.length + 1}</h3>
                    ) : null}
                    <Card className={styles.emptyCard}>
                      <Button type="dashed" onClick={fakeAdd} className={styles.btnCreate}>
                        <PlusOutlined /> Add Touchpoint
                      </Button>
                    </Card>
                  </div>
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

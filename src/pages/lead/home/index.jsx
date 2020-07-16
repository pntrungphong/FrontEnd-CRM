import { Input, Button, Space, Card, Pagination,Dropdown, Menu } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisH, faCheckCircle, faTimesCircle,  } from '@fortawesome/free-solid-svg-icons';
import TouchpointCompleteForm from '../components/completeModal/completemodal';
import styles from './style.less';



const { Search } = Input;
// const [modal, contextHolder] = Modal.useModal();
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
  // const ShowCompleteWin =() => {
  //   const { dispatch } = props;
  //   dispatch({
  //     type: 'lead/showCompleteWinModal',
  //     payload: { viewable: true }
  //   })
  // }
  return <FontAwesomeIcon icon={faPlus} size="md" onClick={createDetail} />;
});

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
};

const menu = (
  
  <Menu>
    <Menu.Item>
      <a target="_blank" >
        <FontAwesomeIcon icon={faCheckCircle} size="md" />  Win      
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" >
      <FontAwesomeIcon icon={faTimesCircle} size="md" />  Archive     
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
);
const LeadTitle = ({ leadName, rank, id }) => {
  return (
    <>
      <div className={styles.leadTitle}>
        <span onClick={() => history.push({ pathname: `/lead/detail/${id}` })}>{leadName}</span>
        <span>{rankStore[rank]}</span>
        <div id="components-dropdown-demo-dropdown-button">
        <Dropdown overlay={menu}>
            <div >
              <FontAwesomeIcon icon={faEllipsisH} size="md" />
            </div>
          </Dropdown>
        </div>
        {/* <span onClick={() => history.push({ pathname: `/lead/detail/${id}` })}>
          
        </span> */}
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

 

  const showComplete = () => {
    const { dispatch } = props;
    dispatch({
      type: 'lead/showCompleteModal',
      payload: { viewable: true },
    });
  };

  const onComplete = (values) => {
    const { dispatch } = props;
    console.log(values);
    dispatch({
      type: 'lead/handleCompleteTouchpoint',
      payload: { viewable: false },
    });
    console.log('Hello');
  };

  const onCancelComplete = () => {
    const { dispatch } = props;
    dispatch({
      type: 'lead/handlecancelCompleteTouchpoint',
      payload: { viewable: false },
    });
  };

  return (
    <div className={styles.spaceAll}>
      <div className={styles.spaceOne}>
        <div className={styles.spanTitle}>
          <span>Name</span>
          <span>Rank</span>

          <span>
            <FontAwesomeIcon icon={faPlus} size="md" onClick={showComplete} />
          </span>
          <span>
            <Create />
          </span>
        </div>
        <div className={styles.spcing}>
          <TouchpointCompleteForm
            visible={props.lead.viewable}
            onCreate={onComplete}
            onCancel={onCancelComplete}
          />
          <Space align="center" direction="vertical">
            {props.lead.leadInfo.map((item) => {
              return (
                <div>
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
                            pathname: `/lead/detail/${item.id}`,
                          });
                        }}
                      >
                        {item.company.name}{' '}
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
          <h3 className={styles.titleOne}>Touchpoint 1</h3>
          
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
            <Card
              title="Lead 3"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
            <Card
              title="Lead 4"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.touchPointCol}>
          <h3 className={styles.titleOne}>Touchpoint 2</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.touchPointCol}>
          <h3 className={styles.titleOne}>Touchpoint 3</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.touchPointCol}>
          <h3 className={styles.titleOne}>Touchpoint 4</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.touchPointCol}>
          <h3 className={styles.titleOne}>Touchpoint 5</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.phaseCard}
              extra={<p className={styles.titleTwo}>2 weeks</p>}
            >
              <h2 className={styles.phaseCardOne}>Jun 8</h2>
              <Button className={styles.btnOne}>Lead Management</Button>
            </Card>
          </Space>
        </div>
      </div>
    </div>
  );
});

export default connect(({ lead }) => ({
  lead,
}))(App);

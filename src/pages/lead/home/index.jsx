import { Input, Button, Space, Card, Pagination } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import TouchpointCreateForm from '../components/touchpointModal/touchpointmodal';
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

  // onClick=()=>{
  //   history.push({
  //     pathname: '/touchpoint/',
  //   })
  // }

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

  return <FontAwesomeIcon icon={faPlus} size="md" onClick={createDetail} />;
});

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
};

const LeadTitle = ({ leadName, rank, id }) => {
  return (
    <>
      <div className={styles.leadTitle}>
        <span>{leadName}</span>
        <span>{rankStore[rank]}</span>
        <span onClick={() => history.push({ pathname: `/lead/detail/${id}` })}>
          <FontAwesomeIcon icon={faEllipsisH} size="md" />
        </span>
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

  const show = () => {
    const { dispatch } = props;
    dispatch({
      type: 'lead/showModal',
      payload: { visible: true },
    });
  };

  const onCreate = (values) => {
    const { dispatch } = props;
    console.log(values);
    dispatch({
      type: 'lead/handleOK',
      payload: { visible: false },
    });
    console.log('Hello');
  };

  const onCancel = () => {
    const { dispatch } = props;
    dispatch({
      type: 'lead/handleCancel',
      payload: { visible: false },
    });
  };
  return (
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
          <TouchpointCreateForm
            visible={props.lead.visible}
            onCreate={onCreate}
            onCancel={onCancel}
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
              <Button onClick={show}>Create Touchpoint</Button>
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

import { Input, Button, Space, Card, Pagination } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount } from 'ahooks';
import styles from './style.less';
// import { render } from 'enzyme';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.display}>
          <Create />
          <Search
            className={styles.search}
            placeholder="input search text"
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

  return (
    <div className={styles.spaceAll}>
      <div className={styles.spaceOne}>
        <div className={styles.spanTitle}>
          <h4 className={styles.textOne}>Name</h4>
          <h4 className={styles.textTwo}>Rank</h4>
          <h4 className={styles.textThree}>Rank</h4>
        </div>
        <div className={styles.spcing}>
          <Space align="center" direction="vertical">
            {props.lead.leadInfo.map((item) => {
              return (
                <div>
                  <Card
                    title={item.name}
                    className={styles.cardOne}
                    extra={
                      <a
                        onClick={() => {
                          history.push({
                            pathname: `/lead/detail/${item.id}`,
                          });
                        }}
                      >
                        Detail
                      </a>
                    }
                  >
                    {' '}
                    {/* {contextHolder} */}
                    <p>{item.description}</p>
                  </Card>
                </div>
              );
            })}
          </Space>

          <Pagination total={props.lead.itemCount} onChange={onPaginitionChange} />
        </div>
      </div>
      <div className={styles.horScroll}>
        <div className={styles.spaceTwo}>
          <h3 className={styles.titleOne}>Touchpoint 1</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
            <Card
              title="Lead 3"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
            <Card
              title="Lead 4"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.spaceTwo}>
          <h3 className={styles.titleOne}>Touchpoint 2</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.spaceTwo}>
          <h3 className={styles.titleOne}>Touchpoint 3</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.spaceTwo}>
          <h3 className={styles.titleOne}>Touchpoint 4</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
          </Space>
        </div>
        <div className={styles.spaceTwo}>
          <h3 className={styles.titleOne}>Touchpoint 5</h3>
          <Space align="center" direction="vertical">
            <Card
              title="Lead 1"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
            <Card
              title="Lead 2"
              className={styles.cardTwo}
              extra={<p className={styles.titleTwo}>Time</p>}
            >
              <h2 className={styles.cardTwoOne}>Jun</h2>
              <Button className={styles.btnOne}>Lead Manager</Button>
            </Card>
          </Space>
        </div>
      </div>
    </div>
  );
});

const Create = connect(({ lead }) => ({
  lead,
}))(function () {
  const createDetail = () => {
    history.push({
      pathname: '/lead/create',
    });
  };

  return (
    <Button htmlType="button" onClick={createDetail}>
      Create
    </Button>
  );
});

export default connect(({ lead }) => ({
  lead,
}))(App);

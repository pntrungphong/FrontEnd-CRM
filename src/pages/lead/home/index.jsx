import { Input, Breadcrumb } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './style.less';
import ListLead from './components/leadList';

const { Search } = Input;

class DashBoard extends React.Component {
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

  UNSAFE_componentWillUpdate() {
    document.title = 'Lead - Harmonia';
  }

  render() {
    return (
      <div className={styles.containerBox}>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Lead</Breadcrumb.Item>
          </Breadcrumb>
        </div>
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

export default connect(({ lead, loading }) => ({
  lead,
  loadingSearch: loading.effects['lead/searchLeadByName'],
}))(DashBoard);

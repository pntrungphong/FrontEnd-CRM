import { Input, Button } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import CompanyTable from '../components/companyTable';
import styles from '../style.less';

const { Search } = Input;

class ViewCompany extends React.Component {
  onSearch = (value) => {
    this.props.dispatch({
      type: 'company/searchByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };

  createDetail = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  render() {
    return (
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Button type="primary" onClick={this.createDetail}>
            Create New Company
          </Button>
          <Search
            className={styles.search}
            placeholder="Search company by name"
            enterButton="Search"
            size="large"
            loading={this.props.loadingSearch}
            onSearch={this.onSearch}
          />
        </div>
        <CompanyTable />
      </div>
    );
  }
}

export default connect(({ company, loading }) => ({
  company,
  loadingSearch: loading.effects['lead/searchCompanyByName'],
}))(ViewCompany);

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
        <Search
          className={styles.search}
          placeholder="Search company by name"
          size="large"
          loading={this.props.loadingSearch}
          onSearch={this.onSearch}
        />
        <div className={styles.top}>
          <Button className={styles.create_btn} type="primary" onClick={this.createDetail}>
            Create New Company
          </Button>
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

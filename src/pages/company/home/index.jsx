import { Input, Breadcrumb } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
import CompanyTable from '../components/companyTable';
import CreateCompanyDrawer from '../create/createDrawer';
import styles from '../style.less';

const { Search } = Input;

class ViewCompany extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = debounce(this.onChange, 500);
  }

  onChange = (e) => {
    this.props.dispatch({
      type: 'company/searchByName',
      payload: {
        page: 1,
        searchValue: e.target.value,
      },
    });
  };

  createDetail = () => {
    history.push({
      pathname: '/client/company/create',
    });
  };

  UNSAFE_componentWillUpdate() {
    document.title = 'Company - Harmonia';
  }

  render() {
    return (
      <div className={styles.containerBox}>
        <div className={styles.editBread}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#">Company</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Search
          className={styles.search}
          onChange={(event) => {
            event.persist();
            this.onChange(event);
          }}
          placeholder="Search company by name"
          size="large"
          allowClear
          loading={this.props.loadingSearch}
        />
        <div className={styles.top}>
          <CreateCompanyDrawer />
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

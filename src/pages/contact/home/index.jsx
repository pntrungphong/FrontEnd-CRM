import { Input, Breadcrumb } from 'antd';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import ListContact from '../components/contactTable';
import CreateContactDrawer from '../create/createDrawerContact';
import styles from '../style.less';

const { Search } = Input;

class ListContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = debounce(this.onChange, 500);
  }

  onChange = (e) => {
    this.props.dispatch({
      type: 'contact/searchByName',
      payload: {
        page: 1,
        searchValue: e.target.value,
      },
    });
  };

  UNSAFE_componentWillUpdate() {
    document.title = 'Contact - Harmonia';
  }

  render() {
    return (
      <div className={styles.containerBox}>
        <div className={styles.editBread}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#">Contact</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Search
          className={styles.search}
          onChange={(event) => {
            event.persist();
            this.onChange(event);
          }}
          placeholder="Search contact by name"
          size="large"
          loading={this.props.loadingSearch}
          onSearch={this.onSearch}
          allowClear
        />
        <div className={styles.top}>
          <CreateContactDrawer />
        </div>
        <ListContact />
      </div>
    );
  }
}

export default connect(({ contact, loading }) => ({
  contact,
  loadingSearch: loading.effects['contact/searchByName'],
}))(ListContactPage);

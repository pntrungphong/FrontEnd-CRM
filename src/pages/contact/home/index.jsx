import { Input, Button, Breadcrumb } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import ListContact from '../components/contactTable';
import styles from '../style.less';

const { Search } = Input;

class ListContactPage extends React.Component {
  onSearch = (value) => {
    this.props.dispatch({
      type: 'contact/searchByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };

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
          placeholder="Search contact by name"
          size="large"
          loading={this.props.loadingSearch}
          onSearch={this.onSearch}
        />
        <div className={styles.top}>
          <Button
            type="primary"
            className={styles.createBtn}
            onClick={() => {
              history.push({
                pathname: '/contact/create',
              });
            }}
          >
            Create New Contact
          </Button>
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

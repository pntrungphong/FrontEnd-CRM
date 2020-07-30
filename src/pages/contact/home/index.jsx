import { Input, Button } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
import ListContact from '../components/contactTable';
import styles from './style.less';

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

  render() {
    return (
      <div className={styles.containerBox}>
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
          <Button
            type="primary"
            className={styles.btn}
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

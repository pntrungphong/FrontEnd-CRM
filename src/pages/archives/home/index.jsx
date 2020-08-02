import { Input } from 'antd';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import ListLead from '../components/leadTable';
import styles from '../style.less';

const { Search } = Input;

class ViewLead extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = debounce(this.onChange, 500);
  }

  UNSAFE_componentWillUpdate() {
    document.title = 'Lead - Harmonia';
  }

  onChange = (e) => {
    this.props.dispatch({
      type: 'lead/searchLeadByName',
      payload: {
        page: 1,
        searchValue: e.target.value,
        status: this.props.lead.status,
      },
    });
  };

  render() {
    return (
      <div className={styles.containerBox}>
        <div className={styles.top}>
          <Search
            className={styles.search}
            placeholder="Search lead by name"
            loading={this.props.loadingSearch}
            size="large"
            allowClear
            onChange={(event) => {
              event.persist();
              this.onChange(event);
            }}
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
}))(ViewLead);

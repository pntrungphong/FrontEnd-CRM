import { Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../../home/style.less';

class AddTouchpointButton extends React.Component {
  constructor(props) {
    super(props);
    this.adding = false;
  }

  fakeAdd = () => {
    this.adding = true;
    console.table(this.props.lead.leadSearchValue);
    console.table(this.props.lead.status);
    this.props
      .dispatch({
        type: 'lead/createTouchpoint',
        payload: {
          id: this.props.id,
          searchValue: this.props.lead.leadSearchValue,
          status: this.props.lead.status,
        },
      })
      .then(() => {
        this.adding = false;
      });
  };

  render() {
    return (
      <Button
        key={this.props.id}
        type="dashed"
        loading={this.props.submitting && this.adding}
        onClick={this.fakeAdd}
        className={styles.btnCreate}
      >
        {this.props.submitting && this.adding ? null : <PlusOutlined />}Add Touchpoint
      </Button>
    );
  }
}
export default connect(({ lead, loading }) => ({
  lead,
  submitting: loading.effects['lead/createTouchpoint'],
}))(AddTouchpointButton);

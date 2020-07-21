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
    this.props
      .dispatch({
        type: 'lead/createTouchpoint',
        payload: this.props.id,
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
        <PlusOutlined /> Add Touchpoint
      </Button>
    );
  }
}
export default connect(({ lead, loading }) => ({
  lead,
  submitting: loading.effects['lead/createTouchpoint'],
}))(AddTouchpointButton);

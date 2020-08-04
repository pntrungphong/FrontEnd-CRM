import React from 'react';
import { connect } from 'umi';
import { Drawer, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CreateForm from './formcreate';

class CreateLead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showModal(showModal) {
    this.setState({ showModal });
  }

  render() {
    return (
      <>
        <FontAwesomeIcon
          icon={faPlus}
          size="1x"
          onClick={() => this.showModal(true)}
          className={styles.customCreateBtn}
        />
        <Drawer
          destroyOnClose
          className={styles.modalCreate}
          style={{ top: 0 }}
          title="Add new Lead"
          closable
          width={800}
          visible={this.state.showModal}
          onClose={() => this.showModal(false)}
          footer={[
            <Button form="createLeadForm" key="submit" htmlType="submit">
              Submit
            </Button>,
          ]}
        >
          <CreateForm id="createLeadForm" closeModal={() => this.showModal(false)} />
        </Drawer>
      </>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(CreateLead);

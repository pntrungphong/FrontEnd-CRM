import React from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
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
        <Modal
          className={styles.modalCreate}
          style={{ top: 0 }}
          title="Add new Lead"
          width={800}
          visible={this.state.showModal}
          onOk={() => this.showModal(false)}
          onCancel={() => this.showModal(false)}
          footer={[
            <Button form="createLeadForm" key="submit" htmlType="submit">
              Submit
            </Button>,
          ]}
          destroyOnClose
        >
          <CreateForm id="createLeadForm" closeModal={() => this.showModal(false)} />
        </Modal>
      </>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(CreateLead);

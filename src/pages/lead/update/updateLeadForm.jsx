import React from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import UpdateLeadInformationForm from '../components/touchpointModal/updateleadform';

class UpdateLead extends React.Component {
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
        <FontAwesomeIcon icon={faEllipsisH} onClick={() => this.showModal(true)} size="xl" />
        <Modal
          className={styles.modalCreate}
          style={{ top: 0 }}
          title="Update lead"
          width={800}
          visible={this.state.showModal}
          onOk={() => this.showModal(false)}
          onCancel={() => this.showModal(false)}
          footer={[
            <Button form="updateLeadForm" key="submit" htmlType="submit">
              Submit
            </Button>,
          ]}
          destroyOnClose
        >
          <UpdateLeadInformationForm
            leadId={this.props.leadId}
            id="updateLeadForm"
            closeModal={() => this.showModal(false)}
          />
        </Modal>
      </>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(UpdateLead);

import React from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import UpdateLeadInformationForm from './updateLeadForm';

class UpdateLead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      disableButton: true,
    };
  }

  showModal(showModal) {
    this.setState({
      disableButton: true,
    });
    this.setState({ showModal });
  }

  enableButton() {
    if (this.state.disableButton)
      this.setState({
        disableButton: false,
      });
  }

  render() {
    return (
      <>
        <FontAwesomeIcon icon={faEllipsisH} onClick={() => this.showModal(true)} size="sm" />
        <Modal
          bodyStyle={{
            height: '71.5vh',
            overflowY: 'scroll',
            paddingTop: 0,
            scrollBehavior: 'smooth',
          }}
          className={styles.modalCreate}
          style={{ top: 0 }}
          title="Update lead"
          width={800}
          visible={this.state.showModal}
          onOk={() => this.showModal(false)}
          onCancel={() => this.showModal(false)}
          footer={[
            <Button
              disabled={this.state.disableButton}
              form="updateLeadForm"
              key="submit"
              htmlType="submit"
            >
              Submit
            </Button>,
          ]}
          destroyOnClose
        >
          <UpdateLeadInformationForm
            leadId={this.props.leadId}
            id="updateLeadForm"
            closeModal={() => this.showModal(false)}
            enableButton={() => this.enableButton()}
          />
        </Modal>
      </>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(UpdateLead);

import React from 'react';
import { connect } from 'umi';
import { Drawer, Button } from 'antd';
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
        <a onClick={() => this.showModal(true)}>Edit</a>
        <Drawer
          destroyOnClose
          bodyStyle={{
            height: '71.5vh',
            overflowY: 'scroll',
            padding: '24px 24px 0 24px',
            scrollBehavior: 'smooth',
          }}
          className={styles.modalCreate}
          style={{ top: 0 }}
          title="Update lead"
          width={800}
          visible={this.state.showModal}
          onClose={() => this.showModal(false)}
          footer={[
            <div className={styles.drawerSubmitButton}>
              <Button
                disabled={this.state.disableButton}
                form="updateLeadForm"
                key="submit"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>,
          ]}
        >
          <UpdateLeadInformationForm
            leadId={this.props.leadId}
            id="updateLeadForm"
            onCancel={this.props.onCancel}
            closeModal={() => this.showModal(false)}
            enableButton={() => this.enableButton()}
          />
        </Drawer>
      </>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(UpdateLead);

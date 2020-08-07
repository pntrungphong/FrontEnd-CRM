import React from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { connect } from 'umi';
import styles from './style.less';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
};

class MarkDealLeadModal extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    if (this.props.currentStatus === 'Undone') {
      Modal.confirm({
        icon: null,
        title: 'Update lead status',
        content: (
          <>
            Are you sure with this lead&lsquo;s status ?
            <br />
            - Current TouchPoint will be updated as Done.
            <br />- You can not change information in the current TouchPoint when it&lsquo;s Done.
          </>
        ),
        cancelText: 'Cancel',
        onCancel: () => {},
        onOk: () => {
          this.setState({
            visible: true,
          });
        },
      });
    } else {
      this.setState({
        visible: true,
      });
    }
  };

  onDone = () => {
    this.props
      .dispatch({
        type: 'touchpoint/markDone',
        payload: this.props.currentTouchPoint.id,
      })
      .then((response) => {
        if (response) {
          this.props.dispatch({
            type: 'lead/get',
            payload: { id: this.props.leadId },
          });
          this.props.dispatch({ type: 'lead/getListWithLane', payload: {} });
          this.setState({
            visible: true,
          });
        }
      });
  };

  onMarkDone = (values) => {
    const payload = {
      ...values,
      status: this.props.deal,
      id: this.props.leadId,
    };
    this.props
      .dispatch({
        type: 'lead/markDeal',
        payload,
      })
      .then((value) => {
        if (value) {
          if (this.props.currentStatus === 'Undone') {
            this.onDone();
          } else this.props.dispatch({ type: 'lead/getListWithLane', payload: {} });
        }
      });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Update lead status"
          visible={this.state.visible}
          destroyOnClose
          footer={[
            <Button key="cancel" htmlType="reset" onClick={this.onCancel}>
              Cancel
            </Button>,
            <Button form="markDoneForm" key="submit" htmlType="submit" type="primary">
              Save
            </Button>,
          ]}
          onCancel={this.onCancel}
        >
          <Form id="markDoneForm" {...layout} onFinish={this.onMarkDone}>
            <Form.Item
              label="Reason"
              name="review"
              rules={[
                {
                  required: true,
                  message: 'Please input mark deal reason!',
                },
              ]}
            >
              <TextArea
                placeholder="Reason for mark lead as deal/no deal"
                value={this.state.reason}
              />
            </Form.Item>
          </Form>
        </Modal>
        {this.props.deal === 'Deal' ? (
          <Button onClick={this.showModal} className={styles.dealButton} size="small">
            Deal
          </Button>
        ) : (
          <Button onClick={this.showModal} className={styles.dealButton} size="small">
            No deal
          </Button>
        )}
      </div>
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  submitting: loading.effects['login/login'],
}))(MarkDealLeadModal);

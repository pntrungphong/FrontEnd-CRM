import React from 'react';
import { Modal, Form, Button, Tag, Input } from 'antd';
import Rankmodal from './rankmodal';

const { TextArea } = Input;

class MarkDoneModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status: this.props.status,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onMarkDone = (values) => {
    const returnData = {
      touchPointId: this.props.touchpointId,
      review: values.review,
      rank: {
        rank: values.rank.rank,
        reason: values.rank.reason,
        id: this.props.leadId,
      },
    };

    this.setState({
      status: 'Done',
    });
    this.props.dispatch({
      type: 'touchpoint/markDone',
      payload: returnData,
    });

    this.props.dispatch({
      type: 'lead/changerank',
      payload: returnData.rank,
    });

    this.props.dispatch({
      type: 'lead/loadListLead',
    });

    this.setState({
      visible: false,
    });
  };

  onOk = (value) => {
    this.onMarkDone(value);
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
          title="Comple touch point"
          visible={this.state.visible}
          destroyOnClose
          footer={false}
          onCancel={this.onCancel}
        >
          <Form onFinish={this.onOk}>
            <Form.Item label="Final Rank" name="rank">
              <Rankmodal />
            </Form.Item>
            <Form.Item
              label="Review"
              name="review"
              rules={[
                {
                  required: true,
                  message: 'Please input Reason',
                },
              ]}
            >
              <TextArea value={this.state.reason} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {this.state.status === 'In-progress' ? (
          <Button size="small" onClick={this.showModal}>
            Complete Touchpoint
          </Button>
        ) : (
          <Tag color="gold">Done</Tag>
        )}
      </div>
    );
  }
}

export default MarkDoneModal;

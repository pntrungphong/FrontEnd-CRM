import React from 'react';
import { Modal, Form, Button, Tag, Input, Radio } from 'antd';
import Rankmodal from './rankmodal';
import styles from './style.less';

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
    const markDoneData = {
      touchPointId: this.props.touchpointId,
      review: values.review,
    };

    let rankData;
    if (values.rank) {
      rankData = {
        rank: values.rank.rank,
        reason: values.rank.reason,
        id: this.props.leadId,
      };
    }

    let statusData;
    if (values.status && values.status !== 'In-progess') {
      statusData = {
        status: values.status,
        id: this.props.leadId,
      };
    }
    const payload = {
      markDoneData,
      statusData: statusData || undefined,
      rankData: rankData || undefined,
    };

    this.props
      .dispatch({
        type: 'touchpoint/markDone',
        payload,
      })
      .then((value) => {
        if (value) {
          this.setState({
            status: 'Done',
          });
          this.props.dispatch({
            type: 'lead/loadListLead',
          });
        }
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
          <Form
            onFinish={this.onOk}
            initialValues={{
              status: 'In-progess',
              rank: this.props.rank,
            }}
          >
            <Form.Item label="Final Rank" name="rank">
              <Rankmodal />
            </Form.Item>
            <Form.Item name="status" label="Lead Status">
              <Radio.Group className={styles.customRadioRank}>
                <Radio value="In-progess">In-progess</Radio>
                <Radio value="Win">Win</Radio>
                <Radio value="Lose">Lose</Radio>
              </Radio.Group>
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
              <TextArea className={styles.customField} value={this.state.reason} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {this.state.status === 'In-progress' ? (
          <Button color="cyan" size="small" onClick={this.showModal}>
            {this.state.status}
          </Button>
        ) : (
          <Tag color="gold">{this.state.status}</Tag>
        )}
      </div>
    );
  }
}

export default MarkDoneModal;

import React from 'react';
import { Modal, Form, Button, Tag, notification, DatePicker, Input, Radio } from 'antd';
import moment from 'moment';
import styles from './style.less';

const { TextArea } = Input;

class MarkDoneModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      rankReason: true,
      reviewReason: true,
      status: this.props.status,
    };
  }

  showModal = () => {
    if (this.props.goal === '') {
      notification.error({
        message: 'Goal must be updated first!',
      });
      return;
    }
    this.setState({
      visible: true,
    });
  };

  onMarkDone = (values) => {
    const markDoneData = {
      touchPointId: this.props.touchpointId,
      review: values.review,
      actualDate: values.actualdate.format('YYYY-MM-DD HH:mm'),
    };

    let rankData;
    if (values.rank && values.rank !== this.props.rank) {
      rankData = {
        rank: values.rank,
        reason: values.rank_reason,
        id: this.props.leadId,
      };
    }

    let statusData;
    if (values.status && values.status !== 'In-progess') {
      statusData = {
        review: values.lead_reason,
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
            payload: {
              page: 1,
              searchValue: this.props.lead.leadSearchValue,
              status: this.props.lead.status,
            },
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

  onRankChange = (value) => {
    if (value.target.value !== this.props.rank) {
      this.setState({
        rankReason: false,
      });
    } else {
      this.setState({
        rankReason: true,
      });
    }
  };

  onLeadChange = (value) => {
    if (value.target.value !== 'In-progess') {
      this.setState({
        reviewReason: false,
      });
    } else {
      this.setState({
        reviewReason: true,
      });
    }
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
          title="Complete Touchpoint"
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
              actualdate: moment(this.props.actualdate),
            }}
          >
            <Form.Item label="Rank" name="rank">
              <Radio.Group onChange={this.onRankChange}>
                <Radio value={0}>A</Radio>
                <Radio value={1}>B</Radio>
                <Radio value={2}>C</Radio>
                <Radio value={3}>D</Radio>
              </Radio.Group>
            </Form.Item>
            {!this.state.rankReason ? (
              <Form.Item
                label=" Ranking update reason"
                name="rank_reason"
                rules={[
                  {
                    required: true,
                    message: 'Please input reason for updating rank',
                  },
                ]}
              >
                <TextArea
                  placeholder="Describe reason for updating rank"
                  value={this.state.reason}
                />
              </Form.Item>
            ) : null}
            <Form.Item
              name="actualdate"
              label="Actual date"
              rules={[
                {
                  required: true,
                  message: 'Please input actual date',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD HH:mm" showTime />
            </Form.Item>
            <Form.Item
              label="Review"
              name="review"
              rules={[
                {
                  required: true,
                  message: 'Please input mark done review',
                },
              ]}
            >
              <TextArea
                placeholder="Review touchpoint here"
                className={styles.customField}
                value={this.state.reason}
              />
            </Form.Item>
            <Form.Item name="status" label="Lead Status">
              <Radio.Group onChange={this.onLeadChange} className={styles.customRadioRank}>
                <Radio value="In-progess">Continue</Radio>
                <Radio value="Win">Win</Radio>
                <Radio value="Lost">Lost</Radio>
              </Radio.Group>
            </Form.Item>
            {!this.state.reviewReason ? (
              <Form.Item
                label="Reason"
                name="lead_reason"
                rules={[
                  {
                    required: true,
                    message: 'Please input reason for mark lead as win/lost',
                  },
                ]}
              >
                <TextArea
                  placeholder="Reason for mark lead as win/lose"
                  value={this.state.reason}
                />
              </Form.Item>
            ) : null}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {this.state.status === 'In-progress' ? (
          <Button color="cyan" size="small" onClick={this.showModal}>
            Complete Touchpoint
          </Button>
        ) : (
          <Tag color="gold">{this.state.status}</Tag>
        )}
      </div>
    );
  }
}

export default MarkDoneModal;

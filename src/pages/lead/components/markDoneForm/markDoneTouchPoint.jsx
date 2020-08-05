import React from 'react';
import { Modal, Form, Button, Col, Row, Tag, notification, DatePicker, Input, Radio } from 'antd';
import moment from 'moment';
import styles from './style.less';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
};

class MarkDoneModal extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
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
    if (values.status && values.status !== 'In-progress') {
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
            type: 'lead/getList',
            payload: {
              page: 1,
              searchValue: this.props.lead.searchValue,
              status: this.props.lead.status,
            },
          });
        }
      });
    this.props.reloadData();
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

  onLaneChange = (value) => {
    this.form.current.setFieldsValue({ lane: value });
    this.form.current.submit();
  };

  onLeadChange = (value) => {
    if (value.target.value !== 'In-progress') {
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
          width={600}
          destroyOnClose
          footer={false}
          onCancel={this.onCancel}
        >
          <Form
            ref={this.form}
            {...layout}
            onFinish={this.onOk}
            initialValues={{
              status: 'In-progress',
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
                label="Rank Explanation"
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
              <TextArea placeholder="Review touchpoint here" value={this.state.reason} />
            </Form.Item>
            <Form.Item name="status" label="Lead Status">
              <Radio.Group onChange={this.onLeadChange}>
                <Radio value="In-progress">On-Going</Radio>
                <Radio value="Win">Qualified</Radio>
                <Radio value="Lost">Unqualified</Radio>
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
            {this.state.reviewReason ? (
              <Row justify="space-around">
                <Col span={6}>
                  <Form.Item>
                    <Button type="primary" onClick={() => this.onLaneChange('PH')}>
                      #PH
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Button type="primary" onClick={() => this.onLaneChange('PC')}>
                      #PC
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Button type="primary" onClick={() => this.onLaneChange('LM')}>
                      #LM
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <Form.Item className={styles.submitButton}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            )}
          </Form>
        </Modal>
        {this.state.status === 'In-progress' ? (
          <Button color="cyan" style={{ float: 'left' }} onClick={this.showModal}>
            Complete TouchPoint
          </Button>
        ) : (
          <Tag color="green" className={styles.completedTPTag}>
            Completed
          </Tag>
        )}
      </div>
    );
  }
}

export default MarkDoneModal;

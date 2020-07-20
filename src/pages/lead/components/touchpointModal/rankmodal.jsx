import React from 'react';
import { Modal, Form, Input, Radio, Button } from 'antd';

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};

const { TextArea } = Input;

class Rankmodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: this.props.rank,
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onOk = (value) => {
    console.table(value);
    this.setState({
      visible: false,
    });

    this.setState({
      rank: value.rank,
    });

    this.props.onChange({
      rank: value.rank,
      reason: value.reason,
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
        <Input readOnly value={rankStore[this.state.rank]} />
        <Modal
          title="Do you want to update rank?"
          visible={this.state.visible}
          footer={false}
          onCancel={this.onCancel}
        >
          <Form onFinish={this.onOk}>
            <Form.Item name="rank">
              <Radio.Group value={this.props.rank}>
                <Radio value={0}>A</Radio>
                <Radio value={1}>B</Radio>
                <Radio value={2}>C</Radio>
                <Radio value={3}>D</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Reason"
              name="reason"
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
        <Button onClick={this.showModal}>Change</Button>
      </div>
    );
  }
}

export default Rankmodal;

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
      rank: this.props.value,
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onOk = (value) => {
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
        <Input
          disabled={this.props.status === 'Done'}
          readOnly
          value={rankStore[this.state.rank]}
        />
        <Modal
          title="Do you want to update rank?"
          visible={this.state.visible}
          footer={false}
          onCancel={this.onCancel}
        >
          <Form
            onFinish={this.onOk}
            initialValues={{
              rank: this.props.value,
            }}
          >
            <Form.Item label="Rank" name="rank">
              <Radio.Group>
                <Radio value={0}>A</Radio>
                <Radio value={1}>B</Radio>
                <Radio value={2}>C</Radio>
                <Radio value={3}>D</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Updating Reason"
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
        <Button hidden={this.props.status === 'Done'} onClick={this.showModal}>
          Update
        </Button>
      </div>
    );
  }
}

export default Rankmodal;

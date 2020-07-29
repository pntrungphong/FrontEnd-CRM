import React from 'react';
import { Modal, Form, Input, Radio, Button } from 'antd';
import styles from './style.less';

export const RankStore = {
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
          readOnly
          value={RankStore[this.state.rank]}
          disabled
          // disabled={this.props.status === 'Done'}
          className={styles.rankInput}
          addonAfter={
            <Button
              type="primary"
              className={styles.changRankBtn}
              size="small"
              hidden={this.props.status === 'Done' || this.props.status === 'Draft'}
              onClick={this.showModal}
            >
              Change rank
            </Button>
          }
        />
        <Modal
          title="Do you want to update rank?"
          visible={this.state.visible}
          footer={false}
          onCancel={this.onCancel}
        >
          <Form
            labelCol={{ span: 5 }}
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
              label="Explanation"
              name="reason"
              rules={[
                {
                  required: true,
                  message: 'Please input rank explanation',
                },
              ]}
            >
              <TextArea value={this.state.reason} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Rankmodal;

import { Form, Button, Breadcrumb, Modal } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import styles from '../style.less';
import SharedForm from '../components/sharedForm';

const layout = {
  labelCol: { span: 8 },
};
const validateMessages = (label) => ({
  required: `${label} is required!`,
});

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'tag/getTag',
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'contact/cleanData',
    });
  }

  onFinish = (values) => {
    if (
      !values.referral ||
      !values.company ||
      values.referral.length <= 0 ||
      values.company.length <= 0
    ) {
      Modal.confirm({
        icon: null,
        title: 'Company or Referrals are missing!',
        content: 'Do you want to continue ?',
        cancelText: 'Cancel',
        onCancel: () => {},
        onOk: () => {
          this.props.dispatch({
            type: 'contact/create',
            payload: { ...values },
          });
        },
      });
    } else {
      this.props.dispatch({
        type: 'contact/create',
        payload: { ...values },
      });
    }
  };

  UNSAFE_componentWillUpdate() {
    document.title = 'Create Contact - Harmonia';
  }

  render() {
    const { tag } = this.props.tag;

    return (
      <div className={styles.main}>
        <div className={styles.editBreadOne}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a
                href="#"
                onClick={() => {
                  history.push({
                    pathname: `/client/contact`,
                  });
                }}
              >
                Contact
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}> Create New Contact</h2>
        </div>
        <Form
          {...layout}
          ref={this.formRef}
          initialValues={{
            phone: [
              {
                number: undefined,
                type: undefined,
              },
            ],
            email: [
              {
                url: undefined,
                type: undefined,
              },
            ],
          }}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <SharedForm tag={tag} formRef={this.formRef} />
          <div className={styles.aroundBtn}>
            <Form.Item wrapperCol={{ offset: 8 }} className={styles.editBtn}>
              <Button
                size="middle"
                type="primary"
                htmlType="submit"
                loading={this.props.submitting}
              >
                Create
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  history.push({
                    pathname: `/client/contact`,
                  });
                }}
                size="middle"
                type="primary"
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(({ contact, tag, loading }) => ({
  contact,
  tag,
  submitting: loading.effects['contact/create'],
}))(Create);

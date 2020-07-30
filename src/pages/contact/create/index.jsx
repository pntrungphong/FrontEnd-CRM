import { Form, Button, Breadcrumb } from 'antd';
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
    this.props.dispatch({
      type: 'contact/create',
      payload: { ...values },
    });
  };

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
                    pathname: `/contact`,
                  });
                }}
              >
                Contact
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Form
          {...layout}
          ref={this.formRef}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <SharedForm tag={tag} formRef={this.formRef} />
          <div className={styles.aroundBtn}>
            <Form.Item wrapperCol={{ offset: 8 }} className={styles.editBtn}>
              <Button type="primary" htmlType="submit" loading={this.props.submitting}>
                Create
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }} className={styles.editBtn}>
              <Button type="primary" htmlType="submit">
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

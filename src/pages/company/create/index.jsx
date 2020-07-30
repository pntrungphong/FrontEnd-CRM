import { Form, Button, Breadcrumb } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import styles from '../style.less';
import SharedForm from '../components/sharedForm';

const layout = {
  labelCol: { span: 8 },
};

class CreateCompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'tag/getTag',
    });
  }

  componentWillUpdate() {
    document.title = 'Create Company - Harmonia';
  }

  onFinish = (values) => {
    this.props.dispatch({
      type: 'company/create',
      payload: { ...values },
    });
  };

  render() {
    const { tag } = this.props.tag;

    return (
      <div className={styles.main}>
        <div className={styles.editBread}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a
                href="#"
                onClick={() => {
                  history.push({
                    pathname: `/company`,
                  });
                }}
              >
                Company
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
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
                    pathname: `/company`,
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

export default connect(({ company, tag, loading }) => ({
  company,
  tag,
  submitting: loading.effects['company/create'],
}))(CreateCompanyForm);

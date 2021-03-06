import { Form, Button, Breadcrumb } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import styles from '../style.less';
import SharedForm from '../components/sharedForm';

const layout = {
  labelCol: { span: 3 },
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

  onFinish = (values) => {
    this.props.dispatch({
      type: 'company/create',
      payload: { ...values },
    });
  };

  UNSAFE_componentWillUpdate() {
    document.title = 'Create Company - Harmonia';
  }

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
                    pathname: `/client/company`,
                  });
                }}
              >
                Company
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}> Create New Company</h2>
        </div>
        <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
          <SharedForm tag={tag} formRef={this.formRef} />
          <div className={styles.aroundBtn}>
            <Form.Item>
              <Button
                className={styles.editButtonOne}
                type="primary"
                htmlType="submit"
                loading={this.props.submitting}
              >
                Create
              </Button>
            </Form.Item>
            <Form.Item>
              <Button className={styles.editButton} onClick={() => history.push(`/client/company`)}>
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

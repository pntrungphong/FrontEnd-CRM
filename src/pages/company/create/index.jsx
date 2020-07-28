import { Form, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
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
        <div className={styles.header}>
          <h2 className={styles.title}> Create New Company</h2>
        </div>

        <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
          <SharedForm tag={tag} formRef={this.formRef} />
          <Form.Item wrapperCol={{ offset: 8 }} className={styles.editBtn}>
            <Button type="primary" htmlType="submit" loading={this.props.submitting}>
              Create
            </Button>
          </Form.Item>
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

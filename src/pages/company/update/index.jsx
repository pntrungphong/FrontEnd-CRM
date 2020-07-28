import { Spin, Form, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import SharedForm from '../components/sharedForm';
import styles from '../style.less';

const layout = {
  labelCol: { span: 8 },
};

class UpdateCompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'company/get',
      payload: { id: this.props.match.params.id },
    });

    this.props.dispatch({
      type: 'tag/getTag',
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'company/cleanDetail',
    });
  }

  onFinish = (values) => {
    this.props.dispatch({
      type: 'company/update',
      payload: { ...values, id: this.props.match.params.id },
    });
  };

  render() {
    const { tag } = this.props.tag;
    const company = this.props.company.detail;
    const { querying } = this.props;

    if (querying || !company) {
      return <Spin />;
    }

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> UPDATE COMPANY</h2>
        </div>

        <Form
          {...layout}
          ref={this.formRef}
          name="nest-messages"
          onFinish={this.onFinish}
          initialValues={{
            name: company.name,
            tag: company.tag,
            phone: company.phone,
            website: company.website,
            url: company.url,
            email: company.email,
            title: company.title,
            contact: company.contact,
            address: company.address,
          }}
        >
          <SharedForm tag={tag} formRef={this.formRef} />
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={this.props.submitting}>
              Update
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
  submitting: loading.effects['company/update'],
  querying: loading.effects['company/get'],
}))(UpdateCompanyForm);

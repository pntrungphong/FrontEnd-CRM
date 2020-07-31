import { Spin, Form, Button, Breadcrumb } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import SharedForm from '../components/sharedForm';
import styles from '../style.less';

const layout = {
  labelCol: { span: 8 },
};

class UpdateCompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      disableButton: true,
    };
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

  componentWillUpdate() {
    document.title = 'Update Company - Harmonia';
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

  onValuesChange = () => {
    if (this.state.disableButton) {
      this.setState({
        disableButton: false,
      });
    }
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
            <Breadcrumb.Item>Update</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}> Update Company</h2>
        </div>
        <Form
          {...layout}
          ref={this.formRef}
          name="nest-messages"
          onValuesChange={this.onValuesChange}
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
          <div className={styles.aroundBtn}>
            <Form.Item wrapperCol={{ offset: 8 }} className={styles.editBtn}>
              <Button
                disabled={this.state.disableButton}
                size="middle"
                type="primary"
                htmlType="submit"
                loading={this.props.submitting}
              >
                Update
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
  submitting: loading.effects['company/update'],
  querying: loading.effects['company/get'],
}))(UpdateCompanyForm);

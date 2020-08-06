import { Drawer, Form, Button, Spin } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { FormOutlined } from '@ant-design/icons';
import SharedForm from '../components/sharedFormv2';

const layout = {
  labelCol: { span: 3 },
};
class UpdateCompanyDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      visible: false,
      disableButton: true,
    };
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'company/cleanDetail',
    });
  }

  onFinish = (values) => {
    this.props
      .dispatch({
        type: 'company/update',
        payload: { ...values, id: this.props.companyId },
      })
      .then((result) =>
        result
          ? this.props
              .dispatch({
                type: 'company/getList',
              })
              .then(() => this.setState({ visible: false }))
          : null,
      );
  };

  onValuesChange = () => {
    if (this.state.disableButton) {
      this.setState({
        disableButton: false,
      });
    }
  };

  showDrawer = () => {
    this.props.dispatch({
      type: 'company/get',
      payload: { id: this.props.companyId },
    });
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  UNSAFE_componentWillUpdate() {
    document.title = 'Update Company - Harmonia';
  }

  render() {
    const { tag } = this.props.tag;
    const company = this.props.company.detail;
    const { querying } = this.props;

    if (!this.state.visible) return <FormOutlined onClick={this.showDrawer} />;

    if ((querying || !company) && this.state.visible) {
      return <Spin />;
    }
    return (
      <>
        <Drawer
          title="Update company"
          width={720}
          destroyOnClose
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button form="form-update-company" onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                form="form-update-company"
                htmlType="submit"
                type="primary"
                disabled={this.state.disableButton}
                loading={this.props.submitting}
              >
                Submit
              </Button>
            </div>
          }
        >
          <Form
            {...layout}
            id="form-update-company"
            ref={this.formRef}
            name="update-company"
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
            <SharedForm
              tag={tag}
              formRef={this.formRef}
              companyDetail={{
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
            />
          </Form>
        </Drawer>
      </>
    );
  }
}

export default connect(({ company, tag, loading }) => ({
  company,
  tag,
  querying: loading.effects['company/get'],
}))(UpdateCompanyDrawer);

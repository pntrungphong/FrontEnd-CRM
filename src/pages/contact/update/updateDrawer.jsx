import { Drawer, Form, Button, Spin } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { FormOutlined } from '@ant-design/icons';
import SharedForm from '../components/sharedFormv2';

const layout = {
  labelCol: { span: 3 },
};
class UpdateContactDrawer extends React.Component {
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
      type: 'contact/cleanDetail',
    });
  }

  onFinish = (values) => {
    this.props
      .dispatch({
        type: 'contact/update',
        payload: { ...values, id: this.props.contactId },
      })
      .then((result) =>
        result
          ? this.props
              .dispatch({
                type: 'contact/getList',
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
      type: 'contact/get',
      payload: { id: this.props.contactId },
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
    document.title = 'Update Contact - Harmonia';
  }

  render() {
    const { tag } = this.props.tag;
    const contact = this.props.contact.detail;
    const { querying } = this.props;

    if (!this.state.visible) return <FormOutlined onClick={this.showDrawer} />;

    if ((querying || !contact) && this.state.visible) {
      return <Spin />;
    }
    return (
      <>
        <Drawer
          title="Update contact"
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
              <Button form="form-update-contact" onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                form="form-update-contact"
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
            id="form-update-contact"
            ref={this.formRef}
            name="update-contact"
            onValuesChange={this.onValuesChange}
            onFinish={this.onFinish}
            initialValues={{
              name: contact.name,
              tag: contact.tag,
              company: contact.company,
              referral: contact.referral,
              phone: contact.phone,
              website: contact.website,
              email: contact.email,
              title: contact.title,
              contact: contact.contact,
              address: contact.address,
            }}
          >
            <SharedForm tag={tag} formRef={this.formRef} />
          </Form>
        </Drawer>
      </>
    );
  }
}

export default connect(({ contact, tag, loading }) => ({
  contact,
  tag,
  querying: loading.effects['contact/get'],
  submitting: loading.effects['contact/update'],
}))(UpdateContactDrawer);

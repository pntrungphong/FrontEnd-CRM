import { Drawer, Form, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import SharedForm from '../components/sharedFormv2';
import styles from '../style.less';

const layout = {
  labelCol: { span: 3 },
};
class CreateCompanyDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'tag/getTag',
    });
  }

  onFinish = (values) => {
    this.props
      .dispatch({
        type: 'company/create',
        payload: { ...values },
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

  UNSAFE_componentWillUpdate() {
    document.title = 'Create Company - Harmonia';
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { tag } = this.props.tag;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer} className={styles.createBtn}>
          Create New Company
        </Button>
        <Drawer
          title="Create a new company"
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
              <Button form="form-create-company" onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                form="form-create-company"
                htmlType="submit"
                type="primary"
                loading={this.props.submitting}
              >
                Submit
              </Button>
            </div>
          }
        >
          <Form
            {...layout}
            id="form-create-company"
            ref={this.formRef}
            name="create-company"
            onFinish={this.onFinish}
          >
            <SharedForm tag={tag} formRef={this.formRef} />
          </Form>
        </Drawer>
      </>
    );
  }
}

export default connect(({ company, tag, loading }) => ({
  company,
  tag,
  submitting: loading.effects['company/create'],
}))(CreateCompanyDrawer);
import { Drawer, Form, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import SharedForm from '../components/sharedFormv2';
import styles from '../style.less';

const layout = {
  labelCol: { span: 3 },
};
class CreateContactDrawer extends React.Component {
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

  componentWillUnmount() {
    this.props.dispatch({
      type: 'contact/cleanData',
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onFinish = (values) => {
    this.props
      .dispatch({
        type: 'contact/create',
        payload: { ...values },
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

  render() {
    const { tag } = this.props.tag;
    return (
      <>
        <div className={styles.editBtn}>
          <Button type="primary" onClick={this.showDrawer} className={styles.createBtn}>
            Create New contact
          </Button>
        </div>

        <Drawer
          title="Create Contact"
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
              <Button form="form-create-contact" onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                form="form-create-contact"
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
            id="form-create-contact"
            ref={this.formRef}
            name="nest-messages"
            onFinish={this.onFinish}
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
  submitting: loading.effects['contact/create'],
}))(CreateContactDrawer);

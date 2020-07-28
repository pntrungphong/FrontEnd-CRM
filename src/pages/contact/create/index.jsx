import { Form, Input, Button, Row, Col, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import QuickCreate, { CreateType } from '../../common/quickCreate';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrappercol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrappercol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const layout = {
  labelCol: { span: 8 },
  wrappercol: { span: 16 },
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
      type: 'contact/fullCreate',
      payload: { ...values },
    });
  };

  render() {
    const { tag } = this.props.tag;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> CREATE CONTACT</h2>
        </div>

        <Form
          {...layout}
          ref={this.formRef}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="company" label="Company">
            <QuickCreate
              formRef={this.formRef}
              placeholder="Type and select a company"
              createType={CreateType.COMPANY}
              dataIndex="company"
            />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>

          <Form.Item name="referral" label="Referral">
            <QuickCreate
              formRef={this.formRef}
              placeholder="Type and select a referral"
              createType={CreateType.CONTACT}
              dataIndex="referral"
            />
          </Form.Item>
          <Form.Item name="tag" label="Tag">
            <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
              {tag.map((item) => {
                return <Option key={item.key}>{item.label}</Option>;
              })}
            </Select>
          </Form.Item>
          <div {...formItemLayoutWithOutLabel}>
            <Form.List name="phone" label="Phone">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col flex="3">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
                            name={[field.name, 'number']}
                            fieldKey={[field.fieldKey, 'number']}
                            rules={[{ required: true, message: 'Please enter phone!' }]}
                          >
                            <Input pattern="^[0-9]{10}$" />
                          </Form.Item>
                        </Col>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                            rules={[{ required: true, message: 'Select type' }]}
                          >
                            <Select placeholder="Type">
                              <Option value="Personal">Personal</Option>
                              <Option value="Primary">Primary</Option>
                              <Option value="Company">Company</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customDeleteButton]}
                          onClick={() => remove(field.name)}
                        />
                      </Row>
                    ))}
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Phone"
                    >
                      <Button className={styles.customButtomAdd} onClick={() => add()}>
                        <PlusOutlined /> Add
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name="email">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Row key={[field.key, '@gmail.com', '@geekup.vn']}>
                        <Col span={8} />
                        <Col flex="3">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
                            name={[field.name, 'url']}
                            fieldKey={[field.fieldKey, 'url']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter email!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                            rules={[{ required: true, message: 'Select type' }]}
                          >
                            <Select placeholder="Type">
                              <Option value="Primary">Primary</Option>
                              <Option value="Company">Company</Option>
                              <Option value="Personal">Personal</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col flex="none">
                          <MinusCircleOutlined
                            className={['dynamic-delete-button', styles.customDeleteButton]}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Email"
                    >
                      <Button className={styles.customButtomAdd} onClick={() => add()}>
                        <PlusOutlined /> Add
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name="website">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col flex="3">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
                            name={[field.name, 'url']}
                            fieldKey={[field.fieldKey, 'url']}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                          >
                            <Select placeholder="Type">
                              <Option value="Facebook">Facebook</Option>
                              <Option value="Skype">Skype</Option>
                              <Option value="Zalo">Zalo</Option>
                              <Option value="Youtube">Youtube</Option>
                              <Option value="Linkedin">Linkedin</Option>
                              <Option value="Instagram">Instagram</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col flex="none">
                          <MinusCircleOutlined
                            className={['dynamic-delete-button', styles.customDeleteButton]}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Social link"
                    >
                      <Button className={styles.customButtomAdd} onClick={() => add()}>
                        <PlusOutlined /> Add
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name="address">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...formItemLayout}
                        className={styles.childrenRow}
                        label={`Address ${index + 1}`}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          className={styles.childrenRow}
                          validateTrigger={['onChange', 'onBlur']}
                          noStyle
                        >
                          <Input className={styles.address} />
                        </Form.Item>
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customDeleteAddressButton]}
                          onClick={() => remove(field.name)}
                        />
                      </Form.Item>
                    ))}
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Address"
                    >
                      <Button className={styles.customButtomAdd} onClick={() => add()}>
                        <PlusOutlined /> Add
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>
          <Form.Item wrapperCol={{ ...layout.wrappercol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={this.props.submitting}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(({ contact, tag, loading }) => ({
  contact,
  tag,
  submitting: loading.effects['contact/fullCreate'],
}))(Create);

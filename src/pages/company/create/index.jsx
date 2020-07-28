import { Form, Input, Button, Row, Col, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.less';
import QuickCreate, { CreateType } from '../../common/quickCreate';

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
      type: 'company/cleanData',
    });
    this.props.dispatch({
      type: 'tag/getTag',
    });
  }

  onFinish = (values) => {
    this.props.dispatch({
      type: 'company/fullCreate',
      payload: { ...values },
    });
  };

  render() {
    const { tag } = this.props.tag;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> CREATE COMPANY</h2>
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
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="contact" label="Contact">
            <QuickCreate
              formRef={this.formRef}
              placeholder="Type and select a contact"
              createType={CreateType.CONTACT}
              dataIndex="contact"
            />
          </Form.Item>
          <Form.Item
            name="url"
            label="Website"
            defaultField={{ type: 'url' }}
            rules={[
              {
                type: 'url',
                message: 'This field must be a valid website.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="tag" label="Tag">
            <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
              {tag.map((item) => {
                return <Option key={item.key}>{item.label}</Option>;
              })}
            </Select>
          </Form.Item>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name="phone">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
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
                            <MinusCircleOutlined
                              className={['dynamic-delete-button', styles.customDeleteButton]}
                              onClick={() => remove(field.name)}
                            />
                          </Row>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item
                      label="Phone"
                      className={fields.length === 0 ? '' : styles.customRow}
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
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={styles.childrenRow}
                                name={[field.name, 'url']}
                                fieldKey={[field.fieldKey, 'url']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter email',
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
                            <MinusCircleOutlined
                              className={['dynamic-delete-button', styles.customDeleteButton]}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Row>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item
                      label="Email"
                      className={fields.length === 0 ? '' : styles.customRow}
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
                      <Row key={[field.key, '.com', '.vn']}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
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
                                type
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
                            <MinusCircleOutlined
                              className={['dynamic-delete-button', styles.customDeleteButton]}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Row>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item
                      label="Social link"
                      className={fields.length === 0 ? '' : styles.customRow}
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
                        label={`Address ${index + 1}`}
                        required={false}
                        key={field.key}
                        className={styles.childrenRow}
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
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Form.Item>
                    ))}
                    <Form.Item
                      label="Address"
                      className={fields.length === 0 ? '' : styles.customRow}
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

export default connect(({ company, tag, loading }) => ({
  company,
  tag,
  submitting: loading.effects['company/fullCreate'],
}))(Create);

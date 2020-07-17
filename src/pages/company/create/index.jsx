import { Form, Input, Spin, Button, Row, Col, Select } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
    this.fetchContact = debounce(this.fetchContact, 1000);
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

  fetchContact = (value) => {
    this.props.dispatch({
      type: 'company/handleSearchContactChange',
      payload: { value: this.props.company.searchValueContact, contactInfo: [] },
    });

    this.props.dispatch({
      type: 'company/searchContactByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };

  createContact = () => {
    history.push({
      pathname: '/contact/create',
    });
  };

  handleChange = (value) => {
    this.props.dispatch({
      type: 'company/handleSearchContactChange',
      payload: { value, contactInfo: [] },
    });
  };

  render() {
    const { searchValueContact, contactInfo } = this.props.company;
    const { tag } = this.props.tag;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> CREATE COMPANY</h2>
        </div>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['company', 'name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['company', 'url']} label="URL">
            <Input />
          </Form.Item>
          <Form.Item name={['company', 'tag']} label="Tag">
            <Select mode="tags" style={{ width: '100%' }} labelInValue tokenSeparators={[',']}>
              {tag.map((item) => {
                return <Option key={item.key}>{item.label}</Option>;
              })}
            </Select>
          </Form.Item>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['company', 'phone']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      label="Phone"
                      className={fields.length === 0 ? '' : styles.customRow}
                    >
                      <Button type="dashed" onClick={() => add()}>
                        <PlusOutlined /> Add Phone
                      </Button>
                    </Form.Item>
                    {fields.map((field, index, arr) => (
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={index + 1 === arr.length ? '' : styles.childrenRow}
                                name={[field.name, 'number']}
                                fieldKey={[field.fieldKey, 'number']}
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="Your Phone" pattern="^[0-9]{10}$" />
                              </Form.Item>
                            </Col>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={index + 1 === arr.length ? '' : styles.childrenRow}
                                name={[field.name, 'type']}
                                fieldKey={[field.fieldKey, 'type']}
                                rules={[{ required: true }]}
                              >
                                <Select placeholder="Select Phone">
                                  <Option value="Primary">Primary</Option>
                                  <Option value="Company">Company</Option>
                                  <Option value="Personal">Personal</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col flex="none">
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                style={{ margin: '8px 8px' }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>
          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['company', 'email']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      label="Email"
                      className={fields.length === 0 ? '' : styles.customRow}
                    >
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Emails
                      </Button>
                    </Form.Item>
                    {fields.map((field, index, arr) => (
                      <Row key={[field.key, '@gmail.com', '@geekup.vn']}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={index + 1 === arr.length ? '' : styles.childrenRow}
                                name={[field.name, 'url']}
                                fieldKey={[field.fieldKey, 'url']}
                                placeholder="Your Email"
                                rules={[
                                  { type: 'email', message: 'The input is wrong' },
                                  {
                                    required: true,
                                    messages: 'Please input your email',
                                  },
                                ]}
                                // fieldKey={[field.fieldKey, 'url']}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={index + 1 === arr.length ? '' : styles.childrenRow}
                                name={[field.name, 'type']}
                                fieldKey={[field.fieldKey, 'type']}
                                rules={[{ required: true }]}
                              >
                                <Select placeholder="Select Email">
                                  <Option value="Primary">Primary</Option>
                                  <Option value="Company">Company</Option>
                                  <Option value="Personal">Personal</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col flex="none">
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                style={{ margin: '8px 8px' }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['company', 'website']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      label="Website"
                      className={fields.length === 0 ? '' : styles.customRow}
                    >
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Website
                      </Button>
                    </Form.Item>
                    {fields.map((field, index, arr) => (
                      <Row key={[field.key, '.com', '.vn']}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={index + 1 === arr.length ? '' : styles.childrenRow}
                                name={[field.name, 'url']}
                                fieldKey={[field.fieldKey, 'url']}
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="URL Website" />
                              </Form.Item>
                            </Col>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={index + 1 === arr.length ? '' : styles.childrenRow}
                                name={[field.name, 'type']}
                                fieldKey={[field.fieldKey, 'type']}
                                rules={[{ required: true }]}
                              >
                                <Select placeholder="Select website">
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
                                className="dynamic-delete-button"
                                style={{ margin: '8px 8px' }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['company', 'address']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      label="Address"
                      className={fields.length === 0 ? '' : styles.customRow}
                    >
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Address
                      </Button>
                    </Form.Item>
                    {fields.map((field, index, arr) => (
                      <Form.Item
                        {...formItemLayout}
                        label={`Address ${index + 1}`}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          className={index + 1 === arr.length ? '' : styles.childrenRow}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input passenger's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="Address" style={{ width: '90%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>

          <Form.Item name={['company', 'contact']} label="Contact">
            <Select
              mode="multiple"
              labelInValue
              value={searchValueContact}
              placeholder="Select contact"
              notFoundContent={
                this.props.fetchingContact ? (
                  <Spin size="small" />
                ) : (
                  <p>
                    <Button type="text" onClick={this.createContact}>
                      Create contact
                    </Button>
                  </p>
                )
              }
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleChange}
            >
              {contactInfo.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrappercol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={this.props.submitting}>
              Submit
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
  fetchingContact: loading.effects['company/searchContactByName'],
}))(Create);

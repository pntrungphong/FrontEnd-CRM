import { Form, Input, Spin, Button, Row, Col, Select, Divider } from 'antd';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.less';

const { Option } = Select;

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const layout = {
  labelCol: { span: 8 },
};

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.fetchContact = debounce(this.fetchContact, 1000);
    this.newContactName = '';
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
    this.newContactName = value;
  };

  quickCreateContact = async () => {
    const value = await this.props.dispatch({
      type: 'contact/quickCreateContact',
      payload: {
        name: this.newContactName,
      },
    });
    let listValue = this.formRef.current.getFieldValue('contact');
    if (!listValue) listValue = [];
    listValue.push(value);
    this.formRef.current.setFieldsValue({ contact: [...listValue] });
    this.newContactName = '';
  };

  handleChange = (value) => {
    this.newContactName = '';
    this.props.dispatch({
      type: 'company/handleSearchContactChange',
      payload: { value, contactInfo: [] },
    });
  };

  render() {
    const { contactInfo, searchValueContact } = this.props.company;
    const { tag } = this.props.tag;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> CREATE COMPANY</h2>
        </div>

        <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={this.onFinish}>
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
            <Select
              labelInValue
              autoClearSearchValue
              value={searchValueContact}
              mode="multiple"
              notFoundContent={iff(
                this.props.fetchingContact,
                <Spin size="small" />,
                this.newContactName !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDivider} />
                    <h3 onClick={this.quickCreateContact} className={styles.createNewContact}>
                      Create "{this.newContactName}" as contact
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleChange}
            >
              {contactInfo.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="url"
            label="Website"
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
                      <Button className={styles.customButtonAdd} onClick={() => add()}>
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
                      <Row key={field.key}>
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
                                  {
                                    type: 'email',
                                    message: 'This field must be a valid email.',
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
                      <Button className={styles.customButtonAdd} onClick={() => add()}>
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
                                    message: 'Please enter url!',
                                  },
                                  {
                                    type: 'url',
                                    message: 'This field must be a valid url.',
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
                      <Button className={styles.customButtonAdd} onClick={() => add()}>
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
                    {fields.map((field) => (
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={styles.childrenRow}
                                name={[field.name, 'address']}
                                fieldKey={[field.fieldKey, 'address']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter address !',
                                  },
                                ]}
                              >
                                <Input />
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
                      label="Address"
                      className={fields.length === 0 ? '' : styles.customRow}
                    >
                      <Button className={styles.customButtonAdd} onClick={() => add()}>
                        <PlusOutlined /> Add
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={this.props.submitting}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(({ company, tag, loading, contact }) => ({
  company,
  contact,
  tag,
  submitting: loading.effects['company/fullCreate'],
  fetchingContact: loading.effects['company/searchContactByName'],
}))(Create);

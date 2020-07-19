import { Form, Input, Spin, Button, Row, Col, Select, Divider } from 'antd';
import React from 'react';
import { connect } from 'umi';
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
    // console.table(values)
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
      type: 'company/quickCreateContact',
      payload: {
        'name': this.newContactName
      },
    });
    let listValue = this.formRef.current.getFieldValue('contact');
    if (!listValue) listValue = [];
    listValue.push(value);
    this.formRef.current.setFieldsValue({ 'contact': [...listValue] });
    this.newContactName = '';
  };

  handleChange = (value) => {
    this.newContactName = ''
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
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='url' label="Social Link">
            <Input />
          </Form.Item>
          <Form.Item name='tag' label="Tag">
            <Select mode="tags" style={{ width: '100%' }} labelInValue tokenSeparators={[',']}>
              {tag.map((item) => {
                return <Option key={item.key}>{item.label}</Option>;
              })}
            </Select>
          </Form.Item>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name='phone'>

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
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="Your Phone" pattern="^[0-9]{10}$" />
                              </Form.Item>
                            </Col>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={styles.childrenRow}
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
                            <MinusCircleOutlined
                              className={"dynamic-delete-button", styles.customDeleteButton}
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
                      <Button
                        className={styles.customButtomAdd}
                        onClick={() => add()}
                      >
                        <PlusOutlined /> Add Phone
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>
          <div {...formItemLayoutWithOutLabel}>
            <Form.List name='email'>
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
                                placeholder="Your Email"
                                rules={[
                                  { type: 'email', message: 'The input is wrong' },
                                  {
                                    required: true,
                                    messages: 'Please input your email',
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
                                rules={[{ required: true }]}
                              >
                                <Select placeholder="Select Email">
                                  <Option value="Primary">Primary</Option>
                                  <Option value="Company">Company</Option>
                                  <Option value="Personal">Personal</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <MinusCircleOutlined
                              className={"dynamic-delete-button", styles.customDeleteButton}
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
                      <Button
                        className={styles.customButtomAdd}
                        onClick={() => add()}
                      >
                        <PlusOutlined /> Add Emails
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name='website'>
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
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="URL Website" />
                              </Form.Item>
                            </Col>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                className={styles.childrenRow}
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
                            <MinusCircleOutlined
                              className={"dynamic-delete-button", styles.customDeleteButton}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Row>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item
                      label="Website"
                      className={fields.length === 0 ? '' : styles.customRow}
                    >
                      <Button
                        className={styles.customButtomAdd}
                        onClick={() => add()}
                      >
                        <PlusOutlined /> Add Website
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name='address'>
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
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input address or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="Address" style={{ width: '90%' }} />
                        </Form.Item>
                        <MinusCircleOutlined
                          className={"dynamic-delete-button", styles.customDeleteAddressButton}
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
                      <Button
                        className={styles.customButtomAdd}
                        onClick={() => add()}
                      >
                        <PlusOutlined /> Add Address
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>
          <Form.Item name='contact' label="Contact">
            <Select
              labelInValue
              autoClearSearchValue
              value={searchValueContact}
              mode="multiple"
              notFoundContent={
                this.props.fetchingContact ? (
                  <Spin size="small" />
                ) :
                  this.newContactName != '' ?
                    (
                      <>
                        <div className={styles.resultNotFound}>No results found</div>
                        <Divider className={styles.customDevider} />
                        <h3 onClick={this.quickCreateContact} className={styles.createNewContact}>
                          Create "{this.newContactName}" as contact
                      </h3>
                      </>
                    ) : ('')
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

export default connect(({ company, tag, loading, contact }) => ({
  company,
  contact,
  tag,
  submitting: loading.effects['company/fullCreate'],
  fetchingContact: loading.effects['company/searchContactByName'],
}))(Create);

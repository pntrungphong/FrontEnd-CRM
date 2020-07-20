import { Form, Input, Button, Row, Col, Spin, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Divider } from '@material-ui/core';
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

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);
class Create extends React.Component {
  constructor(props) {
    super(props);

    this.fetchCompany = debounce(this.fetchCompany, 1000);
    this.fetchContact = debounce(this.fetchContact, 1000);

    this.newReferralName = '';
    this.newCompanyName = '';
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

  fetchCompany = (value) => {
    this.props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value: this.props.contact.searchValue, listCompany: [] },
    });

    this.props.dispatch({
      type: 'contact/searchCompanyByName',
      payload: { value },
    });

    this.newCompanyName = value;
  };

  fetchContact = (value) => {
    this.props.dispatch({
      type: 'contact/handleSearchChangeContactReferral',
      payload: { value: this.props.contact.searchValueContactReferral, contactInfo: [] },
    });
    this.props.dispatch({
      type: 'searchModel/saveSearchValue',
      payload: value,
    });
    this.props.dispatch({
      type: 'contact/searchContactReferralByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });

    this.newReferralName = value;
  };

  quickCreateReferral = async () => {
    const value = await this.props.dispatch({
      type: 'contact/quickCreateContact',
      payload: {
        name: this.newReferralName,
      },
    });
    let listValue = this.formRef.current.getFieldValue('referral');
    if (!listValue) listValue = [];
    listValue.push(value);
    this.formRef.current.setFieldsValue({ referral: [...listValue] });
    this.newReferralName = '';
  };

  quickCreateCompany = async () => {
    const value = await this.props.dispatch({
      type: 'company/quickCreateCompany',
      payload: {
        name: this.newCompanyName,
      },
    });
    let listValue = this.formRef.current.getFieldValue('company');
    if (!listValue) listValue = [];
    listValue.push(value);
    this.formRef.current.setFieldsValue({ company: [...listValue] });
    this.newCompanyName = '';
  };

  handleChange = (value) => {
    this.props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  handleChangeContactReferral = (value) => {
    this.props.dispatch({
      type: 'contact/handleSearchChangeContactReferral',
      payload: { value, contactInfo: [] },
    });
  };

  render() {
    const {
      searchValue,
      listCompany,
      searchValueContactReferral,
      contactInfo,
    } = this.props.contact;
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
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>

          <Form.Item name="company" label="Company">
            <Select
              mode="multiple"
              labelInValue
              autoClearSearchValue
              value={searchValue}
              notFoundContent={iff(
                this.props.fetchingCompany,
                <Spin size="small" />,
                this.newCompanyName !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDevider} />
                    <h3 onClick={this.quickCreateCompany} className={styles.createNewContact}>
                      Create "{this.newCompanyName}" as company
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchCompany}
              onChange={this.handleChange}
            >
              {listCompany.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="referral" label="Referral">
            <Select
              labelInValue
              autoClearSearchValue
              value={searchValueContactReferral}
              mode="multiple"
              notFoundContent={iff(
                this.props.fetchingContact,
                <Spin size="small" />,
                this.newReferralName !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDevider} />
                    <h3 onClick={this.quickCreateReferral} className={styles.createNewContact}>
                      Create "{this.newReferralName}" as contact
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleChangeContactReferral}
            >
              {contactInfo.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tag" label="Tag">
            <Select mode="tags" style={{ width: '100%' }} labelInValue tokenSeparators={[',']}>
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
                            rules={[{ required: true }]}
                            fieldKey={[field.fieldKey, 'number']}
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
                        <PlusOutlined /> Add Phone
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
                              { type: 'email', message: 'Email wrong format' },
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
                            rules={[
                              {
                                required: true,
                              },
                            ]}
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
                        <PlusOutlined /> Add Emails
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
                            <Select placeholder="Website">
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
                      label="Website"
                    >
                      <Button className={styles.customButtomAdd} onClick={() => add()}>
                        <PlusOutlined /> Add Website
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
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Enter address or remove field',
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="Address" style={{ width: '90%' }} />
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
                        <PlusOutlined /> Add Address
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>
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

export default connect(({ contact, tag, loading, searchModel }) => ({
  contact,
  searchModel,
  tag,
  submitting: loading.effects['contact/fullCreate'],
  fetchingCompany: loading.effects['contact/searchCompanyByName'],
  fetchingContact: loading.effects['contact/searchContactReferralByName'],
}))(Create);

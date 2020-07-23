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

    this.inputValue = '';
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

    this.inputValue = value;
  };

  fetchContact = (value) => {
    this.props.dispatch({
      type: 'contact/handleSearchChangeContactReferral',
      payload: { value: this.props.contact.searchValue, contactInfo: [] },
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

    this.inputValue = value;
  };

  dispatchType = {
    referral: 'contact/quickCreateContact',
    company: 'company/quickCreateCompany',
  };

  formatFieldValue = (field, listValue) => {
    if (field === 'referral') return { referral: [...listValue] };
    if (field === 'company') return { company: [...listValue] };
    return {};
  };

  quickCreate = async (field) => {
    const searchValue = this.inputValue;
    this.inputValue = '';
    const value = await this.props.dispatch({
      type: this.dispatchType[field],
      payload: {
        name: searchValue,
      },
    });
    let listValue = this.formRef.current.getFieldValue(field);
    if (!listValue) listValue = [];
    listValue.push(value);
    const updateValue = this.formatFieldValue(field, listValue);
    this.formRef.current.setFieldsValue(updateValue);
    this.setState({});
  };

  handleChange = (value) => {
    this.inputValue = '';
    this.setState({});
    this.props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  handleChangeContactReferral = (value) => {
    this.inputValue = '';
    this.setState({});
    this.props.dispatch({
      type: 'contact/handleSearchChangeContactReferral',
      payload: { value, contactInfo: [] },
    });
  };

  onBlur = () => {
    this.inputValue = '';
    this.setState({});
  };

  onInputKeyDown = (event) => {
    if (event.nativeEvent.code === 'Backspace') {
      this.inputValue = '';
      this.setState({});
    }
  };

  render() {
    const { searchValue, listCompany, contactInfo } = this.props.contact;
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
            rules={[{ required: true, message: 'Please input name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="company" label="Company">
            <Select
              mode="multiple"
              labelInValue
              autoClearSearchValue
              placeholder="Select realation company"
              value={searchValue}
              notFoundContent={iff(
                this.props.fetchingCompany,
                <Spin size="small" />,
                this.inputValue !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDevider} />
                    <h3
                      onClick={() => this.quickCreate('company')}
                      className={styles.createNewContact}
                    >
                      Create "{this.inputValue}" as company
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchCompany}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              onInputKeyDown={this.onInputKeyDown}
            >
              {listCompany.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>

          <Form.Item name="referral" label="Referral">
            <Select
              labelInValue
              autoClearSearchValue
              value={searchValue}
              placeholder="Select realation contact"
              mode="multiple"
              notFoundContent={iff(
                this.props.fetchingContact,
                <Spin size="small" />,
                this.inputValue !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDevider} />
                    <h3
                      onClick={() => this.quickCreate('referral')}
                      className={styles.createNewContact}
                    >
                      Create "{this.inputValue}" as contact
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleChangeContactReferral}
              onBlur={this.onBlur}
              onInputKeyDown={this.onInputKeyDown}
            >
              {contactInfo.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
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
                            rules={[{ required: true, message: 'Please input phone' }]}
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
                            rules={[{ required: true, message: 'Select type' }]}
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
                                message: 'Please input your email',
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
                            rules={[{ required: true, message: 'Input your data' }]}
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
                            rules={[{ required: true, message: 'Select type' }]}
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
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Input your address',
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="Address" className={styles.address} />
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

import { Form, Input, Button, Row, Col, Spin, Select } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.less';
// import { number } from 'prop-types';

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

    this.fetchCompany = debounce(this.fetchCompany, 1000);
    this.fetchContact = debounce(this.fetchContact, 1000);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'tag/getTag',
    });
  }

  onFinish = (values) => {
    // console.table(values);
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
  };

  createCompany = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  createContact = () => {
    // console.table(this.props.contact.searchValueContactReferral);
    // this.props.dispatch({
    //   type: 'contact/quickCreate',
    //   payload: {
    //     contact:{
    //       name:this.props.searchModel.searchValue,
    //   },
    //   previousData: this.props.contact.searchValueContactReferral,
    //  },
    // });
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
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name={['contact', 'name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={['contact', 'title']} label="Title">
            <Input />
          </Form.Item>

          <Form.Item name={['contact', 'company']} label="Company">
            <Select
              mode="multiple"
              labelInValue
              value={searchValue}
              placeholder="Select company"
              notFoundContent={
                this.props.fetchingCompany ? (
                  <Spin size="small" />
                ) : (
                  <h4 type="text" onClick={this.createCompany} className={styles.optionCreate}>
                    Create company
                  </h4>
                )
              }
              filterOption={false}
              onSearch={this.fetchCompany}
              onChange={this.handleChange}
            >
              {listCompany.map((d) => (
                <Option key={d.id}>{d.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['contact', 'tag']} label="Tag">
            <Select mode="tags" style={{ width: '100%' }} labelInValue tokenSeparators={[',']}>
              {tag.map((item) => {
                return <Option key={item.key}>{item.label}</Option>;
              })}
            </Select>
          </Form.Item>
          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'phone']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Phone"
                    >
                      <Button type="dashed" onClick={() => add()}>
                        <PlusOutlined /> Add Phone
                      </Button>
                    </Form.Item>
                    {fields.map((field, index, arr) => (
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col flex="3">
                          <Form.Item
                            {...field}
                            className={index + 1 === arr.length ? '' : styles.childrenRow}
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
                            className={index + 1 === arr.length ? '' : styles.childrenRow}
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                            rules={[{ required: true }]}
                          >
                            <Select placeholder="Select Phone">
                              <Option value="Mobile">Mobile</Option>
                              <Option value="Home">Home</Option>
                              <Option value="Company">Company</Option>
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
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'email']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Email"
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
                        <Col flex="3">
                          <Form.Item
                            {...field}
                            className={index + 1 === arr.length ? '' : styles.childrenRow}
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
                            className={index + 1 === arr.length ? '' : styles.childrenRow}
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Select placeholder="Select Email">
                              <Option value="Gmail">Gmail</Option>
                              <Option value="Yandex">Yandex</Option>
                              <Option value="Yahoo">Yahoo</Option>
                              <Option value="Outlook">Outlook</Option>
                              <Option value="Company">Company</Option>
                              <Option value="Personal">Personal</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col flex="none">
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '8px 8px' }}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'website']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Website"
                    >
                      <Button type="dashed" onClick={() => add()}>
                        <PlusOutlined /> Add Website
                      </Button>
                    </Form.Item>
                    {fields.map((field, index, arr) => (
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col flex="3">
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
                            className="dynamic-delete-button"
                            style={{ margin: '8px 8px' }}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'address']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item
                      className={fields.length === 0 ? '' : styles.customRow}
                      label="Address"
                    >
                      <Button type="dashed" onClick={() => add()}>
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
                              message: 'Enter address or remove field',
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="Address" style={{ width: '90%' }} />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Form.Item>
                    ))}
                  </div>
                );
              }}
            </Form.List>
          </div>

          <Form.Item name={['contact', 'referral']} label="Referral">
            <Select
              mode="multiple"
              labelInValue
              value={searchValueContactReferral}
              placeholder="Select contact"
              notFoundContent={
                this.props.fetchingContact ? (
                  <Spin size="small" />
                ) : (
                  <h4 type="text" onClick={this.createContact} className={styles.optionCreate}>
                    Create company
                  </h4>
                )
              }
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleChangeContactReferral}
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

export default connect(({ contact, tag, loading, searchModel }) => ({
  contact,
  searchModel,
  tag,
  submitting: loading.effects['contact/fullCreate'],
  fetchingCompany: loading.effects['contact/searchCompanyByName'],
  fetchingContact: loading.effects['contact/searchContactReferralByName'],
}))(Create);

import { Form, Input, Button, Spin, Select } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const { Option } = Select;

class Create extends React.Component {
  constructor(props) {
    super(props);
    // this.lastFetchId = 0;
    this.fetchCompany = debounce(this.fetchCompany, 1000);
    this.fetchContact = debounce(this.fetchContact, 1000);
  }

  onFinish = (values) => {
    console.table(values);

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
    history.push({
      pathname: '/contact/update',
    });
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
    const { searchValue, listCompany } = this.props.contact;
    const { searchValueContactReferral, contactInfo } = this.props.contact;

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
          <Form.Item
            name={['contact', 'name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className={styles.one} {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'phone']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item label="Phone" className={styles.two}>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Phone
                      </Button>
                    </Form.Item>
                    {fields.map((field) => (
                      <Form.Item {...formItemLayout} label={' '} required={false} key={field.key}>
                        <Form.Item
                          {...field}
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
                          <Input placeholder="Your Phone" style={{ width: '90%' }} />
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

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'email']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item label="Email">
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Email
                      </Button>
                    </Form.Item>
                    {fields.map((field) => (
                      <Form.Item
                        {...formItemLayout}
                        className={styles.one}
                        required={false}
                        label={' '}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
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
                          <Input placeholder="Your Email" style={{ width: '90%' }} />
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

          <div className={styles.one} {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'website']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item label="Website">
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Website
                      </Button>
                    </Form.Item>
                    {fields.map((field) => (
                      <Form.Item {...formItemLayout} label={' '} required={false} key={field.key}>
                        <Form.Item
                          {...field}
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
                          <Input placeholder="URL Website" style={{ width: '80%' }} />
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

          <div className={styles.one} {...formItemLayoutWithOutLabel}>
            <Form.List name={['contact', 'address']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item label="Address">
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Address
                      </Button>
                    </Form.Item>
                    {fields.map((field) => (
                      <Form.Item {...formItemLayout} label={' '} required={false} key={field.key}>
                        <Form.Item
                          {...field}
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
                          <Input placeholder="Address" style={{ width: '80%' }} />
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
                  <p>
                    <Button type="text" onClick={this.createContact}>
                      Create Contact
                    </Button>
                  </p>
                )
              }
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleChangeContactReferral}
            >
              {contactInfo.map((d) => (
                <Option key={d.id}>{d.name}</Option>
              ))}
            </Select>
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
                  <p>
                    <Button type="text" onClick={this.createCompany}>
                      Create Company
                    </Button>
                  </p>
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

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={this.props.submitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(({ contact, loading }) => ({
  contact,
  submitting: loading.effects['contact/fullCreate'],
  fetchingCompany: loading.effects['contact/searchCompanyByName'],
  fetchingContact: loading.effects['contact/searchContactReferralByName'],
}))(Create);

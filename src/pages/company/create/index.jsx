import { Form, Input, Button, Row, Col, Select } from 'antd';
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
    // this.lastFetchId = 0;
    this.fetchCompany = debounce(this.fetchCompany, 1000);
    this.fetchContact = debounce(this.fetchContact, 1000);
  }

  onFinish = (values) => {
    console.table(values);

    this.props.dispatch({
      type: 'company/fullCreate',
      payload: { ...values },
    });
  };

  fetchContact = (value) => {
    this.props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value: this.props.contact.searchValue, listContact: [] },
    });

    this.props.dispatch({
      type: 'contact/searchCompanyByName',
      payload: { value },
    });
  };

  fetchCompany = (value) => {
    this.props.dispatch({
      type: 'company/handleSearchChangeCompanyReferral',
      payload: { value: this.props.company.searchValueCompanyReferral, companyInfo: [] },
    });

    this.props.dispatch({
      type: 'company/searchCompanyReferralByName',
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

  createCompany = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  handleChange = (value) => {
    this.props.dispatch({
      type: 'company/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  handleChangeCompanyReferral = (value) => {
    this.props.dispatch({
      type: 'company/handleSearchChangeCompanyReferral',
      payload: { value, companyInfo: [] },
    });
  };

  render() {
    // const { searchValue, listCompany } = this.props.company;
    // const { searchValueCompanyReferral, companyInfo } = this.props.company;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> CREATE company</h2>
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

          <div {...formItemLayoutWithOutLabel}>
            <Form.List name={['company', 'phone']}>
              {(fields, { add, remove }) => {
                return (
                  <div>
                    <Form.Item label="Phone">
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
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                // {...field}
                                name="phone"
                              >
                                <Input placeholder="Your Phone" pattern="^[0-9]{10}$" />
                              </Form.Item>
                            </Col>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                name={[field.name, 'type']}
                                fieldKey={[field.fieldKey, 'type']}
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
                    <Form.Item label="Email">
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Emails
                      </Button>
                    </Form.Item>
                    {fields.map((field) => (
                      <Row key={[field.key, '@gmail.com', '@geekup.vn']}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                // {...field}
                                name="email"
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
                                name={[field.name, 'type']}
                                fieldKey={[field.fieldKey, 'type']}
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
                      <Row key={field.key}>
                        <Col span={8} />
                        <Col span={16}>
                          <Row>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                name={[field.name, 'url']}
                                fieldKey={[field.fieldKey, 'url']}
                              >
                                <Input placeholder="URL Website" />
                              </Form.Item>
                            </Col>
                            <Col flex="2">
                              <Form.Item
                                {...field}
                                name={[field.name, 'type']}
                                fieldKey={[field.fieldKey, 'type']}
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

          {/* <Form.Item name={['company', 'referral']} label="Referral">
            <Select
              mode="multiple"
              labelInValue
              value={searchValueCompanyReferral}
              placeholder="Select company"
              notFoundContent={
                this.props.fetchingCompany ? (
                  <Spin size="small" />
                ) : (
                  <p>
                    <Button type="text" onClick={this.createCompany}>
                      Create company
                    </Button>
                  </p>
                )
              }
              filterOption={false}
              onSearch={this.fetchCompany}
              onChange={this.handleChangeCompanyReferral}
            >
              {companyInfo.map((d) => (
                <Option key={d.id}>{d.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['company', 'company']} label="Company">
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
          </Form.Item> */}

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

export default connect(({ company, loading }) => ({
  company,
  submitting: loading.effects['company/fullCreate'],
  fetchingContact: loading.effects['company/searchCompanyByName'],
  fetchingCompany: loading.effects['company/searchCReferralByName'],
}))(Create);

import { Spin, Form, Input, Col, Row, Button, Select } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMount, useUnmount } from 'ahooks';
import debounce from 'lodash/debounce';
import styles from './style.less';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrappercol: { span: 16 },
};
const validateMessages = (label) => ({
  required: `${label} is required!`,
});
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

const Update = connect(({ contact, tag, loading }) => ({
  contact,
  tag,
  submitting: loading.effects['contact/create'],
  querying: loading.effects['contact/loading'],
  fetchingCompany: loading.effects['contact/searchCompanyByName'],
  fetchingContact: loading.effects['contact/searchContactReferralByName'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'contact/loading',
      payload: { id: props.match.params.id },
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'tag/getTag',
    });
    props.dispatch({
      type: 'contact/cleanData',
    });
  });

  const onFinish = (values) => {
    props.dispatch({
      type: 'contact/update',
      payload: { ...values, id: props.match.params.id },
    });
  };
  const [form] = Form.useForm();

  let fetchCompany = (value) => {
    props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value: props.contact.searchValue, listCompany: [] },
    });

    props.dispatch({
      type: 'contact/searchCompanyByName',
      payload: { value },
    });
  };

  const createCompany = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  const createContact = () => {
    history.push({
      pathname: '/contact/create',
    });
  };

  let fetchContact = (value) => {
    props.dispatch({
      type: 'contact/handleSearchChangeContactReferral',
      payload: { value: props.contact.searchValueContactReferral, contactInfo: [] },
    });

    props.dispatch({
      type: 'contact/searchContactReferralByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };
  fetchCompany = debounce(fetchCompany, 1000);
  fetchContact = debounce(fetchContact, 1000);

  const handleChange = (value) => {
    props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  const handleChangeContactReferral = (value) => {
    props.dispatch({
      type: 'contact/handleSearchChangeContactReferral',
      payload: { value, contactInfo: [] },
    });
  };

  if (props.contact.data === undefined) {
    return <Spin />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.title}> UPDATE CONTACT</h2>
      </div>

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          contact: {
            name: props.contact.data.name,
            phone: props.contact.data.phone,
            website: props.contact.data.website,
            email: props.contact.data.email,
            tag: props.contact.data.tag,
            title: props.contact.data.title,
            referral: props.contact.data.referral,
            address: props.contact.data.address,
            company: props.contact.data.company,
          },
        }}
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
        <Form.Item name={['contact', 'title']} label="Title">
          <Input />
        </Form.Item>
        <Form.Item name={['contact', 'company']} label="Company">
          <Select
            mode="multiple"
            labelInValue
            value={props.contact.searchValue}
            placeholder="Select company"
            notFoundContent={
              props.fetchingCompany ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text" onClick={createCompany}>
                    Create Company
                  </Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchCompany}
            onChange={handleChange}
          >
            {props.contact.listCompany.map((d) => (
              <Option key={d.key}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={['contact', 'tag']} label="Tag">
          <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
            {props.tag.tag.map((item) => {
              return <Option key={item.key}>{item.label}</Option>;
            })}
          </Select>
        </Form.Item>

        <div {...formItemLayoutWithOutLabel}>
          <Form.List name={['contact', 'phone']}>
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Form.Item label="Phone">
                    <Button type="dashed" onClick={() => add()}>
                      <PlusOutlined /> Add Phone
                    </Button>
                  </Form.Item>
                  {fields.map((field) => (
                    <Row key={field.key}>
                      <Col span={8} />
                      <Col flex="3">
                        <Form.Item
                          {...field}
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
                          className={styles.slt}
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
                          className={styles.sltOne}
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
                    <Row key={field.key}>
                      <Col span={8} />
                      <Col span={16}>
                        <Row>
                          <Col flex="2">
                            <Form.Item
                              {...field}
                              name={[field.name, 'url']}
                              fieldKey={[field.fieldKey, 'url']}
                              rules={[
                                { type: 'email', message: 'The input is wrong' },
                                {
                                  required: true,
                                  messages: 'Please input your email',
                                },
                              ]}
                            >
                              <Input placeholder="URL Email" />
                            </Form.Item>
                          </Col>
                          <Col flex="2">
                            <Form.Item
                              {...field}
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
                              className={styles.sltOne}
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
          <Form.List name={['contact', 'website']}>
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Form.Item label="Website">
                    <Button type="dashed" onClick={() => add()}>
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
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Input placeholder="URL Website" />
                            </Form.Item>
                          </Col>
                          <Col flex="2">
                            <Form.Item
                              {...field}
                              name={[field.name, 'type']}
                              fieldKey={[field.fieldKey, 'type']}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
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
                              className={styles.sltOne}
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
                        <Input placeholder="Address" className={styles.address} />
                      </Form.Item>
                      <MinusCircleOutlined
                        className={styles.sltTwo}
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
            value={props.contact.searchValueContactReferral}
            placeholder="Select contact"
            notFoundContent={
              props.fetchingContact ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text" onClick={createContact}>
                    Create Contact
                  </Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchContact}
            onChange={handleChangeContactReferral}
          >
            {props.contact.contactInfo.map((d) => (
              <Option key={d.key}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={props.submitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Update;

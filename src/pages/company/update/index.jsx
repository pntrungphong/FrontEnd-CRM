import { Spin, Form, Input, Col, Select, Row, Button } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import { useMount, useUnmount } from 'ahooks';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import styles from './style.less';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const formItemLayoutWithOutLabel = {
  wrappercol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

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

const Update = connect(({ company, loading }) => ({
  company,
  submitting: loading.effects['company/update'],
  querying: loading.effects['company/loading'],
  fetchingContact: loading.effects['company/searchContactByName'],
}))(function (props) {
  useMount(() => {
    props.dispatch({
      type: 'company/loading',
      payload: { id: props.location.query.id },
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'company/cleanData',
    });
  });

  const onFinish = (values) => {
    console.table(values);
    props.dispatch({
      type: 'company/update',
      payload: { ...values, id: props.location.query.id },
    });
  };

  const handleChange = (value) => {
    props.dispatch({
      type: 'company/handleSearchContactChange',
      payload: { value, contactInfo: [] },
    });
  };
  const [form] = Form.useForm();

  let fetchContact = (value) => {
    props.dispatch({
      type: 'company/handleSearchContactChange',
      payload: { value: props.company.searchValueContact, contactInfo: [] },
    });

    props.dispatch({
      type: 'company/searchContactByName',
      payload: {
        page: 1,
        searchValue: value,
      },
    });
  };

  const createContact = () => {
    history.push({
      pathname: '/contact/create',
    });
  };

  fetchContact = debounce(fetchContact, 1000);

  if (props.company.data === undefined) {
    return <Spin />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.title}> Update company </h2>
      </div>

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        initialValues={{
          company: {
            name: props.company.data.name,
            tag: props.company.data.tag,
            phone: props.company.data.phone,
            website: props.company.data.website,
            url: props.company.data.url,
            email: props.company.data.email,
            title: props.company.data.title,
            contact: props.company.data.contact,
            address: props.company.data.address,
          },
        }}
        onFinish={onFinish}
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
            <Option key="1">String</Option>
            <Option key="6">tesst</Option>
          </Select>
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
                              {...field}
                              name={[field.name, 'number']}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                              fieldKey={[field.fieldKey, 'number']}
                            >
                              <Input placeholder="Your Phone" pattern="^[0-9]{10}$" />
                            </Form.Item>
                          </Col>
                          <Col flex="2">
                            <Form.Item
                              {...field}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                              name={[field.name, 'type']}
                              fieldKey={[field.fieldKey, 'type']}
                            >
                              <Select placeholder="Select Phone">
                                <Option value="Primary">Primary</Option>
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
                                {
                                  required: true,
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

        <Form.Item name={['company', 'contact']} label="Contact">
          <Select
            mode="multiple"
            labelInValue
            value={props.company.searchValueContact}
            placeholder="Select contact"
            notFoundContent={
              props.fetchingContact ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text" onClick={createContact}>
                    Create contact
                  </Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchContact}
            onChange={handleChange}
          >
            {props.company.contactInfo.map((d) => (
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

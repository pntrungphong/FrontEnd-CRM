import { Spin, Form, Input, Col, Row, Button, Select } from 'antd';
import React, { useRef } from 'react';
import { connect } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import QuickCreate, { CreateType } from '../../common/quickCreate';
import { useMount, useUnmount } from 'ahooks';
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
}))((props) => {
  const formRef = useRef(null);
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
        ref={formRef}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          name: props.contact.data.name,
          phone: props.contact.data.phone,
          website: props.contact.data.website,
          email: props.contact.data.email,
          tag: props.contact.data.tag,
          title: props.contact.data.title,
          referral: props.contact.data.referral,
          address: props.contact.data.address,
          company: props.contact.data.company,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="company" label="Company">
          <QuickCreate
            formRef={formRef}
            placeholder="Type and select a company"
            createType={CreateType.COMPANY}
            dataIndex="company"
          />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>

        <Form.Item name="referral" label="Referral">
          <QuickCreate
            formRef={formRef}
            placeholder="Type and select a referral"
            createType={CreateType.CONTACT}
            dataIndex="referral"
          />
        </Form.Item>
        <Form.Item name="tag" label="Tag">
          <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
            {props.tag.tag.map((item) => {
              return <Option key={item.key}>{item.label}</Option>;
            })}
          </Select>
        </Form.Item>

        <div {...formItemLayoutWithOutLabel}>
          <Form.List name="phone">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Form.Item label="Phone">
                    <Button className={styles.customButtomAdd} onClick={() => add()}>
                      <PlusOutlined /> Add
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
                          rules={[{ required: true, message: 'Please enter phone!' }]}
                        >
                          <Input pattern="^[0-9]{10}$" />
                        </Form.Item>
                      </Col>
                      <Col flex="2">
                        <Form.Item
                          {...field}
                          className={styles.slt}
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
          <Form.List name="email">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Form.Item label="Email">
                    <Button
                      className={styles.customButtomAdd}
                      onClick={() => {
                        add();
                      }}
                    >
                      <PlusOutlined /> Add
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
                                  message: 'Please enter email',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col flex="2">
                            <Form.Item
                              {...field}
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
          <Form.List name="website">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Form.Item label="Website">
                    <Button className={styles.customButtomAdd} onClick={() => add()}>
                      <PlusOutlined /> Add
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
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col flex="2">
                            <Form.Item
                              {...field}
                              name={[field.name, 'type']}
                              fieldKey={[field.fieldKey, 'type']}
                            >
                              <Select placeholder="Select Type">
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
          <Form.List name="address">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <Form.Item label="Address">
                    <Button
                      className={styles.customButtomAdd}
                      onClick={() => {
                        add();
                      }}
                    >
                      <PlusOutlined /> Add
                    </Button>
                  </Form.Item>
                  {fields.map((field) => (
                    <Form.Item {...formItemLayout} label={' '} required={false} key={field.key}>
                      <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                        <Input className={styles.address} />
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
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={props.submitting}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Update;

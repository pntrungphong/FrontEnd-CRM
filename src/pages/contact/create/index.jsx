import { Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles, { one } from './style.less';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
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

const Create = connect(({ contact, loading }) => ({
  contact,
  submitting: loading.effects['contact/fullCreate'],
}))(function (props) {
  const onFinish = (values) => {
    props.dispatch({
      type: 'contact/fullCreate',
      payload: { ...values },
    });
  };
  const [form] = Form.useForm();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.title}> CREATE CONTACT</h2>
      </div>

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['contact', 'name']}
          label="Name"
          initialValue={props.location.state === undefined ? '' : props.location.state.name}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name={['contact', 'phone']}
          label="Phone"
          initialValue={props.location.state === undefined ? '' : props.location.state.phone}
        >
          <Input />
        </Form.Item> */}
        <Form className={one}
          initialValue={props.location.state === undefined ? '' : props.location.state.phone}
          {...formItemLayoutWithOutLabel}

        >

          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div >
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Phone" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input passenger's name or delete this field."
                          }
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="Your Phone"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: "0 8px" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: "50%" }}
                    >
                      <PlusOutlined /> Add Phone
                </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>

        {/* <Form.Item name={['contact', 'email']} label="Email">
          <Input />
        </Form.Item> */}
        <Form className={one}
          initialValue={props.location.state === undefined ? '' : props.location.state.phone}
          {...formItemLayoutWithOutLabel}

        >

          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div >
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Email" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input passenger's name or delete this field."
                          }
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="Your Email"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: "0 8px" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: "50%" }}
                    >
                      <PlusOutlined /> Add Email
                </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>
        {/* <Form.Item name={['contact', 'website']} label="Website">

          <Input />
        </Form.Item> */}
        <Form className={one}
          initialValue={props.location.state === undefined ? '' : props.location.state.phone}
          {...formItemLayoutWithOutLabel}

        >

          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div >
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Website" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input passenger's name or delete this field."
                          }
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="URL Website"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: "0 8px" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: "50%" }}
                    >
                      <PlusOutlined /> Add Website
                </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>

        <Form.Item name={['contact', 'address']} label="Address">
          <Input />
        </Form.Item>
        <Form.Item name={['contact   ', 'tag']} label="Tag">
          <Input />
        </Form.Item>
        <Form.Item name={['contact', 'referral']} label="Referral">
          <Input />
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

export default Create;

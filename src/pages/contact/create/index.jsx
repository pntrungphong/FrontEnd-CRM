import { Form, Input, Button, Spin, Select } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
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

const { Option } = Select;

class Create extends React.Component {
  constructor(props) {
    super(props);
    // this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 1000);
  }

  onFinish = (values) => {
    console.table(values);

    // this.props.dispatch({
    //   type: 'contact/fullCreate',
    //   payload: { ...values },
    // });
  };

  fetchUser = (value) => {
    console.log('fetching user', value);
    // this.lastFetchId += 1;
    // const fetchId = this.lastFetchId;

    this.props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value: this.props.contact.searchValue, listCompany: [] },
    });

    this.props.dispatch({
      type: 'contact/searchCompanyByName',
      payload: { value },
    });
  };

  createCompany = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  handleChange = (value) => {
    this.props.dispatch({
      type: 'contact/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  render() {
    const { searchValue, listCompany } = this.props.contact;
    // const { getFieldDecorator } = this.props.form;
    // const websiteSelector = getFieldDecorator("prefix", {

    //   rules: [
    //     {
    //       required: true,
    //       message: "Prefix is required"
    //     }
    //   ]
    // })(
    //   <Select defaultValue="Facebook"  >
    //     <Option value="Facebook">Facebook</Option>
    //     <Option value="Zalo">Zalo</Option>
    //     <Option value="Website">Website</Option>
    //     <Option value="Github">Github</Option>
    //     <Option value="Gmail">Gmail</Option>
    //     <Option value="Instagram">Instagram</Option>
    //     <Option value="Linkedin">Linkedin</Option>
    //     <Option value="Order">Order</Option>

    //   </Select>
    // );

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
          <Form.Item
            name={['contact', 'phone']}
            label="Phone"
           
          >
            <Input />
          </Form.Item>

          <Form.Item name={['contact', 'email']} label="Email">
            <Input />
          </Form.Item>
          <Form className={one}
           
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
          <Form.Item name={['contact', 'tag']} label="Tag">
            <Input />
          </Form.Item>
          <Form.Item name={['contact', 'referral']} label="Referral">
            <Input />
          </Form.Item>
          <Form.Item name={['contact', 'company']} label="Company">
            <Select
              mode="multiple"
              labelInValue
              value={searchValue}
              placeholder="Select company"
              notFoundContent={
                this.props.fetching ? (
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
              onSearch={this.fetchUser}
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
  fetching: loading.effects['contact/searchCompanyByName'],
}))(Create);

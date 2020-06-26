import { Form, Input, Button, Spin, Select } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
import styles from './style.less';

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
          <h2> Create contact</h2>
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
            initialValue={
              this.props.location.state === undefined ? '' : this.props.location.state.name
            }
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
            initialValue={
              this.props.location.state === undefined ? '' : this.props.location.state.phone
            }
          >
            <Input />
          </Form.Item>

          <Form.Item name={['contact', 'email']} label="Email">
            <Input />
          </Form.Item>

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

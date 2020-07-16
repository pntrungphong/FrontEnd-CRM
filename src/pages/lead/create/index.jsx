import { Form, Input, message, Button, Spin, Select, Upload } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import debounce from 'lodash/debounce';
import { getToken } from '../../../utils/authority';
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;
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

  onUpload = {
    name: 'file',
    action: 'http://api-harmonia.geekup.io/file',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    props: this.props,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);

        this.props.dispatch({
          type: 'lead/saveListFile',
          payload: info.fileList,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  onFinish = (values) => {
    this.props.dispatch({
      type: 'lead/fullCreate',
      payload: { ...values, listFile: this.props.lead.listFile },
    });
  };

  fetchCompany = (value) => {
    this.props.dispatch({
      type: 'lead/handleSearchChange',
      payload: { value: this.props.lead.searchValue, listCompany: [] },
    });

    this.props.dispatch({
      type: 'lead/searchCompanyByName',
      payload: { value },
    });
  };

  fetchContact = (value) => {
    this.props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value: this.props.lead.searchContactValue, listContact: [] },
    });

    this.props.dispatch({
      type: 'lead/searchContactByName',
      payload: { value },
    });
  };

  createCompany = () => {
    history.push({
      pathname: '/company/create',
    });
  };

  createContact = () => {
    history.push({
      pathname: '/contact/create',
    });
  };

  handleChange = (value) => {
    this.props.dispatch({
      type: 'lead/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  handleContactChange = (value) => {
    this.props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  handleRelationChange = (value) => {
    this.props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  render() {
    const { searchValue, listCompany, searchContactValue, listContact } = this.props.lead;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> CREATE LEAD</h2>
        </div>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['lead', 'name']}
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
            name={['lead', 'rank']}
            label="Rank"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="0">A</Option>
              <Option value="1">B</Option>
              <Option value="2">C</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['lead', 'company']}
            label="Company"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              labelInValue
              tokenSeparators={[',']}
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
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={['lead', 'contact']}
            label="Contact"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              mode="multiple"
              labelInValue
              tokenSeparators={[',']}
              value={searchContactValue}
              placeholder="Select contact"
              notFoundContent={
                this.props.fetchingContact ? (
                  <Spin size="small" />
                ) : (
                  <p>
                    <Button type="text" onClick={this.createContact}>
                      New
                    </Button>
                  </p>
                )
              }
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleContactChange}
            >
              {listContact.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={['lead', 'relation']}
            label="Related To"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              mode="multiple"
              labelInValue
              tokenSeparators={[',']}
              value={searchContactValue}
              notFoundContent={
                this.props.fetchingContact ? (
                  <Spin size="small" />
                ) : (
                  <p>
                    <Button type="text" onClick={this.createContact}>
                      New
                    </Button>
                  </p>
                )
              }
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleRelationChange}
            >
              {listContact.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['lead', 'tag']} label="Tag">
            <Select mode="tags" style={{ width: '100%' }} labelInValue tokenSeparators={[',']}>
              <Option key="1">String</Option>
              <Option key="6">tesst</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['lead', 'brief']} label="Brief">
            <Upload {...this.onUpload}>
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name={['lead', 'description']}
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={4} />
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
export default connect(({ lead, loading, searchModel }) => ({
  lead,
  searchModel,
  submitting: loading.effects['lead/fullCreate'],
  fetchingCompany: loading.effects['lead/searchCompanyByName'],
  fetchingContact: loading.effects['lead/searchContactByName'],
}))(Create);

import { Form, Input, message, Button, Spin, Select, Upload, Divider, Radio } from 'antd';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { getToken } from '../../../utils/authority';
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

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);
class Create extends React.Component {
  dispatchType = {
    contact: 'contact/quickCreateContact',
    relation: 'contact/quickCreateContact',
    company: 'company/quickCreateCompany',
  };

  constructor(props) {
    super(props);
    this.fetchCompany = debounce(this.fetchCompany, 1000);
    this.fetchContact = debounce(this.fetchContact, 1000);

    this.inputValue = '';
    this.formRef = React.createRef();
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
    this.inputValue = value;
  };

  fetchContact = (value) => {
    this.props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value: this.props.lead.searchValue, listContact: [] },
    });

    this.props.dispatch({
      type: 'lead/searchContactByName',
      payload: { value },
    });

    this.inputValue = value;
  };

  formatFieldValue = (field, listValue) => {
    if (field === 'contact') return { contact: [...listValue] };
    if (field === 'relation') return { relation: [...listValue] };
    if (field === 'company') return { company: [...listValue] };
    return { bug: [...listValue] };
  };

  quickCreate = async (field) => {
    const searchValue = this.inputValue;
    this.inputValue = '';
    const value = await this.props.dispatch({
      type: this.dispatchType[field],
      payload: {
        name: searchValue,
      },
    });
    let listValue = this.formRef.current.getFieldValue(field);
    if (!listValue) listValue = [];
    listValue.push(value);
    const updateValue = this.formatFieldValue(field, listValue);
    this.formRef.current.setFieldsValue(updateValue);
  };

  handleChange = (value) => {
    this.inputValue = '';
    this.props.dispatch({
      type: 'lead/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  handleContactChange = (value) => {
    this.inputValue = '';
    this.props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  render() {
    const { searchValue, listCompany, listContact } = this.props.lead;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}> CREATE LEAD</h2>
        </div>

        <Form
          {...layout}
          ref={this.formRef}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name="name" label="Lead Name" rules={[{ required: true, min: 4 }]}>
            <Input />
          </Form.Item>

          <Form.Item name="company" label="Company" rules={[{ required: true }]}>
            <Select
              labelInValue
              autoClearSearchValue
              mode="multiple"
              value={searchValue}
              notFoundContent={iff(
                this.props.fetchingCompany,
                <Spin size="small" />,
                this.inputValue !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDevider} />
                    <h3
                      onClick={() => this.quickCreate('company')}
                      className={styles.createNewContact}
                    >
                      Create "{this.inputValue}" as company
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchCompany}
              onChange={this.handleChange}
            >
              {listCompany.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="contact" label="Contact" rules={[{ required: true }]}>
            <Select
              labelInValue
              autoClearSearchValue
              mode="multiple"
              value={searchValue}
              notFoundContent={iff(
                this.props.fetchingContact,
                <Spin size="small" />,
                this.inputValue !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDevider} />
                    <h3
                      onClick={() => this.quickCreate('contact')}
                      className={styles.createNewContact}
                    >
                      Create "{this.inputValue}" as contact
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleContactChange}
            >
              {listContact.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="relation" label="Related To">
            <Select
              mode="multiple"
              autoClearSearchValue
              labelInValue
              value={searchValue}
              notFoundContent={iff(
                this.props.fetchingContact,
                <Spin size="small" />,
                this.inputValue !== '' ? (
                  <>
                    <div className={styles.resultNotFound}>No results found</div>
                    <Divider className={styles.customDevider} />
                    <h3
                      onClick={() => this.quickCreate('relation')}
                      className={styles.createNewContact}
                    >
                      Create "{this.inputValue}" as contact
                    </h3>
                  </>
                ) : (
                  ''
                ),
              )}
              filterOption={false}
              onSearch={this.fetchContact}
              onChange={this.handleContactChange}
            >
              {listContact.map((d) => (
                <Option key={d.key}>{d.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="tag" label="Tag">
            <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
              <Option key="Coffee shop">Coffee shop</Option>
              <Option key="Loyalty">Loyalty</Option>
              <Option key="Technical">Technical</Option>
              <Option key="Financial">Financial</Option>
              <Option key="Stock">Stock</Option>
              <Option key="Mobile app">Mobile app</Option>
            </Select>
          </Form.Item>

          <Form.Item name="rank" label="Rank" rules={[{ required: true }]}>
            <Radio.Group className={styles.customRadioRank}>
              <Radio value="0">A</Radio>
              <Radio value="1">B</Radio>
              <Radio value="2">C</Radio>
              <Radio value="3">D</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="reason" label="Rank Explanation" rules={[{ required: true, min: 10 }]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, min: 10 }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="note" label="Note" rules={[{ required: true, min: 10 }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item name="brief" label="Brief">
            <Upload {...this.onUpload}>
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrappercol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={this.props.submitting}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default connect(({ lead, loading }) => ({
  lead,
  submitting: loading.effects['lead/fullCreate'],
  fetchingCompany: loading.effects['lead/searchCompanyByName'],
  fetchingContact: loading.effects['lead/searchContactByName'],
}))(Create);

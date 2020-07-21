import { Form, Input, message, Button, Spin, Select, Upload } from 'antd';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { useMount, useUnmount } from 'ahooks';
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

const Update = connect(({ lead, tag, loading }) => ({
  lead,
  tag,
  submitting: loading.effects['lead/update'],
  querying: loading.effects['lead/loading'],
  fetchingCompany: loading.effects['lead/searchCompanyByName'],
  fetchingContact: loading.effects['lead/searchContactByName'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'lead/loading',
      payload: { id: props.match.params.id },
    });
  });
  useUnmount(() => {
    props.dispatch({
      type: 'tag/getTag',
    });
    props.dispatch({
      type: 'lead/cleanData',
    });
  });

  const onFinish = (values) => {
    props.dispatch({
      type: 'lead/update',
      payload: { ...values, listFile: props.lead.listFile },
    });
  };
  const [form] = Form.useForm();

  let fetchCompany = (value) => {
    props.dispatch({
      type: 'lead/handleSearchChange',
      payload: { value: props.lead.searchValue, listCompany: [] },
    });

    props.dispatch({
      type: 'lead/searchCompanyByName',
      payload: { value },
    });
  };

  let fetchContact = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value: props.lead.searchContactValue, listContact: [] },
    });

    props.dispatch({
      type: 'lead/searchContactByName',
      payload: { value },
    });
  };

  const onUpload = {
    name: 'file',
    action: 'http://api-harmonia.geekup.io/file',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    props,
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
  fetchCompany = debounce(fetchCompany, 1000);
  fetchContact = debounce(fetchContact, 1000);

  const handleChange = (value) => {
    props.dispatch({
      type: 'lead/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  const handleContactChange = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  const handleRelationChange = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  if (props.lead.data === undefined) {
    return <Spin />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.title}> Update lead </h2>
      </div>

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          lead: {
            name: props.lead.data.name,
            rank: props.lead.data.rank,
            company: props.lead.data.company,
            contact: props.lead.data.contact,
            relation: props.lead.data.relation,
            tag: props.lead.data.tag,
            brief: props.lead.data.brief,
            description: props.lead.data.description,
          },
        }}
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
            value={props.lead.searchValue}
            placeholder="Select company"
            notFoundContent={
              props.fetchingCompany ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text">Create Company</Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchCompany}
            onChange={handleChange}
          >
            {props.lead.listCompany.map((d) => (
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
            value={props.lead.searchContactValue}
            placeholder="Select contact"
            notFoundContent={
              props.fetchingContact ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text">New</Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchContact}
            onChange={handleContactChange}
          >
            {props.lead.listContact.map((d) => (
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
            value={props.lead.searchContactValue}
            notFoundContent={
              props.fetchingContact ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text">New</Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchContact}
            onChange={handleRelationChange}
          >
            {props.lead.listContact.map((d) => (
              <Option key={d.key}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={['lead', 'tag']} label="Tag">
          <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
            <Option key="1">String</Option>
            <Option key="6">tesst</Option>
          </Select>
        </Form.Item>
        <Form.Item name={['lead', 'brief']} label="Brief">
          <Upload onUpload={onUpload}>
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
          <Button type="primary" htmlType="submit" loading={props.submitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Update;

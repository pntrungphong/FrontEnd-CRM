import React, { useState } from 'react';
import { Form, Input, Spin, Select, Divider } from 'antd';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { useUnmount } from 'ahooks';
import styles from './style.less';
import CustomUploadFile from './customuploadfile';

const { TextArea } = Input;
const { Option } = Select;

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);
const UpdateLeadInformationForm = connect(({ lead, tag, loading }) => ({
  lead,
  tag,
  submitting: loading.effects['lead/update'],
  querying: loading.effects['lead/loading'],
  fetchingCompany: loading.effects['lead/searchCompanyByName'],
  fetchingContact: loading.effects['lead/searchContactByName'],
}))((props) => {
  useUnmount(() => {
    props.dispatch({
      type: 'tag/getTag',
    });
    props.dispatch({
      type: 'lead/cleanLeadData',
    });
  });

  const [inputValue, setInputValue] = useState('');

  let fetchContact = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value: props.lead.searchValue, listContact: [] },
    });
    props.dispatch({
      type: 'lead/searchContactByName',
      payload: { value },
    });
    setInputValue(value);
  };

  fetchContact = debounce(fetchContact, 1000);

  const dispatchType = {
    contact: 'contact/quickCreateContact',
    relation: 'contact/quickCreateContact',
  };
  const formatFieldValue = (field, listValue) => {
    if (field === 'contact') return { lead: { contact: [...listValue] } };
    if (field === 'relation') return { lead: { relation: [...listValue] } };
    return {};
  };
  const quickCreate = async (field) => {
    const searchValue = inputValue;
    setInputValue('');
    const value = await props.dispatch({
      type: dispatchType[field],
      payload: {
        name: searchValue,
      },
    });
    let listValue = props.form.getFieldValue(['lead', field]);
    if (!listValue) listValue = [];
    listValue.push(value);
    const updateValue = formatFieldValue(field, listValue);
    props.form.setFieldsValue(updateValue);
  };

  function NotFoundComponent(data) {
    return (
      <>
        <div className={styles.resultNotFound}>No results found</div>
        <Divider className={styles.customDevider} />
        <h3 onClick={() => quickCreate(data.field)} className={styles.createNewContact}>
          Create "{data.inputValue}" as {data.field}
        </h3>
      </>
    );
  }
  const handleContactChange = (value) => {
    setInputValue('');
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>Lead Information</p>
      </div>

      <Form.Item name={['lead', 'name']} label="Name" rules={[{ required: true, min: 4 }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['lead', 'company']} label="Company">
        <Select
          labelInValue
          aria-readonly
          disabled
          mode="multiple"
          placeholder="Select a company"
          value={props.lead.searchValue}
        />
      </Form.Item>
      <Form.Item name={['lead', 'contact']} label="Contact" rules={[{ required: true }]}>
        <Select
          mode="multiple"
          autoClearSearchValue
          labelInValue
          value={props.lead.searchValue}
          placeholder="Select contact"
          notFoundContent={iff(
            props.fetchingContact,
            <Spin size="small" />,
            inputValue !== '' ? <NotFoundComponent inputValue={inputValue} field="contact" /> : '',
          )}
          filterOption={false}
          onSearch={fetchContact}
          onChange={handleContactChange}
        >
          {props.lead.listContact.map((d) => (
            <Option key={d.key}>{d.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={['lead', 'relation']} label="Related To" rules={[{ required: true }]}>
        <Select
          mode="multiple"
          autoClearSearchValue
          labelInValue
          value={props.lead.searchValue}
          notFoundContent={iff(
            props.fetchingContact,
            <Spin size="small" />,
            inputValue !== '' ? <NotFoundComponent inputValue={inputValue} field="relation" /> : '',
          )}
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
        name={['lead', 'description']}
        label="Description"
        rules={[
          {
            required: true,
            min: 10,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name={['lead', 'tag']} label="Tag">
        <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
          {/* <Option key="1">String</Option>
            <Option key="6">tesst</Option> */}
        </Select>
      </Form.Item>
      <Form.Item name={['lead', 'brief']} label="Brief">
        <CustomUploadFile dataIndex="brief" />
      </Form.Item>
    </>
  );
});
export default UpdateLeadInformationForm;

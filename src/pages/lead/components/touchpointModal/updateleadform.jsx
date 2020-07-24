import React, { useState } from 'react';
import { Form, Input, Radio, Spin, Select, Divider } from 'antd';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { useUnmount, useMount } from 'ahooks';
import styles from './style.less';
import CustomUploadFile from './customuploadfile';

const { TextArea } = Input;
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrappercol: { span: 16 },
};
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
  useMount(() => {
    props.dispatch({
      type: 'lead/loading',
      payload: { id: props.leadId },
    });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'tag/getTag',
    });
    props.dispatch({
      type: 'lead/cleanLeadData',
    });
  });
  const [form] = Form.useForm();
  const [rankReason, setRankReason] = useState(true);
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
    let listValue = form.getFieldValue(['lead', field]);
    if (!listValue) listValue = [];
    listValue.push(value);
    const updateValue = formatFieldValue(field, listValue);
    form.setFieldsValue(updateValue);
  };

  const onFinish = (values) => {
    const returnValue = values;
    returnValue.id = props.leadId;
    props.dispatch({
      type: 'lead/update',
      payload: { ...returnValue },
    });
    props.closeModal();
  };

  const onBlur = () => {
    setInputValue('');
  };

  const onInputKeyDown = (event) => {
    if (event.nativeEvent.code === 'Backspace') {
      setInputValue('');
    }
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

  const onRankChange = (value) => {
    if (value.target.value !== props.lead.data.rank) {
      setRankReason(false);
    } else {
      setRankReason(true);
    }
  };

  if (props.lead.data === undefined) {
    return <Spin />;
  }
  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>Lead Information</p>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        {...layout}
        id={props.id}
        initialValues={{
          name: props.lead.data.name,
          rank: props.lead.data.rank,
          company: props.lead.data.company,
          contact: props.lead.data.contact,
          relation: props.lead.data.relation,
          tag: props.lead.data.tag,
          brief: props.lead.data.file,
          description: props.lead.data.description,
          note: props.lead.data.note,
        }}
      >
        <Form.Item
          name="name"
          label="Lead Name"
          rules={[{ required: true, message: 'Please input lead name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="contact" label="Company">
          <Select
            labelInValue
            aria-readonly
            disabled
            mode="multiple"
            placeholder="Select a company"
            value={props.lead.searchValue}
          />
        </Form.Item>
        <Form.Item
          name="contact"
          label="Contact"
          rules={[{ required: true, message: 'Please input contact' }]}
        >
          <Select
            mode="multiple"
            autoClearSearchValue
            labelInValue
            value={props.lead.searchValue}
            placeholder="Select contact"
            notFoundContent={iff(
              props.fetchingContact,
              <Spin size="small" />,
              inputValue !== '' ? (
                <NotFoundComponent inputValue={inputValue} field="contact" />
              ) : (
                ''
              ),
            )}
            filterOption={false}
            onSearch={fetchContact}
            onChange={handleContactChange}
            onBlur={onBlur}
            onInputKeyDown={onInputKeyDown}
          >
            {props.lead.listContact.map((d) => (
              <Option key={d.key}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="relation"
          label="Related To"
          rules={[{ required: true, message: 'Input relation to this lead' }]}
        >
          <Select
            mode="multiple"
            autoClearSearchValue
            labelInValue
            value={props.lead.searchValue}
            notFoundContent={iff(
              props.fetchingContact,
              <Spin size="small" />,
              inputValue !== '' ? (
                <NotFoundComponent inputValue={inputValue} field="relation" />
              ) : (
                ''
              ),
            )}
            filterOption={false}
            onSearch={fetchContact}
            onChange={handleContactChange}
            onBlur={onBlur}
            onInputKeyDown={onInputKeyDown}
          >
            {props.lead.listContact.map((d) => (
              <Option key={d.key}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="tag" label="Tag">
          <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
            {/* <Option key="1">String</Option>
            <Option key="6">tesst</Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="Rank" name="rank">
          <Radio.Group onChange={onRankChange}>
            <Radio value={0}>A</Radio>
            <Radio value={1}>B</Radio>
            <Radio value={2}>C</Radio>
            <Radio value={3}>D</Radio>
          </Radio.Group>
        </Form.Item>
        {!rankReason ? (
          <Form.Item
            name="reason"
            label="Rank Explanation"
            rules={[{ required: true, message: 'Explanation for this rank' }]}
          >
            <TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder="Add reason for the ranking"
            />
          </Form.Item>
        ) : null}
        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="brief" label="Brief">
          <CustomUploadFile dataIndex="brief" />
        </Form.Item>
      </Form>
    </>
  );
});
export default UpdateLeadInformationForm;

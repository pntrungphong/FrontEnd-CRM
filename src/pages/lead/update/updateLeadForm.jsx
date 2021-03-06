import React, { useState, useRef } from 'react';
import { Form, Input, Radio, Spin, Select } from 'antd';
import { connect } from 'umi';
import { useMount } from 'ahooks';
import styles from './style.less';
import QuickCreate, { CreateType } from '../../common/quickCreate';

const { TextArea } = Input;
const layout = {
  labelCol: { span: 5 },
};

const UpdateLeadInformationForm = connect(({ lead, tag, loading }) => ({
  lead,
  tag,
  submitting: loading.effects['lead/update'],
  querying: loading.effects['lead/get'],
}))((props) => {
  useMount(() => {
    props.dispatch({
      type: 'tag/getTag',
    });
  });

  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [rankReason, setRankReason] = useState(true);

  const onFinish = (values) => {
    const returnValue = values;
    returnValue.id = props.leadId;
    props
      .dispatch({
        type: 'lead/update',
        payload: { ...returnValue },
      })
      .then(() => {
        props
          .dispatch({
            type: 'lead/get',
            payload: { id: props.leadId },
          })
          .then(() => {
            props.dispatch({ type: 'lead/getListWithLane', payload: {} });
          });
      });
    props.closeModal();
  };

  const onRankChange = (value) => {
    if (value.target.value !== props.lead.detail.rank) {
      setRankReason(false);
    } else {
      setRankReason(true);
    }
  };

  if (props.lead.detail === undefined) {
    return <Spin />;
  }
  return (
    <>
      <Form
        form={form}
        ref={formRef}
        onFinish={onFinish}
        {...layout}
        destroyOnClose
        id={props.id}
        onValuesChange={props.enableButton}
        initialValues={{
          name: props.lead.detail.name,
          rank: props.lead.detail.rank,
          company: props.lead.detail.company.label,
          contact: props.lead.detail.contact,
          relation: props.lead.detail.relation,
          tag: props.lead.detail.tag,
          brief: props.lead.detail.file,
          description: props.lead.detail.description,
          note: props.lead.detail.note,
        }}
      >
        <Form.Item
          name="name"
          label="Lead Name"
          rules={[{ required: true, message: 'Please input lead name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="company" label="Company">
          <Input readOnly disabled />
        </Form.Item>

        <Form.Item
          name="contact"
          label="Contact"
          rules={[{ required: true, message: 'Please input contact!' }]}
        >
          <QuickCreate
            formRef={formRef}
            placeholder="Type and select contact"
            createType={CreateType.CONTACT}
            dataIndex="contact"
          />
        </Form.Item>
        <Form.Item name="relation" label="Related To">
          <QuickCreate
            formRef={formRef}
            placeholder="Type and select contact"
            createType={CreateType.CONTACT}
            dataIndex="relation"
          />
        </Form.Item>
        <Form.Item name="tag" label="Tag">
          <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']} />
        </Form.Item>
        <Form.Item label="Rank" name="rank" rules={[{ required: true, message: 'Choose rank' }]}>
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
            rules={[{ required: true, message: 'Please input explanation for this rank' }]}
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
      </Form>
    </>
  );
});
export default UpdateLeadInformationForm;

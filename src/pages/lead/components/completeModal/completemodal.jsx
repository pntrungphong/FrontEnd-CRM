import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';

const { TextArea } = Input;

const TouchpointCompleteForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Complete Touchpoint"
      visible={visible}
      okText="Complete"
      cancelText="Cancel"
      okButtonProps="default"
      cancelButtonProps="primary"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // console.table(values);
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="rank"
          label="Rank"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="reason"
          label="Reason"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="review"
          label="Review"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TouchpointCompleteForm;

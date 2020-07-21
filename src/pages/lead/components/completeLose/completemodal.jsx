import React from 'react';
import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

const CompleteLoseForm = ({ visible, onCreate, onCancel }) => {
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
export default CompleteLoseForm;

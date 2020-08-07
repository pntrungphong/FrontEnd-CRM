import React from 'react';
import { Form, Input, Radio, DatePicker } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import EditableTable from './tasktable';

const { TextArea } = Input;
const UpdateGeneralInformation = connect(({ task, user, lead, touchpoint }) => ({
  task,
  touchpoint,
  user,
  lead,
}))((props) => {
  return (
    <>
      {/* <Form.Item name="review" label="Review">
        <TextArea disabled rows={4} className={styles.disableField} />
      </Form.Item> */}
      <Form.Item
        className={styles.customFormItem}
        label="Lane"
        name="lane"
        rules={[
          {
            required: true,
            message: 'Please choose current lane!',
          },
        ]}
      >
        {props.status === 'Done' ? (
          <Input disabled className={styles.disableField} />
        ) : (
          <Radio.Group>
            <Radio value="Lead Management">Lead Management</Radio>
            <Radio value="Product Consulting">Product Consulting</Radio>
            <Radio value="Proposal Handling">Proposal Handling</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        className={styles.customFormItem}
        name="goal"
        label="Goal"
        rules={[
          {
            required: true,
            message: 'Please input goal',
          },
        ]}
      >
        <TextArea
          disabled={props.status === 'Done'}
          className={props.status === 'Done' ? styles.disableField : ''}
          rows={4}
        />
      </Form.Item>
      <Form.Item
        className={styles.customFormItem}
        name="meetingdate"
        label="Meeting Date"
        rules={[
          {
            required: true,
            message: 'Insert meeting date',
          },
        ]}
      >
        <DatePicker
          className={props.status === 'Done' ? styles.disableField : ''}
          disabled={props.status === 'Done'}
          format="YYYY-MM-DD HH:mm"
          showTime
        />
      </Form.Item>
      <Form.Item name="task" label="Task">
        <EditableTable
          status={props.status}
          dispatch={props.dispatch}
          lead={props.lead}
          user={props.user}
          touchpointId={props.touchpointId}
          listTask={props.listTask}
        />
      </Form.Item>
      <Form.Item className={styles.customFormItem} name="recap" label="Recap" rules={[{ min: 10 }]}>
        <TextArea
          disabled={props.status === 'Done'}
          className={props.status === 'Done' ? styles.disableField : ''}
          rows={4}
        />
      </Form.Item>
    </>
  );
});
export default UpdateGeneralInformation;

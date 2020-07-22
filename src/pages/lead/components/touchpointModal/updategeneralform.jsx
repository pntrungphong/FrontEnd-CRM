import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import Rankmodal from './rankmodal';
import EditableTable from './tasktable';

const { TextArea } = Input;

const UpdateGeneralInformation = connect(({ task, touchpoint }) => ({
  task,
  touchpoint,
}))((props) => {
  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>General Information</p>
      </div>
      <Form.Item
        name="goal"
        label="Goal"
        rules={[
          {
            required: true,
            message: 'Please input Goal',
            min: 10,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="rank" label="Rank">
        <Rankmodal rank={props.rank} />
      </Form.Item>
      <Form.Item name="task">
        <EditableTable
          dispatch={props.dispatch}
          touchpointId={props.touchpointId}
          listTask={props.listTask}
        />
      </Form.Item>

      <Form.Item
        name="meetingdate"
        label="Meeting Date"
        rules={[
          {
            required: true,
            message: 'Insert meeting date',
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DD HH:mm" showTime />
      </Form.Item>
      <Form.Item name="note" label="Note" rules={[{ min: 10 }]}>
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
});
export default UpdateGeneralInformation;

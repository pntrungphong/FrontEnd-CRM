import React from 'react';
import { Form, Input, DatePicker, Row, Col } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import Rankmodal from './rankmodal';
import EditableTable from './tasktable';

const { TextArea } = Input;

const UpdateGeneralInformation = connect(({ task, lead, touchpoint }) => ({
  task,
  touchpoint,
  lead,
}))((props) => {
  console.table(props);
  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>General Information</p>
      </div>
      {props.status === 'Done' ? (
        <Form.Item name="review" label="Review:">
          <TextArea disabled rows={4} className={styles.disableField} />
        </Form.Item>
      ) : null}
      <Form.Item
        name="goal"
        label="Goal:"
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
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="rank"
            label="Rank:"
            className={styles.customFormItem}
            labelCol={{ span: 3 }}
          >
            <Rankmodal status={props.status} rank={props.rank} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={styles.customFormItem}
            wrapperCol={{ offset: 2 }}
            name="meetingdate"
            label="Meeting Date:"
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
        </Col>
      </Row>
      <Form.Item name="note" label="Note:" rules={[{ min: 10 }]}>
        <TextArea
          disabled={props.status === 'Done'}
          className={props.status === 'Done' ? styles.disableField : ''}
          rows={4}
        />
      </Form.Item>
      <Form.Item name="task" label="Task:">
        <EditableTable
          status={props.status}
          dispatch={props.dispatch}
          lead={props.lead}
          touchpointId={props.touchpointId}
          listTask={props.listTask}
        />
      </Form.Item>
    </>
  );
});
export default UpdateGeneralInformation;

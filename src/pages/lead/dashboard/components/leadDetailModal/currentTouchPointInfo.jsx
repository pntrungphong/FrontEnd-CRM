import React, { useState } from 'react';
import { Modal, Avatar, Col, Tag, Row, Form, Button } from 'antd';
import { connect } from 'umi';
import { CalendarOutlined, CarryOutOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './style.less';
import UpdateGeneralInformation from './updategeneralform';
import { laneColor, laneTitle } from '../../../components/definition';

const getDateInfo = (meetingDate) => {
  const data = moment(meetingDate);
  let color = '#979797';
  let description = data.fromNow();
  const title = data.format('MMM DD - HH:MM');
  if (data.isSame(moment(), 'day')) {
    color = '#1890FF';
    description = 'Today';
  } else if (data.isAfter(moment(), 'day')) {
    color = '#D4B106';
  } else if (data.isBefore(moment(), 'day')) {
    color = '#A8071A';
  }
  return { color, description, title };
};

const layout = {
  labelCol: { span: 5 },
};

const CurrentTouchPointInfo = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  updateLoading: loading.effects['touchpoint/update'],
  createLoading: loading.effects['touchpoint/create'],
}))((props) => {
  const [visible, setVisible] = useState(false);
  const dateInfo = getDateInfo(props.touchPoint.meetingDate);
  const onShow = () => {
    setVisible(true);
  };

  const onFinish = (values) => {
    if (props.update)
      props
        .dispatch({
          type: 'touchpoint/update',
          payload: { touchPointId: props.touchPoint.id, ...values },
        })
        .then((response) => {
          if (response) {
            setVisible(false);
            props.dispatch({
              type: 'lead/get',
              payload: { id: props.leadId },
            });
            props.dispatch({ type: 'lead/getListWithLane', payload: {} });
          }
        });
    else
      props
        .dispatch({
          type: 'touchpoint/create',
          payload: { leadId: props.leadId, ...values },
        })
        .then((response) => {
          if (response) {
            props.onCancel();
            props.dispatch({ type: 'lead/getListWithLane', payload: {} });
          }
        });
  };

  const onCancel = () => {
    setVisible(false);
    props.dispatch({
      type: 'touchpoint/cleanData',
    });
  };

  const onDone = () => {
    props
      .dispatch({
        type: 'touchpoint/markDone',
        payload: props.touchPoint.id,
      })
      .then((response) => {
        if (response) {
          setVisible(false);
          props.dispatch({
            type: 'lead/get',
            payload: { id: props.leadId },
          });
          props.dispatch({ type: 'lead/getListWithLane', payload: {} });
        }
      });
  };

  return (
    <div>
      {console.table(props.touchPoint)}
      <Row className={styles.touchPointListTile}>
        <Col span={4}>
          <a
            className={styles.touchPointTitle}
            onClick={onShow}
          >{`TouchPoint ${props.touchPoint.order}`}</a>
        </Col>
        <Col span={3}>
          <Tag className={styles.touchPointStatus} color="#E9FAF0">
            {props.status}
          </Tag>
        </Col>
        <Col span={12}>
          <Tag className={styles.touchPointDueDate} color={dateInfo.color}>
            <CalendarOutlined /> {dateInfo.title}
          </Tag>
        </Col>
        <Col span={5}>
          <Tag color={laneColor[props.touchPoint.lane]} style={{ color: 'black' }}>
            {laneTitle[props.touchPoint.lane]}
          </Tag>
        </Col>
      </Row>
      <Row className={styles.touchPointListTile}>
        <Col span={19}>
          <div>Goal: {props.touchPoint.goal}</div>
        </Col>
        <Col span={5}>
          {props.touchPoint.task.length}
          <CarryOutOutlined />
          {props.touchPoint.task
            .filter(
              (value, index, self) => self.map((x) => x.userName).indexOf(value.userName) === index,
            )
            .map((taskItem) => {
              return (
                <Avatar
                  key={taskItem.userName}
                  className={styles.picAvatar}
                  src={taskItem.avatar}
                  size="small"
                >
                  {taskItem.userName}
                </Avatar>
              );
            })}
        </Col>
      </Row>
      <Row className={styles.touchPointListTile}>
        <Col span={19}>
          <div>Recap: {props.touchPoint.review}</div>
        </Col>
      </Row>
      <Modal
        visible={visible}
        destroyOnClose
        width={800}
        title={
          <div className={styles.header}>
            <p className={styles.title}>General Information</p>
          </div>
        }
        style={{ top: 0, background: 'white' }}
        bodyStyle={{
          height: '71.5vh',
          overflowY: 'scroll',
          paddingTop: 0,
          scrollBehavior: 'smooth',
        }}
        className={styles.customModal}
        onCancel={onCancel}
        footer={[
          <Button
            key="done"
            hidden={props.status === 'Done'}
            type="ghost"
            htmlType="reset"
            onClick={onDone}
          >
            Done
          </Button>,
          <Button key="cancel" type="ghost" htmlType="reset" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            hidden={props.status === 'Done'}
            loading={props.updateLoading === true || props.createLoading === true}
            key="submit"
            form="touchPointForm"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>,
        ]}
      >
        <Form
          {...layout}
          onFinish={onFinish}
          id="touchPointForm"
          initialValues={{
            goal: props.touchPoint.goal,
            meetingdate: props.touchPoint.meetingDate,
            note: props.touchPoint.note,
            recap: props.touchPoint.review,
            lane: props.touchPoint.lane,
            task: props.touchPoint.task,
          }}
        >
          <UpdateGeneralInformation
            status={props.status}
            touchpointId={props.touchPoint ? props.touchPoint.id : undefined}
          />
        </Form>
      </Modal>
    </div>
  );
});

export default CurrentTouchPointInfo;

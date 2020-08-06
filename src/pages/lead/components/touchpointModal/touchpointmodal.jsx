import React, { useState } from 'react';
import { Modal, Avatar, Col, Tag, Row, Form, Button } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import styles from './style.less';
import UpdateGeneralInformation from './updategeneralform';

const Lane = {
  PC: 'Product Consulting',
  LM: 'Lead Management',
  PH: 'Proposal Handling',
};

const layout = {
  labelCol: { span: 5 },
};

const TouchPointModal = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  updateLoading: loading.effects['touchpoint/update'],
}))((props) => {
  const [visible, setVisible] = useState(false);

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
          }
        });
    else
      props.dispatch({
        type: 'touchpoint/create',
        payload: { leadId: props.leadId, ...values },
      });
  };

  const onCancel = () => {
    setVisible(false);
    props.dispatch({
      type: 'touchpoint/cleanData',
    });
  };

  return (
    <div>
      {props.update ? (
        <Row className={styles.touchPointListTile}>
          <Col span={5}>
            <a onClick={onShow}>{`TouchPoint ${props.touchPoint.order}`}</a>
          </Col>
          <Col span={4}>
            <div className={styles.viewNote}>View recap</div>
          </Col>
          <Col span={4}>
            <div>
              {props.touchPoint.meetingDate
                ? moment(props.touchPoint.meetingDate).format('DD-MM')
                : moment().format('DD-MM')}
            </div>
          </Col>
          <Col span={6}>
            {props.touchPoint.task
              .filter(
                (value, index, self) =>
                  self.map((x) => x.userName).indexOf(value.userName) === index,
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
          <Col span={5}>
            <Tag>{Lane[props.touchPoint.lane]}</Tag>
          </Col>
        </Row>
      ) : (
        <a onClick={onShow}>
          <FontAwesomeIcon icon={faEllipsisH} size="sm" />
        </a>
      )}

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
          <Button key="done" type="ghost" htmlType="reset" onClick={onCancel}>
            Done
          </Button>,
          <Button key="cancel" type="ghost" htmlType="reset" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            loading={props.updateLoading}
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
          initialValues={
            props.update
              ? {
                  goal: props.touchPoint.goal,
                  meetingdate: props.touchPoint.meetingDate,
                  note: props.touchPoint.note,
                  recap: props.touchPoint.review,
                  lane: props.touchPoint.lane,
                  task: props.touchPoint.task,
                }
              : {}
          }
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

export default TouchPointModal;

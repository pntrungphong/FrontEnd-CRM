import React, { useState } from 'react';
import { Modal, Avatar, Col, Tag, Popover, Row, Form, Button } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import styles from './style.less';
import UpdateGeneralInformation from './updategeneralform';

const laneColor = {
  'Lead Management': '#D3ADF7',
  'Product Consulting': '#B5F5EC',
  'Proposal Handling': '#FFCCC7',
};

const layout = {
  labelCol: { span: 5 },
};

const TouchPointModal = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  updateLoading: loading.effects['touchpoint/update'],
  createLoading: loading.effects['touchpoint/create'],
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
            props.dispatch({
              type: 'lead/getList',
              payload: {
                page: 1,
                searchValue: props.lead.searchValue,
                status: props.lead.status,
              },
            });
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
            props.dispatch({
              type: 'lead/getList',
              payload: {
                page: 1,
                searchValue: props.lead.searchValue,
                status: props.lead.status,
              },
            });
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
          props.dispatch({
            type: 'lead/getList',
            payload: {
              page: 1,
              searchValue: props.lead.searchValue,
              status: props.lead.status,
            },
          });
        }
      });
  };

  return (
    <div>
      {props.update ? (
        <Row className={styles.touchPointListTile}>
          <Col span={5}>
            <a
              className={styles.touchPointName}
              onClick={onShow}
            >{`Touchpoint ${props.touchPoint.order}`}</a>
          </Col>
          <Col span={4}>
            <Popover
              content={
                props.touchPoint.review !== '' ? (
                  <div className={styles.popoverRecap}>{props.touchPoint.review}</div>
                ) : (
                  'Nothing to view'
                )
              }
            >
              <div className={styles.viewNote}>View recap</div>
            </Popover>
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
            <Tag color={laneColor[props.touchPoint.lane]}>{props.touchPoint.lane}</Tag>
          </Col>
        </Row>
      ) : (
        <Button onClick={onShow}>Add new touchpoint</Button>
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
          props.update ? (
            <Button
              key="done"
              hidden={props.status === 'Done'}
              type="ghost"
              htmlType="reset"
              onClick={onDone}
            >
              Done
            </Button>
          ) : null,
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

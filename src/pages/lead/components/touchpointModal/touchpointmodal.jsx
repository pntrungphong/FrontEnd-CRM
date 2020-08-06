import React, { useState } from 'react';
import { Modal, Spin, Form, Button } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import UpdateGeneralInformation from './updategeneralform';

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
    if (props.update)
      props.dispatch({
        type: 'touchpoint/get',
        payload: { id: props.touchPointId, leadId: props.leadId },
      });
  };

  const onFinish = (values) => {
    console.table(values);
  };

  const onCancel = () => {
    setVisible(false);
    props.dispatch({
      type: 'touchpoint/cleanData',
    });
  };

  return (
    <div>
      <a onClick={onShow}>
        <FontAwesomeIcon icon={faEllipsisH} size="sm" />
      </a>
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
        {props.touchpoint.data || props.update === false ? (
          <Form
            {...layout}
            onFinish={onFinish}
            id="touchPointForm"
            initialValues={
              props.update
                ? {
                    goal: props.touchpoint.data.goal,
                    meetingdate: props.touchpoint.data.meetingdate,
                    note: props.touchpoint.data.note,
                    recap: props.touchpoint.data.review,
                  }
                : {}
            }
          >
            <UpdateGeneralInformation
              status={props.status}
              dispatch={props.dispatch}
              touchpointId={props.touchpointId}
              listTask={props.touchpoint.data ? props.touchpoint.data.task : []}
            />
          </Form>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
});

export default TouchPointModal;

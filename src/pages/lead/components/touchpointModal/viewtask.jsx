import React, { useState } from 'react';
import { Modal, Spin, Tag } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import EditableTable from './tasktable';

const ViewTaskTable = connect(({ task, lead, touchpoint }) => ({
  task,
  touchpoint,
  lead,
}))((props) => {
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
    props.dispatch({
      type: 'touchpoint/get',
      payload: { id: props.touchpointId, leadId: props.leadId },
    });
    props.dispatch({
      type: 'lead/get',
      payload: { id: props.leadId },
    });
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <a onClick={onShow}>
        View More
        <Tag className={styles.viewMoreTaskTag}>+{props.listTask.length - 3}</Tag>
      </a>
      <Modal
        title="Tasks"
        visible={visible}
        destroyOnClose
        width={800}
        style={{ top: 10, background: 'white' }}
        bodyStyle={{ height: '75vh', overflowY: 'scroll', paddingTop: 20 }}
        className={styles.customModal}
        onCancel={onCancel}
        footer={null}
      >
        {props.touchpoint.data && props.lead.detail ? (
          <div>
            <EditableTable
              dispatch={props.dispatch}
              touchpointId={props.touchpointId}
              listTask={props.listTask}
            />
          </div>
        ) : (
          <Spin className={styles.customSpin} />
        )}
      </Modal>
    </div>
  );
});
export default ViewTaskTable;

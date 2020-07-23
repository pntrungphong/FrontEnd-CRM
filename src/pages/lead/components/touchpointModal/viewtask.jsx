import React, { useState } from 'react';
import { Modal, Spin } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import EditableTable from './tasktable';

const ViewTaskTable = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  loading: loading.effects['lead/createTouchpoint'],
}))((props) => {
  const [visible, setVisible] = useState(false);
  // const formRef = React.createRef();

  const onShow = () => {
    setVisible(true);
    props.dispatch({
      type: 'touchpoint/get',
      payload: { id: props.touchpointId, leadId: props.leadId },
    });
    props.dispatch({
      type: 'lead/loading',
      payload: { id: props.leadId },
    });
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <a onClick={onShow}>View More</a>
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
        {props.touchpoint.data && props.lead.data ? (
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

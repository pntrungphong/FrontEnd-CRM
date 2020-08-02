import React, { useState } from 'react';
import { Modal, Spin, Button } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import UpdateTouchpointForm from './updateTouchpointForm';
import CustomHeader from './customHeaderModal';
import MarkDoneModal from '../markDoneForm/markDoneTouchPoint';

const TouchPointCreateForm = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  updateLoading: loading.effects['touchpoint/update'],
}))((props) => {
  const [visible, setVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const onShow = () => {
    setVisible(true);
    setDisableButton(true);
    props.dispatch({
      type: 'touchpoint/get',
      payload: { id: props.touchpointId, leadId: props.leadId },
    });
    props.dispatch({
      type: 'lead/get',
      payload: { id: props.leadId },
    });
  };

  const enableButton = () => {
    if (disableButton) setDisableButton(false);
  };

  const onCancel = () => {
    setVisible(false);
    props.dispatch({
      type: 'task/cleanData',
    });
    props.dispatch({
      type: 'touchpoint/cleanData',
    });
  };

  return (
    <div>
      <a onClick={onShow} className={styles.updateTouchPointButton}>
        <FontAwesomeIcon icon={faEllipsisH} size="sm" />
      </a>
      <Modal
        title={
          <CustomHeader
            company={props.company}
            status={props.status}
            rank={props.rank}
            name={props.name}
            goal={props.goal}
            actualdate={props.actualdate}
            touchpoint={props.touchpoint.data}
            lead={props.lead}
            dispatch={props.dispatch}
            leadId={props.leadId}
            touchpointId={props.touchpointId}
            reloadData={onCancel}
          />
        }
        visible={visible}
        destroyOnClose
        width={800}
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
          <MarkDoneModal
            form={props.form}
            goal={props.goal}
            dispatch={props.dispatch}
            status={props.status}
            lead={props.lead}
            actualdate={props.actualdate}
            rank={props.rank}
            leadId={props.leadId}
            touchpointId={props.touchpointId}
            reloadData={onCancel}
          />,
          <Button
            key="cancel"
            type="ghost"
            htmlType="reset"
            onClick={onCancel}
            form={props.touchpointId}
          >
            Cancel
          </Button>,
          <Button
            loading={props.updateLoading}
            disabled={props.status === 'Done' || disableButton}
            form={props.touchpointId}
            key="submit"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        {(props.touchpoint.data && props.lead.detail) || props.updateLoading ? (
          <UpdateTouchpointForm
            fileTouchPoint={props.fileTouchPoint}
            leadId={props.lead.detail.id}
            onCancel={onCancel}
            enableButton={enableButton}
            touchpoint={props.touchpoint}
            lead={props.lead}
            rank={props.rank}
            touchpointId={props.touchpointId}
            status={props.status}
          />
        ) : (
          <Spin className={styles.customSpin} />
        )}
      </Modal>
    </div>
  );
});
export default TouchPointCreateForm;

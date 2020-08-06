import React, { useState } from 'react';
import { Modal, Spin, Button } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useUnmount } from 'ahooks';
import styles from './style.less';
import LeadForm from './leadForm';
import CustomHeader from './customHeaderModal';
import MarkDoneModal from '../markDoneForm/markDoneTouchPoint';

const TouchPointCreateForm = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  getLoading: loading.effects['lead/get'],
}))((props) => {
  const [visible, setVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const onShow = () => {
    setVisible(true);
    setDisableButton(true);
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
  };

  useUnmount(() => {
    props.dispatch({
      type: 'lead/cleanData',
    });
  });

  return (
    <div>
      <a onClick={onShow} className={styles.updateTouchPointButton}>
        <FontAwesomeIcon icon={faEllipsisH} size="sm" />
      </a>
      <Modal
        title={<CustomHeader company={props.company} status={props.status} name={props.name} />}
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
        {!props.lead.detail || props.getLoading === true ? (
          <Spin className={styles.customSpin} />
        ) : (
          <LeadForm
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
        )}
      </Modal>
    </div>
  );
});
export default TouchPointCreateForm;

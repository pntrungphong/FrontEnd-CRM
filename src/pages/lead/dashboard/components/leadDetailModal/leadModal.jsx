import React, { useState } from 'react';
import { Modal, Spin, Button } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import LeadForm from './leadForm';
import CustomHeader from './customHeaderModal';
import MarkDoneModal from '../../../components/markDoneForm/markDoneTouchPoint';

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);
const TouchPointCreateForm = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  getLoading: loading.effects['lead/get'],
}))((props) => {
  const [visible, setVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const onShow = () => {
    props.dispatch({
      type: 'lead/get',
      payload: { id: props.leadDetail.id },
    });
    setVisible(true);
    setDisableButton(true);
  };

  const enableButton = () => {
    if (disableButton) setDisableButton(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Spin
        spinning={visible && (!props.lead.detail || props.getLoading === true)}
        className={styles.customSpin}
      >
        {iff(
          !visible,
          '',
          !props.lead.detail || props.getLoading === true ? (
            <Spin className={styles.customSpin} />
          ) : (
            <Modal
              title={
                <CustomHeader
                  company={props.lead.detail.company}
                  status={props.leadDetail.status}
                  name={props.leadDetail.name}
                />
              }
              visible={visible}
              destroyOnClose
              width={800}
              style={{ top: 0, background: 'white' }}
              bodyStyle={{
                height: '78vh',
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
                  key="MarkDoneModal"
                />,
                <Button
                  key="cancel"
                  type="ghost"
                  htmlType="reset"
                  onClick={onCancel}
                  form={props.currentTouchPoint.id}
                >
                  Cancel
                </Button>,
                <Button
                  loading={props.updateLoading}
                  disabled={props.status === 'Done' || disableButton}
                  form={props.currentTouchPoint.id}
                  key="submit"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>,
              ]}
            >
              <LeadForm
                fileTouchPoint={props.fileTouchPoint}
                leadId={props.lead.detail.id}
                onCancel={onCancel}
                enableButton={enableButton}
                touchpoint={props.touchpoint}
                lead={props.leadDetail}
                rank={props.leadDetail.rank}
                touchpointId={props.currentTouchPoint.id}
                status={props.leadDetail.status}
              />
            </Modal>
          ),
        )}
        <div onClick={() => onShow()}>{props.children}</div>
      </Spin>
    </div>
  );
});
export default TouchPointCreateForm;

import React, { useState } from 'react';
import { Modal, Spin } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import LeadForm from './leadForm';
import CustomHeader from './customHeaderModal';

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);
const TouchPointCreateForm = connect(({ task, lead, touchpoint, loading }) => ({
  task,
  touchpoint,
  lead,
  getLoading: loading.effects['lead/get'],
}))((props) => {
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    props.dispatch({
      type: 'lead/get',
      payload: { id: props.leadDetail.id },
    });
    setVisible(true);
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
                  onHov={props.leadDetail.onHov}
                  currentTouchPoint={props.currentTouchPoint}
                  leadId={props.leadDetail.id}
                  currentStatus={props.currentStatus}
                  currentType={props.currentType}
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
              footer={[]}
            >
              <LeadForm
                fileTouchPoint={props.fileTouchPoint}
                leadId={props.lead.detail.id}
                onCancel={onCancel}
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

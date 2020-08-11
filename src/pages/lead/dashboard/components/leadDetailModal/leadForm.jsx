import React from 'react';
import { Form, Col, Row } from 'antd';
import { connect } from 'umi';
import LeadInfomation from './leadInfomation';
import TouchPointModal from './touchpointmodal';
import CustomUploadFile from '../../../components/fileComponent/customuploadfile';
import styles from './style.less';

import CurrentTouchPointInfo from './currentTouchPointInfo';
import UpdateLead from '../../../update/updateLeadModal';

class LeadForm extends React.Component {
  onPlaning = (values) => {
    const returnValue = values;
    returnValue.leadId = this.props.leadId;
    returnValue.touchpointId = this.props.touchpointId;
    returnValue.order = this.props.touchpoint.data.order;
    if (values.rank.rank && values.rank.rank === this.props.rank) {
      returnValue.rank = this.props.rank;
    }

    this.props
      .dispatch({
        type: 'touchpoint/update',
        payload: { ...returnValue },
      })
      .then(() => {
        this.props.dispatch({
          type: 'lead/getList',
          payload: {
            page: 1,
            searchValue: this.props.lead.searchValue,
            status: this.props.lead.status,
          },
        });
        this.props.onCancel();
      });
  };

  render() {
    return (
      <Form
        onFinish={this.onPlaning}
        id={this.props.touchpointId}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: this.props.lead.detail.name,
          rank: this.props.lead.detail.rank,
          company: this.props.lead.detail.company,
          contact: this.props.lead.detail.contact,
          tag: this.props.lead.detail.tag,
          relation: this.props.lead.detail.relation,
          brief: this.props.lead.detail.file,
          description: this.props.lead.detail.description,
          file: this.props.lead.detail.touchPointFile,
        }}
      >
        <div id="general">
          {this.props.lead.detail.touchPoint.length !== 0 &&
          this.props.lead.detail.touchPoint[this.props.lead.detail.touchPoint.length - 1].order >
            0 ? (
            <CurrentTouchPointInfo
              update
              status={
                this.props.lead.detail.touchPoint[this.props.lead.detail.touchPoint.length - 1]
                  .status
              }
              leadId={this.props.leadId}
              touchPoint={
                this.props.lead.detail.touchPoint[this.props.lead.detail.touchPoint.length - 1]
              }
            />
          ) : null}

          {this.props.lead.detail.touchPoint.length === 0 ||
          this.props.lead.detail.touchPoint[this.props.lead.detail.touchPoint.length - 1].status ===
            'Done' ? (
            <TouchPointModal
              status="Undone"
              onCancel={this.props.onCancel}
              leadId={this.props.leadId}
              update={false}
            />
          ) : null}
        </div>

        <div id="lead-information">
          <div className={styles.header}>
            <Row>
              <Col span="22">
                <h2 className={styles.title}>Information</h2>
              </Col>
              <Col className={styles.editButton} span="2">
                <UpdateLead onCancel={this.props.onCancel} leadId={this.props.leadId} />
              </Col>
            </Row>
          </div>
          <LeadInfomation lead={this.props.lead.detail} />
        </div>
        <div id="file">
          <div className={styles.header}>
            <h2 className={styles.title}>Attachment(s)</h2>
          </div>
          <Form.Item name="file">
            <CustomUploadFile
              order={
                this.props.lead.detail.touchPoint[this.props.lead.detail.touchPoint.length - 1]
                  .order
              }
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="file"
            />
          </Form.Item>
        </div>
        <div id="past-touchpoint">
          <div className={styles.header}>
            <h2 className={styles.title}>Past TouchPoint</h2>
          </div>
          {this.props.lead.detail.touchPoint.map((touchPoint, index) => {
            if (index === this.props.lead.detail.touchPoint.length - 1 || index === 0) return null;
            return (
              <TouchPointModal
                key={touchPoint.id}
                update
                status={touchPoint.status}
                leadId={this.props.leadId}
                touchPoint={touchPoint}
              />
            );
          })}
        </div>
      </Form>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(LeadForm);

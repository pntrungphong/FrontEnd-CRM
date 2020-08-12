import React from 'react';
import { Form, Col, Row } from 'antd';
import { connect } from 'umi';
import LeadInfomation from './leadInfomation';
import TouchPointModal from './touchpointmodal';
import CustomUploadFile from '../../../components/fileComponent/customuploadfile';
import styles from './style.less';
import CurrentTouchPointInfo from './currentTouchPointInfo';
import ListPastTouchPoint from './listPastTouchPoint';
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
    const { detail } = this.props.lead;
    return (
      <Form
        onFinish={this.onPlaning}
        id={this.props.touchpointId}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: detail.name,
          rank: detail.rank,
          company: detail.company,
          contact: detail.contact,
          tag: detail.tag,
          relation: detail.relation,
          brief: detail.file,
          description: detail.description,
          file: detail.touchPointFile,
        }}
      >
        <div id="general">
          {detail.touchPoint.length !== 0 &&
          detail.touchPoint[detail.touchPoint.length - 1].order > 0 &&
          detail.touchPoint[detail.touchPoint.length - 1].status === 'Undone' ? (
            <CurrentTouchPointInfo
              update
              status={detail.touchPoint[detail.touchPoint.length - 1].status}
              leadId={this.props.leadId}
              touchPoint={detail.touchPoint[detail.touchPoint.length - 1]}
            />
          ) : null}

          {detail.touchPoint.length === 0 ||
          detail.touchPoint[detail.touchPoint.length - 1].status === 'Done' ? (
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
          <LeadInfomation lead={detail} />
        </div>
        <div id="file">
          <div className={styles.header}>
            <h2 className={styles.title}>Attachment(s)</h2>
          </div>
          <Form.Item name="file">
            <CustomUploadFile
              order={detail.touchPoint[detail.touchPoint.length - 1].order}
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="file"
              actionStyle={{ position: 'absolute', right: 0, transform: 'translateY(-175%)' }}
            />
          </Form.Item>
        </div>
        <div id="past-touchpoint">
          <div className={styles.header}>
            <h2 className={styles.title}>Past TouchPoint</h2>
          </div>
          <ListPastTouchPoint touchPoints={detail.touchPoint} />
        </div>
      </Form>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(LeadForm);

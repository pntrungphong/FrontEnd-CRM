import React, { useState } from 'react';
import { Modal, Form, Spin, Button, Tabs, Col, Row } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CustomUploadFile from './customuploadfile';
import Rankmodal from './rankmodal';
// import UpdateLeadInformationForm from './updateleadform';
import UpdateGeneralInformation from './updategeneralform';
import MarkDoneModal from './markdonetouchpoint';

const { TabPane } = Tabs;
const CustomHeader = (props) => {
  return (
    <div>
      <Row>
        <Col flex={6}>{props.name}</Col>
        <Col flex={1}>
          <MarkDoneModal
            form={props.form}
            dispatch={props.dispatch}
            status={props.status}
            rank={props.rank}
            leadId={props.leadId}
            touchpointId={props.touchpointId}
          />
        </Col>
      </Row>
    </div>
  );
};

const TouchpointCreateForm = connect(({ task, lead, touchpoint }) => ({
  task,
  touchpoint,
  lead,
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

  const cleanData = () => {};

  const onPlaning = (values) => {
    console.table(values);
    const returnValue = values;
    returnValue.leadId = props.leadId;
    returnValue.touchpointId = props.touchpointId;
    returnValue.order = props.touchpoint.data.order;
    if (values.rank.rank && values.rank.rank === props.rank) {
      returnValue.rank = props.rank;
    }

    props
      .dispatch({
        type: 'touchpoint/update',
        payload: { ...returnValue },
      })
      .then(() => {
        props.dispatch({
          type: 'touchpoint/cleanData',
        });

        props.dispatch({
          type: 'lead/loadListLead',
        });

        setVisible(false);
      });
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
            status={props.status}
            rank={props.rank}
            name={props.name}
            dispatch={props.dispatch}
            leadId={props.leadId}
            touchpointId={props.touchpointId}
          />
        }
        visible={visible}
        destroyOnClose
        width={800}
        style={{ top: 0 }}
        afterClose={cleanData}
        className={styles.customModal}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form={props.touchpointId} htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        {props.touchpoint.data && props.lead.data ? (
          <Form
            onFinish={onPlaning}
            id={props.touchpointId}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              goal: props.touchpoint.data.goal,
              meetingdate: props.touchpoint.data.meetingdate,
              note: props.touchpoint.data.note,
              rank: props.rank,
              scope: props.touchpoint.data.scope,
              sla: props.touchpoint.data.sla,
              pricing: props.touchpoint.data.pricing,
              estimation: props.touchpoint.data.estimation,
              quotation: props.touchpoint.data.quotation,
              proposal: props.touchpoint.data.proposal,
              lead: {
                name: props.lead.data.name,
                rank: props.lead.data.rank,
                company: props.lead.data.company,
                contact: props.lead.data.contact,
                tag: props.lead.data.tag,
                relation: props.lead.data.relation,
                brief: props.lead.data.file,
                description: props.lead.data.description,
              },
            }}
          >
            <Tabs defaultActiveKey="1" centered="true">
              <TabPane tab="General" key="1">
                <UpdateGeneralInformation
                  dispatch={props.dispatch}
                  touchpointId={props.touchpointId}
                  listTask={props.touchpoint.data.task}
                />
              </TabPane>
              <TabPane forceRender tab="Lead Information" key="2">
                <Form.Item name="rank" label="Rank">
                  <Rankmodal rank={props.rank} />
                </Form.Item>
                {/* <UpdateLeadInformationForm leadId={props.leadId} formRef={formRef} form={form} /> */}
              </TabPane>
              <TabPane forceRender tab="Scope" key="3">
                <Form.Item name="scope" label="Scope">
                  <CustomUploadFile dataIndex="scope" order={props.touchpoint.data.order} />
                </Form.Item>
              </TabPane>
              <TabPane forceRender tab="Estimation" key="4">
                <Form.Item name="estimation" label="Estimation">
                  <CustomUploadFile dataIndex="estimation" order={props.touchpoint.data.order} />
                </Form.Item>
              </TabPane>
              <TabPane forceRender tab="Pricing" key="5">
                <Form.Item name="pricing" label="Pricing">
                  <CustomUploadFile dataIndex="pricing" order={props.touchpoint.data.order} />
                </Form.Item>
              </TabPane>
              <TabPane forceRender tab="Proposal" key="6">
                <Form.Item name="proposal" label="Proposal">
                  <CustomUploadFile dataIndex="proposal" order={props.touchpoint.data.order} />
                </Form.Item>
              </TabPane>
              <TabPane forceRender tab="Quotation" key="7">
                <Form.Item name="quotation" label="Quotation">
                  <CustomUploadFile dataIndex="quotation" order={props.touchpoint.data.order} />
                </Form.Item>
              </TabPane>
              <TabPane forceRender tab="SLA" key="8">
                <Form.Item name="sla" label="SLA">
                  <CustomUploadFile dataIndex="sla" order={props.touchpoint.data.order} />
                </Form.Item>
              </TabPane>
            </Tabs>
          </Form>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
});
export default TouchpointCreateForm;

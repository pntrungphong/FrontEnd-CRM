import React, { useState } from 'react';
import { Modal, Form, Spin, Button, Tabs, Col, Row } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CustomUploadFile from './customuploadfile';
import Rankmodal from './rankmodal';
import UpdateLeadInformationForm from './updateleadform';
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
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const formRef = React.createRef();

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
    const returnValue = values;
    returnValue.leadId = props.leadId;
    returnValue.touchpointId = props.touchpointId;
    returnValue.lead.id = props.leadId;
    returnValue.order = props.touchpoint.data.order;
    if (values.rank.rank) {
      if (values.rank.rank === props.rank) returnValue.lead.rank = props.rank;
      else returnValue.lead.rank = values.rank;
    } else returnValue.lead.rank = values.rank;

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
      });

    props.dispatch({
      type: 'lead/update',
      payload: { ...returnValue.lead },
    });

    setVisible(false);
  };
  const onCancel = () => {
    setVisible(false);
    props.dispatch({
      type: 'task/cleanData',
    });
    form.resetFields();
    props.dispatch({
      type: 'touchpoint/cleanData',
    });
  };

  return (
    <div>
      <a onClick={onShow} className={styles.updateTouchPointButton}>
        <FontAwesomeIcon icon={faEllipsisH} size="lg" />
      </a>
      <Modal
        title={
          <CustomHeader
            status={props.status}
            form={form}
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
        okText="ADD"
        cancelText="Cancel"
        okButtonProps="default"
        cancelButtonProps="primary"
        forceRender
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onPlaning(values);
              // setVisible(false);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={null}>
            Submit
          </Button>,
        ]}
      >
        {props.touchpoint.data && props.lead.data ? (
          <Form
            form={form}
            ref={formRef}
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
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="General" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Lead Information" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Scope" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Estimation" key="4">
                Content of Tab Pane 4
              </TabPane>
              <TabPane tab="Pricing" key="5">
                Content of Tab Pane 5
              </TabPane>
              <TabPane tab="Proposal" key="6">
                Content of Tab Pane 6
              </TabPane>
              <TabPane tab="Quotation" key="7">
                Content of Tab Pane 7
              </TabPane>
              <TabPane tab="SLA" key="8">
                Content of Tab Pane 8
              </TabPane>
            </Tabs>
            <UpdateGeneralInformation
              dispatch={props.dispatch}
              touchpointId={props.touchpointId}
              listTask={props.touchpoint.data.task}
            />
            <Form.Item name="rank" label="Rank">
              <Rankmodal rank={props.rank} />
            </Form.Item>
            <UpdateLeadInformationForm leadId={props.leadId} formRef={formRef} form={form} />
            <Form.Item name="scope" label="Scope">
              <CustomUploadFile dataIndex="scope" order={props.touchpoint.data.order} />
            </Form.Item>
            <Form.Item name="sla" label="SLA">
              <CustomUploadFile dataIndex="sla" order={props.touchpoint.data.order} />
            </Form.Item>
            <Form.Item name="pricing" label="Pricing">
              <CustomUploadFile dataIndex="pricing" order={props.touchpoint.data.order} />
            </Form.Item>
            <Form.Item name="estimation" label="Estimation">
              <CustomUploadFile dataIndex="estimation" order={props.touchpoint.data.order} />
            </Form.Item>
            <Form.Item name="quotation" label="Quotation">
              <CustomUploadFile dataIndex="quotation" order={props.touchpoint.data.order} />
            </Form.Item>
          </Form>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
});
export default TouchpointCreateForm;

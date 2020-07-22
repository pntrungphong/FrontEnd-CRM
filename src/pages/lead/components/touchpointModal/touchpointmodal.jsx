import React, { useState } from 'react';
import { Modal, Form, Spin, Button, Tabs } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CustomUploadFile from './customuploadfile';
import Rankmodal from './rankmodal';
import UpdateLeadInformationForm from './updateleadform';
import UpdateGeneralInformation from './updategeneralform';

const { TabPane } = Tabs;

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
      payload: { id: props.touchpointId },
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
    if (values.rank.rank) {
      if (values.rank.rank === props.rank) returnValue.lead.rank = props.rank;
      else returnValue.lead.rank = values.rank;
    } else returnValue.lead.rank = values.rank;

    props.dispatch({
      type: 'touchpoint/cleanData',
    });

    props.dispatch({
      type: 'touchpoint/update',
      payload: { ...returnValue },
    });

    props.dispatch({
      type: 'lead/update',
      payload: { ...returnValue.lead },
    });

    props.dispatch({
      type: 'touchpoint/cleanData',
    });

    props.dispatch({
      type: 'lead/loadListLead',
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
        title={props.name}
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
                <UpdateGeneralInformation
                  dispatch={props.dispatch}
                  touchpointId={props.touchpointId}
                  listTask={props.touchpoint.data.task}
                />
              </TabPane>
              <TabPane tab="Lead Information" key="2">
                <Form.Item name="rank" label="Rank">
                  <Rankmodal rank={props.rank} />
                </Form.Item>
                <UpdateLeadInformationForm leadId={props.leadId} formRef={formRef} form={form} />
              </TabPane>
              <TabPane tab="Scope" key="3">
                <Form.Item name="scope" label="Scope">
                  <CustomUploadFile dataIndex="scope" />
                </Form.Item>
              </TabPane>
              <TabPane tab="Estimation" key="4">
                <Form.Item name="estimation" label="Estimation">
                  <CustomUploadFile dataIndex="estimation" />
                </Form.Item>
              </TabPane>
              <TabPane tab="Pricing" key="5">
                <Form.Item name="pricing" label="Pricing">
                  <CustomUploadFile dataIndex="pricing" />
                </Form.Item>
              </TabPane>
              <TabPane tab="Proposal" key="6">
                <Form.Item name="quotation" label="Quotation">
                  <CustomUploadFile dataIndex="quotation" />
                </Form.Item>
              </TabPane>
              <TabPane tab="Quotation" key="7">
                <Form.Item name="quotation" label="Quotation">
                  <CustomUploadFile dataIndex="quotation" />
                </Form.Item>
              </TabPane>
              <TabPane tab="SLA" key="8">
                <Form.Item name="sla" label="SLA">
                  <CustomUploadFile dataIndex="sla" />
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

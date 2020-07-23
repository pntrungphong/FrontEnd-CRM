import React, { useState } from 'react';
import { Modal, Form, Spin, Button, Col, Row, Menu } from 'antd';
import { connect } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CustomUploadFile from './customuploadfile';
import LeadInfomation from './leadInfomation';
import UpdateGeneralInformation from './updategeneralform';
import MarkDoneModal from './markdonetouchpoint';

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

      <Row>
        <Menu mode="horizontal">
          <Menu.Item key="general">
            <a href="#general">General</a>
          </Menu.Item>
          <Menu.Item key="lead-information">
            <a href="#lead-information">Lead Information</a>
          </Menu.Item>
          <Menu.Item key="estimation">
            <a href="#estimation">Estimation</a>
          </Menu.Item>
          <Menu.Item key="scope">
            <a href="#scope">Scope</a>
          </Menu.Item>
          <Menu.Item key="pricing">
            <a href="#pricing">Pricing</a>
          </Menu.Item>
          <Menu.Item key="proposal">
            <a href="#proposal">Proposal</a>
          </Menu.Item>
          <Menu.Item key="quotation">
            <a href="#quotation">Quotation</a>
          </Menu.Item>
          <Menu.Item key="sla">
            <a href="#sla">SLA</a>
          </Menu.Item>
        </Menu>
      </Row>
    </div>
  );
};

const TouchpointCreateForm = connect(({ task, lead, touchpoint, loading }) => ({
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
            touchpoint={props.touchpoint.data}
            lead={props.lead.data}
            dispatch={props.dispatch}
            leadId={props.leadId}
            touchpointId={props.touchpointId}
          />
        }
        visible={visible}
        destroyOnClose
        width={800}
        style={{ top: 10, background: 'white' }}
        bodyStyle={{ height: '75vh', overflowY: 'scroll', paddingTop: 20 }}
        afterClose={cleanData}
        className={styles.customModal}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button form={props.touchpointId} key="submit" type="primary" htmlType="submit">
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
            <div id="general">
              <UpdateGeneralInformation
                dispatch={props.dispatch}
                touchpointId={props.touchpointId}
                listTask={props.touchpoint.data.task}
              />
            </div>
            <div id="lead-information">
              <LeadInfomation lead={props.lead.data} />
            </div>
            <div id="estimation">
              <Form.Item name="scope" label="Scope">
                <CustomUploadFile dataIndex="scope" order={props.touchpoint.data.order} />
              </Form.Item>
            </div>
            <div id="scope">
              <Form.Item name="estimation" label="Estimation">
                <CustomUploadFile dataIndex="estimation" order={props.touchpoint.data.order} />
              </Form.Item>
            </div>
            <div id="pricing">
              <Form.Item name="pricing" label="Pricing">
                <CustomUploadFile dataIndex="pricing" order={props.touchpoint.data.order} />
              </Form.Item>
            </div>
            <div id="proposal">
              <Form.Item name="proposal" label="Proposal">
                <CustomUploadFile dataIndex="proposal" order={props.touchpoint.data.order} />
              </Form.Item>
            </div>
            <div id="quotation">
              <Form.Item name="quotation" label="Quotation">
                <CustomUploadFile dataIndex="quotation" order={props.touchpoint.data.order} />
              </Form.Item>
            </div>
            <div id="sla">
              <Form.Item name="sla" label="SLA">
                <CustomUploadFile dataIndex="sla" order={props.touchpoint.data.order} />
              </Form.Item>
            </div>
          </Form>
        ) : (
          <Spin className={styles.customSpin} />
        )}
      </Modal>
    </div>
  );
});
export default TouchpointCreateForm;

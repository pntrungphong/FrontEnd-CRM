import React, { useState } from 'react';
import { Modal, Form, Spin, Button, Col, Row, Menu } from 'antd';
import { connect, history } from 'umi';
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
        <Col flex={6}>
          <Row>{props.name}</Row>
          <Row>
            <a
              onClick={() => {
                history.push({
                  pathname: `/company/detail/${props.company.id}`,
                });
              }}
            >
              {props.company.name}
            </a>
          </Row>
        </Col>
        <Col flex={1}>
          <MarkDoneModal
            form={props.form}
            goal={props.goal}
            dispatch={props.dispatch}
            status={props.status}
            actualdate={props.actualdate}
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
          <Menu.Item key="scope">
            <a href="#scope">Scope</a>
          </Menu.Item>
          <Menu.Item key="estimation">
            <a href="#estimation">Estimation</a>
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
  updateLoading: loading.effects['touchpoint/update'],
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
            company={props.company}
            status={props.status}
            rank={props.rank}
            name={props.name}
            goal={props.goal}
            actualdate={props.actualdate}
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
        bodyStyle={{
          height: '75vh',
          overflowY: 'scroll',
          paddingTop: 20,
          scrollBehavior: 'smooth',
        }}
        afterClose={cleanData}
        className={styles.customModal}
        onCancel={onCancel}
        footer={[
          <Button
            loading={props.updateLoading}
            disabled={props.status === 'Done'}
            form={props.touchpointId}
            key="submit"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        {(props.touchpoint.data && props.lead.data) || props.updateLoading ? (
          <Form
            onFinish={onPlaning}
            id={props.touchpointId}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              goal: props.touchpoint.data.goal,
              meetingdate: props.touchpoint.data.meetingdate,
              note: props.touchpoint.data.note,
              review: props.touchpoint.data.review,
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
                status={props.status}
                dispatch={props.dispatch}
                touchpointId={props.touchpointId}
                listTask={props.touchpoint.data.task}
              />
            </div>

            <div id="lead-information">
              <LeadInfomation lead={props.lead.data} />
            </div>
            <div id="scope">
              <Form.Item name="estimation" label="Estimation">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="estimation"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="estimation">
              <Form.Item name="scope" label="Scope">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="scope"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="pricing">
              <Form.Item name="pricing" label="Pricing">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="pricing"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="proposal">
              <Form.Item name="proposal" label="Proposal">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="proposal"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="quotation">
              <Form.Item name="quotation" label="Quotation">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="quotation"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="sla">
              <Form.Item name="sla" label="SLA">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="sla"
                  order={props.touchpoint.data.order}
                />
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

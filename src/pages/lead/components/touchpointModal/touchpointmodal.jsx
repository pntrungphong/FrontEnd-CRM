import React, { useState, useEffect } from 'react';
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
          <Row>
            <h2 style={{ fontWeight: '600' }}>{props.name}</h2>
          </Row>
          <Row>
            <h3>
              <a
                onClick={() => {
                  history.push({
                    pathname: `/company/detail/${props.company.id}`,
                  });
                }}
              >
                {props.company.name}
              </a>
            </h3>
          </Row>
        </Col>
        <Col flex={1}>
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
            reloadData={props.reloadData}
          />
        </Col>
      </Row>
      <Row>
        <Menu mode="horizontal" id="menu-touchpoint-update">
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
  const [documentReady, setDocumentReady] = useState(false);

  useEffect(() => {
    if (documentReady) {
      // Cache selectors
      const topMenu = document.querySelector('#menu-touchpoint-update');
      const topMenuHeight = topMenu.offsetHeight + 150;
      // All list items
      const menuItems = [...topMenu.querySelectorAll('li.ant-menu-item')];
      const scrollItems = [];

      scrollItems.push(document.querySelector('#general'));
      scrollItems.push(document.querySelector('#lead-information'));
      scrollItems.push(document.querySelector('#scope'));
      scrollItems.push(document.querySelector('#estimation'));
      scrollItems.push(document.querySelector('#pricing'));
      scrollItems.push(document.querySelector('#proposal'));
      scrollItems.push(document.querySelector('#quotation'));
      scrollItems.push(document.querySelector('#sla'));

      document.querySelector('.ant-modal-body').addEventListener('scroll', (event) => {
        // Get container scroll position
        const { scrollTop } = event.srcElement;
        const fromTop = scrollTop + topMenuHeight;
        let cur = scrollItems.filter((it) => it.offsetTop < fromTop);
        if (cur.length === 0) return;
        cur = cur[cur.length - 1];
        const id = cur ? cur.id : '';
        menuItems.map((it) => it.classList.remove('ant-menu-item-selected'));
        const item = menuItems.filter((it) => it.children[0].getAttribute('href') === `#${id}`);
        if (item.length === 0) return;
        item[0].classList.add('ant-menu-item-selected');
      });
    }
  }, [documentReady]);

  const onShow = () => {
    setVisible(true);
    props
      .dispatch({
        type: 'touchpoint/get',
        payload: { id: props.touchpointId, leadId: props.leadId },
      })
      .then(() => {
        setDocumentReady(true);
      });
    props
      .dispatch({
        type: 'lead/loading',
        payload: { id: props.leadId },
      })
      .then(() => {
        setDocumentReady(true);
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
          payload: {
            page: 1,
            searchValue: props.lead.leadSearchValue,
            status: props.lead.status,
          },
        });

        setVisible(false);
        setDocumentReady(false);
      });
  };

  const onCancel = () => {
    setVisible(false);
    setDocumentReady(false);
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
            lead={props.lead}
            dispatch={props.dispatch}
            leadId={props.leadId}
            touchpointId={props.touchpointId}
            reloadData={onCancel}
          />
        }
        visible={visible}
        destroyOnClose
        width={800}
        style={{ top: 0, background: 'white' }}
        bodyStyle={{
          height: '71.5vh',
          overflowY: 'scroll',
          paddingTop: 0,
          paddingRight: 0,
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
              <div className={styles.header}>
                <h2 className={styles.title}>Scope</h2>
              </div>
              <Form.Item name="scope">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="scope"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="estimation">
              <div className={styles.header}>
                <h2 className={styles.title}>Estimation</h2>
              </div>
              <Form.Item name="estimation">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="estimation"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="pricing">
              <div className={styles.header}>
                <h2 className={styles.title}>Pricing</h2>
              </div>
              <Form.Item name="pricing">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="pricing"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="proposal">
              <div className={styles.header}>
                <h2 className={styles.title}>Proposal</h2>
              </div>
              <Form.Item name="proposal">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="proposal"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="quotation">
              <div className={styles.header}>
                <h2 className={styles.title}>Quotation</h2>
              </div>
              <Form.Item name="quotation">
                <CustomUploadFile
                  status={props.status}
                  dataIndex="quotation"
                  order={props.touchpoint.data.order}
                />
              </Form.Item>
            </div>
            <div id="sla">
              <div className={styles.header}>
                <h2 className={styles.title}>Service level Agreement</h2>
              </div>
              <Form.Item name="sla">
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

import React from 'react';
import { Form } from 'antd';
import { connect } from 'umi';
import LeadInfomation from './leadInfomation';
import TouchPointModal from './touchpointmodal';
import styles from './style.less';
import CurrentTouchPointInfo from './currentTouchPointInfo';

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

  // componentDidMount = () => {
  //   // Cache selectors
  //   const topMenu = document.querySelector('#menu-touchpoint-update');
  //   const topMenuHeight = topMenu.offsetHeight + 150;
  //   // All list items
  //   const menuItems = [...topMenu.querySelectorAll('li.ant-menu-item')];
  //   const scrollItems = [];

  //   scrollItems.push(document.querySelector('#general'));
  //   scrollItems.push(document.querySelector('#lead-information'));
  //   // scrollItems.push(document.querySelector('#scope'));
  //   // scrollItems.push(document.querySelector('#estimation'));
  //   // scrollItems.push(document.querySelector('#pricing'));
  //   // scrollItems.push(document.querySelector('#proposal'));
  //   // scrollItems.push(document.querySelector('#quotation'));
  //   // scrollItems.push(document.querySelector('#sla'));

  //   document.querySelector('.ant-modal-body').addEventListener('scroll', (event) => {
  //     // Get container scroll position
  //     const { scrollTop } = event.srcElement;
  //     const fromTop = scrollTop + topMenuHeight;
  //     let cur = scrollItems.filter((it) => it.offsetTop < fromTop);
  //     if (cur.length === 0) return;
  //     cur = cur[cur.length - 1];
  //     const id = cur ? cur.id : '';
  //     menuItems.map((it) => it.classList.remove('ant-menu-item-selected'));
  //     const item = menuItems.filter((it) => it.children[0].getAttribute('href') === `#${id}`);
  //     if (item.length === 0) return;
  //     item[0].classList.add('ant-menu-item-selected');
  //   });
  // };

  onValuesChange = (value) => {
    if (Object.keys(value)[0] !== 'task') this.props.enableButton();
  };

  render() {
    return (
      <Form
        onFinish={this.onPlaning}
        id={this.props.touchpointId}
        layout="vertical"
        name="form_in_modal"
        onValuesChange={this.onValuesChange}
        initialValues={{
          scope: [],
          sla: [],
          pricing: [],
          estimation: [],
          quotation: [],
          proposal: [],
          // scope: this.props.touchpoint.data.scope,
          // sla: this.props.touchpoint.data.sla,
          // pricing: this.props.touchpoint.data.pricing,
          // estimation: this.props.touchpoint.data.estimation,
          // quotation: this.props.touchpoint.data.quotation,
          // proposal: this.props.touchpoint.data.proposal,
          lead: {
            name: this.props.lead.detail.name,
            rank: this.props.lead.detail.rank,
            company: this.props.lead.detail.company,
            contact: this.props.lead.detail.contact,
            tag: this.props.lead.detail.tag,
            relation: this.props.lead.detail.relation,
            brief: this.props.lead.detail.file,
            description: this.props.lead.detail.description,
          },
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
            <h2 className={styles.title}>Lead Information</h2>
          </div>
          <LeadInfomation lead={this.props.lead.detail} />
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
        {/* <div id="scope">
          <div className={styles.header}>
            <h2 className={styles.title}>Scope</h2>
          </div>
          <Form.Item name="scope">
            <CustomUploadFile
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="scope"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div>
        <div id="estimation">
          <div className={styles.header}>
            <h2 className={styles.title}>Estimation</h2>
          </div>
          <Form.Item name="estimation">
            <CustomUploadFile
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="estimation"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div>
        <div id="pricing">
          <div className={styles.header}>
            <h2 className={styles.title}>Pricing</h2>
          </div>
          <Form.Item name="pricing">
            <CustomUploadFile
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="pricing"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div>
        <div id="proposal">
          <div className={styles.header}>
            <h2 className={styles.title}>Proposal</h2>
          </div>
          <Form.Item name="proposal">
            <CustomUploadFile
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="proposal"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div>
        <div id="quotation">
          <div className={styles.header}>
            <h2 className={styles.title}>Quotation</h2>
          </div>
          <Form.Item name="quotation">
            <CustomUploadFile
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="quotation"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div>
        <div id="sla">
          <div className={styles.header}>
            <h2 className={styles.title}>Service Level Agreement</h2>
          </div>
          <Form.Item name="sla">
            <CustomUploadFile
              leadId={this.props.leadId}
              touchPointId={this.props.touchpointId}
              status={this.props.status}
              dataIndex="sla"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div> */}
      </Form>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(LeadForm);

import React from 'react';
import { Form } from 'antd';
import { connect } from 'umi';
import styles from './style.less';
import CustomUploadFile from '../fileComponent/customuploadfile';
import LeadInfomation from './leadInfomation';
import UpdateGeneralInformation from './updategeneralform';

class UpdateTouchpointForm extends React.Component {
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

  componentDidMount = () => {
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
  };

  render() {
    return (
      <Form
        onFinish={this.onPlaning}
        id={this.props.touchpointId}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          goal: this.props.touchpoint.data.goal,
          meetingdate: this.props.touchpoint.data.meetingdate,
          note: this.props.touchpoint.data.note,
          review: this.props.touchpoint.data.review,
          rank: this.props.rank,
          scope: this.props.touchpoint.data.scope,
          sla: this.props.touchpoint.data.sla,
          pricing: this.props.touchpoint.data.pricing,
          estimation: this.props.touchpoint.data.estimation,
          quotation: this.props.touchpoint.data.quotation,
          proposal: this.props.touchpoint.data.proposal,
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
          <UpdateGeneralInformation
            status={this.props.status}
            dispatch={this.props.dispatch}
            touchpointId={this.props.touchpointId}
            listTask={this.props.touchpoint.data.task}
          />
        </div>

        <div id="lead-information">
          <LeadInfomation lead={this.props.lead.detail} />
        </div>
        <div id="scope">
          <div className={styles.header}>
            <h2 className={styles.title}>Scope</h2>
          </div>
          <Form.Item name="scope">
            <CustomUploadFile
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
              status={this.props.status}
              dataIndex="quotation"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div>
        <div id="sla">
          <div className={styles.header}>
            <h2 className={styles.title}>Service level Agreement</h2>
          </div>
          <Form.Item name="sla">
            <CustomUploadFile
              status={this.props.status}
              dataIndex="sla"
              order={this.props.touchpoint.data.order}
            />
          </Form.Item>
        </div>
      </Form>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(UpdateTouchpointForm);

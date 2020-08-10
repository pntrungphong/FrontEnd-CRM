import React from 'react';
import { Form } from 'antd';
import { connect } from 'umi';
import LeadInfomation from './leadInfomation';
import TouchPointModal from './touchpointmodal';
import CustomUploadFile from '../../../components/fileComponent/customuploadfile';
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
            <h2 className={styles.title}>Lead Information</h2>
          </div>
          <LeadInfomation lead={this.props.lead.detail} />
        </div>
        <div id="file">
          <div className={styles.header}>
            <h2 className={styles.title}>File</h2>
          </div>
          <Form.Item name="file">
            <CustomUploadFile
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

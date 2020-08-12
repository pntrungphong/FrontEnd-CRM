import { Card, Spin, Collapse, Breadcrumb, Descriptions, Divider } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import styles from './style.less';
import CollapseFileDetail from '../components/collapseDetail/collapseFileDetail';

const { Panel } = Collapse;

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};

class LeadDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'lead/get',
      payload: { id: this.props.match.params.id },
    });
  }

  UNSAFE_componentWillUpdate() {
    document.title = 'Detail Lead - Harmonia';
  }

  render() {
    const { lead } = this.props;
    const { querying } = this.props;

    if (querying || !lead.detail) {
      return <Spin />;
    }

    return (
      <div className={styles.main}>
        <PageHeaderWrapper
          breadcrumb={null}
          title={
            <div>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a
                    href="#"
                    onClick={() => {
                      history.push({
                        pathname: `'/client/lead`,
                      });
                    }}
                  >
                    Lead
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Detail</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }
        >
          <Card bordered="true" className={styles.customCard}>
            <Descriptions title="General Info">
              <Descriptions.Item label="Name">{lead.detail.name}</Descriptions.Item>
              <Descriptions.Item label="Company">
                <a
                  onClick={() => history.push(`/client/company/detail/${lead.detail.company.key}`)}
                >
                  {lead.detail.company.label}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Rank">{rankStore[lead.detail.rank]}</Descriptions.Item>
              <Descriptions.Item label="Contact">
                {lead.detail.contact.map((item) => (
                  <a onClick={() => history.push(`/client/contact/detail/${item.key}`)}>
                    {item.label}
                  </a>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Related to">
                {lead.detail.relation.map((item) => (
                  <a onClick={() => history.push(`/client/contact/detail/${item.key}`)}>
                    {item.label}
                  </a>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Status">{lead.detail.status}</Descriptions.Item>
              {lead.detail.tag ? (
                ''
              ) : (
                <Descriptions.Item label="" span="3">
                  {lead.detail.tag.map((item, index, listTag) => (
                    <a>
                      #{item.label}
                      {index + 1 !== listTag.length ? ' ' : ''}
                    </a>
                  ))}
                </Descriptions.Item>
              )}

              <Descriptions.Item label="Description" span="3">
                {lead.detail.description}
              </Descriptions.Item>
              <Descriptions.Item label="Note" span="3">
                {lead.detail.note}
              </Descriptions.Item>
            </Descriptions>
            <Card bordered="true" className={styles.cardOne}>
              <div className={styles.one}>
                <h2>Attachment(s)</h2>
              </div>
              <Divider />
              <CollapseFileDetail listFile={lead.detail.listFile} />
            </Card>

            <Collapse accordion className={styles.editCollapse}>
              {lead.detail.touchPoint.map((touchPointItem, index) => {
                return (
                  <Panel
                    header={
                      <h4>TouchPoint: {touchPointItem.status === 'Done' ? 'Done' : index + 1}</h4>
                    }
                    key={index}
                  >
                    <div>
                      <Descriptions title="Information">
                        <Descriptions.Item label={<b>Goal</b>}>
                          {touchPointItem.goal}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Status</b>}>
                          {touchPointItem.status}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Recap</b>}>
                          {touchPointItem.review}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Note</b>}>
                          {touchPointItem.note}
                        </Descriptions.Item>
                        <Descriptions.Item label="">{}</Descriptions.Item>

                        <Descriptions.Item label="">{}</Descriptions.Item>

                        <Descriptions.Item label={<b>Task</b>}>
                          {touchPointItem.task.map((task) => {
                            return (
                              <Descriptions label="Task">
                                <Descriptions.Item label={<b>Task Name</b>}>
                                  {task.taskName}({task.type}
                                </Descriptions.Item>
                                <Descriptions.Item label={<b>User Name</b>}>
                                  {task.userName}
                                </Descriptions.Item>
                                <Descriptions.Item label={<b>Meeting Date</b>}>
                                  {task.dueDate.format('DD-MM-YY')}
                                </Descriptions.Item>
                              </Descriptions>
                            );
                          })}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  querying: loading.effects['lead/get'],
}))(LeadDetail);

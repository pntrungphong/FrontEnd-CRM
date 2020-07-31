import { Card, Spin, Row, Col, Collapse, Breadcrumb, Descriptions } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '../../../utils/authority';
import styles from './style.less';
import fileConfig from '../../../../config/apiConfig';

const { Panel } = Collapse;

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};

const FileSpan = ({ fileinfo }) => {
  const downloadFile = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${getToken()}`);
    fetch(`${fileConfig.uploadFile}/${fileinfo.id}`, {
      method: 'GET',
      headers,
    }).then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileinfo.originalname;
        a.click();
      });
    });
  };
  return (
    <div className={styles.fileSpan}>
      <h4>{fileinfo.originalname}</h4>
      <div className={styles.fileSpanHover}>
        <FontAwesomeIcon
          icon={faFileDownload}
          size="3x"
          className={styles.fileSpanHoverIcon}
          onClick={downloadFile}
        />
      </div>
    </div>
  );
};
class LeadDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'lead/get',
      payload: { id: this.props.match.params.id },
    });
  }

  componentWillUpdate() {
    document.title = 'Detail Lead - Harmonia';
  }

  render() {
    const { lead } = this.props;
    const { querying } = this.props;

    if (querying || !lead.detail) {
      return <Spin />;
    }

    return (
      <PageHeaderWrapper
        title={
          <div>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a
                  href="#"
                  onClick={() => {
                    history.push({
                      pathname: `/lead`,
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
              <a onClick={() => history.push(`/company/detail/${lead.detail.company.key}`)}>
                {lead.detail.company.label}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Rank">{rankStore[lead.detail.rank]}</Descriptions.Item>
            <Descriptions.Item label="Contact">
              {lead.detail.contact.map((item) => (
                <a onClick={() => history.push(`/contact/detail/${item.key}`)}>{item.label}</a>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Related to">
              {lead.detail.relation.map((item) => (
                <a onClick={() => history.push(`/contact/detail/${item.key}`)}>{item.label}</a>
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
          <Collapse accordion className={styles.editCollapse}>
            {lead.detail.touchPoint.map((touchPointItem, index) => {
              return (
                <Panel header={<h4>TouchPoint: {touchPointItem.status}</h4>} key={index}>
                  <div>
                    <h2>Goal:{touchPointItem.goal}</h2>
                    <p className={styles.statusTp}>Status: {touchPointItem.status}</p>
                    <p>Note: {touchPointItem.note}</p>
                    <p>Review: {touchPointItem.review}</p>
                    <div>
                      {touchPointItem.task.map((task) => {
                        return (
                          <div className={styles.showTask}>
                            <Row>
                              <Col flex="40%">
                                <p className={styles.textTask}>
                                  TaskName: {task.taskName}({task.type})
                                </p>
                              </Col>
                              <Col flex="auto">
                                <p>
                                  {task.user.firstName} {task.dueDate}
                                </p>
                              </Col>
                            </Row>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      {lead.detail.file.map((item) => {
                        return (
                          <>
                            <FileSpan key={item.id} fileinfo={item} />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  querying: loading.effects['lead/get'],
}))(LeadDetail);

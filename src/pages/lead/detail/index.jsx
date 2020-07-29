import { Card, Spin, Avatar, Row, Tag, Col, Layout, Collapse } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '../../../utils/authority';
import styles from './style.less';

const { Sider, Content } = Layout;
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
    fetch(`http://api-harmonia.geekup.io/file/${fileinfo.id}`, {
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
      type: 'lead/loading',
      payload: { id: this.props.match.params.id },
    });
  }

  render() {
    const { lead } = this.props;
    if (lead.data === undefined) {
      return <Spin />;
    }
    return (
      <PageHeaderWrapper title="Lead Details">
        <Card bordered="true" className={styles.customCard}>
          <Layout className={styles.customContentLayout}>
            <Layout className={styles.customContentLayout}>
              <Content>
                <Row className={styles.rowCol}>
                  <Col flex="150px">
                    <h3 className={styles.customTitle}>Name </h3>
                  </Col>
                  <Col flex="auto">
                    <div className={styles.customContent}>
                      <span>{lead.data.name}</span>
                    </div>
                  </Col>
                </Row>

                <Row className={styles.rowCol}>
                  <Col flex="150px">
                    <h3 className={styles.customTitle}>Description </h3>
                  </Col>
                  <Col flex="auto">
                    <div className={styles.customContent}>
                      <span className={styles.customDescription}>{lead.data.description}</span>
                    </div>
                  </Col>
                </Row>

                <Row className={styles.rowCol}>
                  <Col flex="150px">
                    <h3 className={styles.customTitle}>Rank </h3>
                  </Col>
                  <Col flex="auto">
                    <div className={styles.customContent}>
                      <span>{rankStore[lead.data.rank]}</span>
                    </div>
                  </Col>
                </Row>

                <Row className={styles.rowCol}>
                  <Col flex="150px">
                    <h3 className={styles.customTitle}>Status </h3>
                  </Col>
                  <Col flex="auto">
                    <div className={styles.customContent}>
                      <span>{lead.data.status}</span>
                    </div>
                  </Col>
                </Row>
              </Content>
              <Sider className={styles.customContentLayout}>
                <div className={styles.customAvatar}>
                  <Avatar size={150} icon={<UserOutlined />} />
                </div>
              </Sider>
            </Layout>

            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.customTitle}>Company</h3>
              </Col>
              <Col flex="auto">
                <Tag key={lead.data.company.key} className={styles.ta}>
                  <a
                    onClick={() => {
                      history.push({
                        pathname: `/company/detail/${lead.data.company.key}`,
                      });
                    }}
                  >
                    {lead.data.company.label}
                  </a>
                </Tag>
              </Col>
            </Row>

            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.customTitle}>Tag</h3>
              </Col>
              <Col flex="auto">
                {' '}
                {lead.data.tag.map((item) => {
                  return (
                    <>
                      <Tag key={item.key} className={styles.customTitle}>
                        {item.label}
                      </Tag>
                    </>
                  );
                })}
              </Col>
            </Row>

            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.customTitle}>
                  <span> </span>Contact
                </h3>
              </Col>
              <Col flex="auto">
                {' '}
                {lead.data.contact.map((item) => {
                  return (
                    <>
                      <Tag key={item.label} className={styles.customTitle}>
                        <a
                          onClick={() => {
                            history.push({
                              pathname: `/contact/detail/${item.key}`,
                            });
                          }}
                        >
                          {item.label}
                        </a>
                      </Tag>
                    </>
                  );
                })}
              </Col>
            </Row>

            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.customTitle}>
                  <span> </span>Related to
                </h3>
              </Col>
              <Col flex="auto">
                {lead.data.relation.map((item) => {
                  return (
                    <>
                      <Tag key={item.label} className={styles.customTitle}>
                        <a
                          onClick={() => {
                            history.push({
                              pathname: `/contact/detail/${item.key}`,
                            });
                          }}
                        >
                          {item.label}
                        </a>
                      </Tag>
                    </>
                  );
                })}
              </Col>
            </Row>
            {/* <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.customTitle}>File</h3>
            </Col>
            <Col flex="auto">
              {lead.data.file.map((item) => {
                return (
                  <>
                    <FileSpan key={item.id} fileinfo={item} />
                  </>
                );
              })}
            </Col>
          </Row>           */}
            <Collapse accordion className={styles.editCollapse}>
              {lead.data.touchPoint.map((touchPointItem, index) => {
                return (
                  <Panel header={<h4>Touchpoint</h4>} key={index}>
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
                        {lead.data.file.map((item) => {
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
          </Layout>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  querying: loading.effects['lead/loading'],
}))(LeadDetail);

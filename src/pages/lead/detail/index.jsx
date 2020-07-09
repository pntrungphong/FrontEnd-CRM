import { Card, Spin, Divider, Avatar, Row, Tag, Col } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import styles from './style.less';

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
      // console.log(lead)
      return <Spin />;
    }
    console.log(lead.data.tag);
    return (
      <PageHeaderWrapper title="Lead Details">
        <Card bordered="true">
          <div className={styles.one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={styles.two} />
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>
                <span> </span>Name
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.clo}>
                <span className={styles.cloTwo}>{lead.data.name}</span>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>
                <span> </span>Description
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.clo}>
                <span className={styles.cloTwo}>{lead.data.description}</span>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>
                <span> </span>Rank
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.clo}>
                <span className={styles.cloTwo}>{lead.data.rank}</span>
              </div>
            </Col>
          </Row>
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Company</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  <Tag key={lead.data.company.id} className={styles.ta}>
                    <a
                      onClick={() => {
                        history.push({
                          pathname: '/company/detail',
                          query: {
                            id: lead.data.company.id,
                          },
                        });
                      }}
                    >
                      {lead.data.company.name}
                    </a>
                  </Tag>
                </span>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Tag</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {' '}
                  {lead.data.tag.map((item) => {
                    return (
                      <>
                        <Tag key={item.key}>{item.label}</Tag>
                      </>
                    );
                  })}
                </span>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>
                <span> </span>Contact
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {' '}
                  {lead.data.contact.map((item) => {
                    console.log(lead.data);
                    return (
                      <>
                        <Tag key={item.label}>
                          <a
                            onClick={() => {
                              history.push({
                                pathname: '/contact/detail',
                                query: {
                                  id: item.key,
                                },
                              });
                            }}
                          >
                            {item.label}
                          </a>
                        </Tag>
                      </>
                    );
                  })}
                </span>
              </div>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  querying: loading.effects['lead/loading'],
}))(LeadDetail);

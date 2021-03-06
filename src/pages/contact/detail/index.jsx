import { Card, Divider, Tag, Spin, Row, Col, Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import styles from './style.less';
import UpdateContactDrawer from '../update/updateDrawer';

class ContactDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contact/get',
      payload: { id: this.props.match.params.id },
    });
  }

  UNSAFE_componentWillUpdate() {
    document.title = 'Detail Contact - Harmonia';
  }

  render() {
    const { contact } = this.props;
    const { querying } = this.props;

    if (querying || !contact.detail) {
      return <Spin />;
    }

    return (
      <div className={styles.main}>
        <PageHeaderWrapper
          breadcrumb={null}
          title={
            <Breadcrumb>
              <Breadcrumb.Item>Database Management</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a
                  href="#"
                  onClick={() => {
                    history.push({
                      pathname: `/client/contact`,
                    });
                  }}
                >
                  Contact
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Detail</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <PageHeaderWrapper
            breadcrumb={null}
            className={styles.wrapper}
            title={contact.detail.name}
          />

          <Card bordered="true" className={styles.cardOne}>
            <div className={styles.one}>
              <h2>Details</h2>
            </div>
            <Divider className={styles.two} />
            <div className={styles.editSpace}>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Title</h3>
                </Col>
                <Col flex="auto">
                  <span className={styles.customField}>:{contact.detail.title}</span>
                </Col>
              </Row>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Company</h3>
                </Col>
                <Col flex="auto">
                  {contact.detail.company.map((item) => {
                    return (
                      <>
                        <Tag key={item.key} className={styles.customFieldContact}>
                          <a
                            className={styles.editHover}
                            onClick={() => {
                              history.push({
                                pathname: `/client/company/detail/${item.key}`,
                              });
                            }}
                          >
                            <h4 className={styles.editTag}>{item.label}</h4>
                          </a>
                        </Tag>
                      </>
                    );
                  })}
                </Col>
              </Row>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Referral</h3>
                </Col>
                <Col flex="auto">
                  {contact.detail.referral.map((item) => {
                    return (
                      <Tag key={item.name} className={styles.customFieldContact}>
                        <a
                          onClick={() => {
                            history.push({
                              pathname: `/client/contact/detail/${item.key}`,
                            });
                          }}
                        >
                          <h4 className={styles.editTag}>{item.label}</h4>
                        </a>
                      </Tag>
                    );
                  })}
                </Col>
              </Row>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Phone</h3>
                </Col>
                <Col flex="auto">
                  {contact.detail.phone.map((item) => {
                    return (
                      <>
                        <Row>
                          <span key={item.type} className={styles.customField}>
                            :<a key={item.number}>{item.number}</a> ({item.type})
                          </span>
                        </Row>
                      </>
                    );
                  })}
                </Col>
              </Row>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Email</h3>
                </Col>
                <Col flex="auto">
                  {contact.detail.email.map((item) => {
                    return (
                      <>
                        <Row>
                          <span key={item.type} className={styles.customField}>
                            :<a key={item.url}>{item.url}</a> ({item.type})
                          </span>
                        </Row>
                      </>
                    );
                  })}
                </Col>
              </Row>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Social link</h3>
                </Col>
                <Col flex="auto">
                  {contact.detail.website.map((item) => {
                    return (
                      <>
                        <Row>
                          <span className={styles.customField}>
                            {item.type}: <a key={item.url}>{item.url}</a>
                          </span>
                        </Row>
                      </>
                    );
                  })}
                </Col>
              </Row>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Address</h3>
                </Col>
                <Col flex="auto">
                  {contact.detail.address.map((item) => {
                    return (
                      <Row>
                        <span key={item} className={styles.customField}>
                          {item}
                        </span>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
              <Row className={styles.rowCol}>
                <Col flex="150px">
                  <h3 className={styles.cloOne}>Tag</h3>
                </Col>
                <Col flex="auto">
                  {contact.detail.tag.map((item) => {
                    return (
                      <>
                        <Tag key={item.key} className={styles.ta}>
                          {item.label}
                        </Tag>
                      </>
                    );
                  })}
                </Col>
              </Row>
            </div>
            <Divider className={styles.three} />
          </Card>
          <br />
          <Card bordered="true" className={styles.cardOne}>
            <div className={styles.one}>
              <h2>Leads</h2>
            </div>
            <Divider />
            <div className={styles.editSpace}>
              <Row className={styles.editLead}>
                {contact.detail.lead.map((item) => {
                  return (
                    <>
                      <Col flex="500px">
                        <a
                          onClick={() => {
                            history.push({
                              pathname: `/client/lead/detail/${item.id}`,
                            });
                          }}
                        >
                          {item.name} - {contact.detail.name}
                        </a>
                      </Col>
                      <Col flex="auto">
                        <Tag>{item.status}</Tag>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
          </Card>
        </PageHeaderWrapper>
        <br />
        <div className={styles.editDraw}>
          <UpdateContactDrawer
            className={styles.editDraw}
            contactId={this.props.match.params.id}
            atDetail
          />
        </div>
      </div>
    );
  }
}
export default connect(({ contact, loading }) => ({
  contact,
  querying: loading.effects['contact/get'],
}))(ContactDetail);

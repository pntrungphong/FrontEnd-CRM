import { Card, Divider, Tag, Spin, Row, Col, Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import styles from './style.less';

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
          title={
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a
                  href="#"
                  onClick={() => {
                    history.push({
                      pathname: `/contact`,
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
          <PageHeaderWrapper className={styles.wrapper} title={contact.detail.name} />

          <Card bordered="true" className={styles.cardOne}>
            <div className={styles.one}>
              <h2>Details</h2>
            </div>
            <Divider className={styles.two} />

            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.cloOne}>Name</h3>
              </Col>
              <Col flex="auto">
                <span className={styles.customField}>{contact.detail.name}</span>
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
                      <Tag
                        key={item.key}
                        className={styles.ta}
                        onClick={() => {
                          history.push({
                            pathname: `/company/detail/${item.key}`,
                          });
                        }}
                      >
                        {item.label}
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
                    <>
                      <Tag key={item.name} className={styles.customFieldContact}>
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
            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.cloOne}>Phone</h3>
              </Col>
              <Col flex="auto">
                {contact.detail.phone.map((item) => {
                  return (
                    <>
                      <Row>
                        <Tag key={item.type} className={styles.customField}>
                          {item.number} ({item.type})
                        </Tag>
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
                        <h4 key={item.type} className={styles.customField}>
                          {item.url}
                        </h4>
                      </Row>
                    </>
                  );
                })}
              </Col>
            </Row>
            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.cloOne}>Website</h3>
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
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default connect(({ contact, loading }) => ({
  contact,
  querying: loading.effects['contact/get'],
}))(ContactDetail);

import { Card, Divider, Tag, Spin, Avatar, Row, Col } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import styles from './style.less';

class ContactDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contact/loading',
      payload: { id: this.props.match.params.id },
    });
  }

  render() {
    const { contact } = this.props;
    if (contact.data === undefined) {
      return <Spin />;
    }
    return (
      <PageHeaderWrapper title="Contact Details">
        <Card bordered="true">
          <div className={styles.one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={styles.two} />

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Name</h3>
            </Col>
            <Col flex="auto">
              <span className={styles.customField}>{contact.data.name}</span>
            </Col>
          </Row>
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Title</h3>
            </Col>
            <Col flex="auto">
              <span className={styles.customField}>{contact.data.title}</span>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Company</h3>
            </Col>
            <Col flex="auto">
              {contact.data.company.map((item) => {
                return (
                  <>
                    <Tag key={item.key} className={styles.ta}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: `/company/detail/${item.key}`,
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
              <h3 className={styles.cloOne}>Email</h3>
            </Col>
            <Col flex="auto">
              {contact.data.email.map((item) => {
                return (
                  <>
                    <Row>
                      <Tag key={item.type} className={styles.customField}>
                        {item.url} ({item.type})
                      </Tag>
                    </Row>
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
              {contact.data.phone.map((item) => {
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
              <h3 className={styles.cloOne}>Tag</h3>
            </Col>
            <Col flex="auto">
              {contact.data.tag.map((item) => {
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
              <h3 className={styles.cloOne}>Referral</h3>
            </Col>
            <Col flex="auto">
              {contact.data.referral.map((item) => {
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
              <h3 className={styles.cloOne}>Website</h3>
            </Col>
            <Col flex="auto">
              {contact.data.website.map((item) => {
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
              {contact.data.address.map((item) => {
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
          <Divider className={styles.three} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default connect(({ contact, loading }) => ({
  contact,
  querying: loading.effects['contact/loading'],
}))(ContactDetail);

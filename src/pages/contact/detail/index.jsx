import { Card, Divider, Tag, Spin, Row, Col, Button } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import styles from './style.less';

function Heading(props) {
  return <h2 className={styles.heading}>{props.name}</h2>;
}
class ContactDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contact/get',
      payload: { id: this.props.match.params.id },
    });
  }

  render() {
    const { contact } = this.props;
    if (contact.detail === undefined) {
      return <Spin />;
    }
    return (
      <PageHeaderWrapper className={styles.wrapper} title={<Heading name={contact.detail.name} />}>
        <Card bordered="true" className={styles.cardOne}>
          <div className={styles.one}>
            <h2>Details</h2>
          </div>
          <Divider className={styles.two} />

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Title</h3>
            </Col>
            <Col flex="auto">
              <span className={styles.customField}>{contact.detail.title}</span>
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
                        {item.number}
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
            {contact.detail.address.map((item, index) => {
              return (
                <>
                  <Col flex="150px">
                    <h3 className={styles.cloOne}>Address {index + 1}</h3>
                  </Col>
                  <Col flex="auto" className={styles.address}>
                    <span className={styles.customField}>{item}</span>
                  </Col>
                </>
              );
            })}
          </Row>
          <Divider className={styles.three} />
        </Card>
        <Card bordered="true" className={styles.cardTwo}>
          <div className={styles.one}>
            <h2>Leads</h2>
          </div>
          <Divider className={styles.two} />
          <Row className={styles.rowCol}>
            {contact.detail.address.map((item) => {
              return (
                <>
                  <Col flex="100%">
                    <span className={styles.customField}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: `/lead/detail/${item.key}`,
                          });
                        }}
                        key={item.url}
                      >
                        Lead name-{contact.detail.name}
                      </a>
                    </span>
                  </Col>
                </>
              );
            })}
          </Row>
        </Card>
        <div className={styles.edit}>
          <Button
            onClick={() => {
              history.push({
                pathname: `/contact/update/${this.props.match.params.id}`,
              });
            }}
          >
            Edit
          </Button>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default connect(({ contact, loading }) => ({
  contact,
  querying: loading.effects['contact/get'],
}))(ContactDetail);

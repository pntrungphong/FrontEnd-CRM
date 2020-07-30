import { Card, Spin, Divider, Avatar, Tag, Row, Col, Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import styles from './style.less';

class CompanyDetail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'company/get',
      payload: { id: this.props.match.params.id },
    });
  }

  componentWillUpdate() {
    document.title = 'Detail Company - Harmonia';
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'company/cleanData',
    });
  }

  render() {
    const { company } = this.props;
    const { querying } = this.props;

    if (querying || !company.detail) {
      return <Spin />;
    }

    return (
      <PageHeaderWrapper
        title={
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a
                href="#"
                onClick={() => {
                  history.push({
                    pathname: `/company`,
                  });
                }}
              >
                Company
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Card bordered="true">
          <div className={styles.one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={styles.two} />
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Contact</h3>
            </Col>
            <Col flex="auto">
              {company.detail.contact.map((item) => {
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
              {company.detail.website.map((item) => {
                return (
                  <>
                    <Row>
                      <span className={styles.customField}>
                        <a key={item.url}>{item.url}</a> ({item.type})
                      </span>
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
              {company.detail.tag.map((item) => {
                return (
                  <>
                    <Tag key={item.key} className={styles.tagOne}>
                      {item.label}
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
              {company.detail.tag.map((item) => {
                return (
                  <>
                    <Tag key={item.key} className={styles.tagOne}>
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
              {company.detail.phone.map((item) => {
                return (
                  <>
                    <Row>
                      <Tag key={item.number} className={styles.customField}>
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
              {company.detail.email.map((item) => {
                return (
                  <>
                    <Row>
                      <Tag key={item.type} className={styles.customField}>
                        {item.url}
                      </Tag>
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
              <span className={styles.customField}>
                <a key={company.detail.url}>{company.detail.url}</a>
              </span>
            </Col>
          </Row>
          <Row className={styles.rowCol}>
            {company.detail.address.map((item, index) => {
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
        </Card>
        <Card bordered="true" className={styles.cardTwo}>
          <div className={styles.one}>
            <h2>Leads</h2>
          </div>
          <Divider className={styles.two} />
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Address</h3>
            </Col>
            <Col flex="auto">
              {company.detail.address.map((item) => {
                return (
                  <>
                    <Row>
                      <span key={item} className={styles.customField}>
                        {item}
                      </span>
                    </Row>
                  </>
                );
              })}
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ company, loading }) => ({
  company,
  querying: loading.effects['company/get'],
}))(CompanyDetail);

import { Card, Spin, Divider, Tag, Row, Col, Breadcrumb, Button } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import styles from './style.less';

class CompanyDetail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'company/get',
      payload: { id: this.props.match.params.id },
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'company/cleanData',
    });
  }

  UNSAFE_componentWillUpdate() {
    document.title = 'Detail Company - Harmonia';
  }

  render() {
    const { company } = this.props;
    const { querying } = this.props;

    if (querying || !company.detail) {
      return <Spin />;
    }

    console.table(company);
    return (
      <div className={styles.main}>
        <PageHeaderWrapper
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <b>Database Management</b>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a
                  href="#"
                  onClick={() => {
                    history.push({
                      pathname: `/company`,
                    });
                  }}
                >
                  <b>Company</b>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Detail</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <PageHeaderWrapper className={styles.wrapper} title={company.detail.name} />
          <Card bordered="true" className={styles.cardOne}>
            <div className={styles.one}>
              <h2>Details</h2>
            </div>
            <Divider className={styles.two} />
            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.cloOne}>Website</h3>
              </Col>
              <Col flex="auto">
                <span className={styles.customField}>
                  <a href={company.detail.url} target="_blank" rel="noopener noreferrer">
                    {company.detail.url}
                  </a>
                </span>
              </Col>
            </Row>
            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.cloOne}>Contact</h3>
              </Col>
              <Col flex="auto">
                {company.detail.contact.map((item) => {
                  return (
                    <Tag key={item.name} className={styles.customFieldContact}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: `/contact/detail/${item.key}`,
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
                <h3 className={styles.cloOne}>Tag</h3>
              </Col>
              <Col flex="auto">
                {company.detail.tag.map((item) => {
                  return (
                    <>
                      <Tag key={item.key} className={styles.tagOne}>
                        <h4 className={styles.editTag}>{item.label}</h4>
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
                    <Row key={item.number}>
                      <Tag key={item.number} className={styles.customField} />
                    </Row>
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
                    <Row key={item.url}>
                      <span key={item.type} className={styles.customField}>
                        <h4>{item.url}</h4>
                      </span>
                    </Row>
                  );
                })}
              </Col>
            </Row>
            <Row className={styles.rowCol}>
              <Col flex="150px">
                <h3 className={styles.cloOne}>Social link</h3>
              </Col>
              <Col flex="auto">
                {company.detail.website.map((item) => {
                  return (
                    <Row key={item.url}>
                      <span className={styles.customField}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.url}
                        </a>{' '}
                        ({item.type})
                      </span>
                    </Row>
                  );
                })}
              </Col>
            </Row>
            <Row className={styles.rowCol}>
              {company.detail.address.map((item, index) => {
                return (
                  <>
                    <Col flex="450px">
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
          <br />
          <Card bordered="true" className={styles.cardOne}>
            <div className={styles.one}>
              <h2>Leads</h2>
            </div>
            <Divider className={styles.two} />
            <Row className={styles.rowCol}>
              {company.detail.lead.map((item) => {
                return (
                  <>
                    <Col flex="440px">
                      <a
                        onClick={() => {
                          history.push({
                            pathname: `/lead/detail/${item.id}`,
                          });
                        }}
                      >
                        <h3 className={styles.linkLead}>
                          {item.name} - {company.detail.name}
                        </h3>
                      </a>
                    </Col>
                    <Col flex="auto" className={styles.address}>
                      <Tag>{item.status}</Tag>
                    </Col>
                  </>
                );
              })}
            </Row>
          </Card>
        </PageHeaderWrapper>
        <br />
        <Button
          className={styles.edit}
          onClick={() => {
            history.push({
              pathname: `/company`,
            });
          }}
        >
          Edit Company
        </Button>
      </div>
    );
  }
}

export default connect(({ company, loading }) => ({
  company,
  querying: loading.effects['company/get'],
}))(CompanyDetail);

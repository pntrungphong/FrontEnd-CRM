import { Card, Spin, Divider, Avatar, Tag, Row, Col } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import styles from './style.less';

class CompanyDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'company/loading',
      payload: { id: this.props.match.params.id },
    });
  }

  render() {
    const { company } = this.props;
    const { querying } = this.props;

    if (querying || !company.data) {
      return <Spin />;
    }

    return (
      <PageHeaderWrapper title="Company Details">
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
              <span className={styles.customField}>{company.data.name}</span>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Email</h3>
            </Col>
            <Col flex="auto">
              {company.data.email.map((item) => {
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
              <h3 className={styles.cloOne}>Tag</h3>
            </Col>
            <Col flex="auto">
              {company.data.tag.map((item) => {
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
              {company.data.phone.map((item) => {
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
              <h3 className={styles.cloOne}>Url</h3>
            </Col>
            <Col flex="auto">
              <span className={styles.customField}>{company.data.url}</span>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Website</h3>
            </Col>
            <Col flex="auto">
              {company.data.website.map((item) => {
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
              <h3 className={styles.cloOne}>Contact</h3>
            </Col>
            <Col flex="auto">
              {company.data.contact.map((item) => {
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
              <h3 className={styles.cloOne}>Address</h3>
            </Col>
            <Col flex="auto">
              {company.data.address.map((item) => {
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
  querying: loading.effects['company/loading'],
}))(CompanyDetail);

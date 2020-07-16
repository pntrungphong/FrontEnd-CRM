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
    if (company.data === undefined) {
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
              <h3 className={styles.cloOne}>
                <span> </span>Name
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.clo}>
                <span className={styles.cloTwo}>{company.data.name}</span>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>
                <span> </span>Email
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {company.data.email.map((item) => {
                    return (
                      <>
                        <Tag key={item.url}>{item.url}</Tag>
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
                <span> </span>Tag
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {company.data.tag.map((item) => {
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
                <span> </span>phone
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {company.data.phone.map((item) => {
                    return (
                      <>
                        <Tag key={item.number}>{item.number}</Tag>
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
                <span> </span>Url
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>{company.data.url}</span>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>
                <span> </span>website
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {company.data.website.map((item) => {
                    return (
                      <>
                        <Tag key={item.url}>{item.url}</Tag>
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
                  {company.data.contact.map((item) => {
                    return (
                      <>
                        <Tag key={item.name}>
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
                </span>
              </div>
            </Col>
          </Row>
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>
                <span> </span>Address
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {company.data.address.map((item) => {
                    return (
                      <>
                        <span key={item}>{item}</span>
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

export default connect(({ company, loading }) => ({
  company,
  querying: loading.effects['company/loading'],
}))(CompanyDetail);

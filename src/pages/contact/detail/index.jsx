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
              <h3 className={styles.cloOne}>
                <span> </span>Name
              </h3>
            </Col>
            <Col flex="auto">
              <div className={styles.clo}>
                <span className={styles.cloTwo}>{contact.data.name}</span>
              </div>
            </Col>
          </Row>
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Title</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.clo}>
                <span className={styles.cloTwo}>{contact.data.title}</span>
              </div>
            </Col>
          </Row>
          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Email</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {contact.data.email.map((item) => {
                    return (
                      <>
                        <Tag key={item.url} className={styles.ta}>
                          {item.url}
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
              <h3 className={styles.cloOne}>Phone</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {contact.data.phone.map((item) => {
                    return (
                      <>
                        <Tag key={item.number} className={styles.ta}>
                          {item.number}
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
              <h3 className={styles.cloOne}>Tag</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {contact.data.tag.map((item) => {
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
              <h3 className={styles.cloOne}>Referral</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {contact.data.referral.map((item) => {
                    return (
                      <>
                        <Tag key={item.key} className={styles.ta}>
                          {item.label}
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
              <h3 className={styles.cloOne}>Company</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
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
                </span>
              </div>
            </Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px">
              <h3 className={styles.cloOne}>Website</h3>
            </Col>
            <Col flex="auto">
              <div className={styles.cloFour}>
                <span className={styles.cloTwo}>
                  {contact.data.website.map((item) => {
                    return (
                      <>
                        <a key={item.url}>{item.url}</a>
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
                  {contact.data.address.map((item) => {
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

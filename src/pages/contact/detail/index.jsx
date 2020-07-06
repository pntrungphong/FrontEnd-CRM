import { Card, Descriptions, Divider, Tag, Spin, Avatar, Row, Col, Input } from 'antd';
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
      payload: { id: this.props.location.query.id },
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
          {/* <Descriptions bordered className={four}>
            <Descriptions.Item className={five} span={3} label="Name">
              
            </Descriptions.Item>
          </Descriptions> */}
          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Name</h3></Col>
            <Col flex="auto"><div className={styles.clo}><span className={styles.cloTwo}>{contact.data.name}</span></div></Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Title</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}>{contact.data.title}</span></div></Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Email</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}>
              {contact.data.email.map((item) => {
                return (
                  <>
                    <Tag key={item.url}>{item.url}</Tag>
                  </>
                );
              })}</span></div></Col>
          </Row>


          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Phone</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}>
              {contact.data.phone.map((item) => {
                return (
                  <>
                    <Tag key={item.number}>{item.number}</Tag>
                  </>
                );
              })}</span></div></Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Tag</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}>{contact.data.tag}</span></div></Col>
          </Row>

          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Referral</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}>
              {contact.data.referral.map((item) => {
                return (
                  <>
                    <Tag key={item.key}>{item.value}</Tag>
                  </>
                );
              })}</span></div></Col>
          </Row>

          {/* <Descriptions bordered className={four}>
            <Descriptions.Item className={five} span={3} label="Company">
              {contact.data.company.map((item) => {
                return (
                  <>
                    <Tag key={item.key}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: '/company/detail',
                            query: {
                              id: item.key,
                            },
                          });
                        }}
                      >
                        {item.value}
                      </a>
                    </Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions> */}

          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Company</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}>
              {contact.data.company.map((item) => {
                return (
                  <>
                    <Tag key={item.key}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: '/company/detail',
                            query: {
                              id: item.key,
                            },
                          });
                        }}
                      >
                        {item.value}
                      </a>
                    </Tag>
                  </>
                );
              })}</span></div></Col>
          </Row>

          {/* <Descriptions bordered className={four}>
            <Descriptions.Item className={five} span={3} label="Website">
              {contact.data.website.map((item) => {
                return (
                  <>
                    <Tag key={item.url}>{item.url}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions> */}
          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Website</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}>
              {contact.data.website.map((item) => {
                return (
                  <>
                    <Tag key={item.url}>{item.url}</Tag>
                  </>
                );
              })}</span></div></Col>
          </Row>


          {/* <Descriptions bordered className={four}>
            <Descriptions.Item className={five} span={3} label="Address">
              {contact.data.address.map((item) => {
                return (
                  <>
                    <Tag key={item}>{item}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions> */}
          <Row className={styles.rowCol}>
            <Col flex="150px"><h3 className={styles.cloOne}>Address</h3></Col>
            <Col flex="auto"><div className={styles.cloFour}><span className={styles.cloTwo}> {contact.data.address.map((item) => {
              return (
                <>
                  <Tag key={item}>{item}</Tag>
                </>
              );
            })}</span></div></Col>
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

import { Card, Divider, Avatar, Row, Col } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import styles from './style.less';

class ArchivesDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'archives/loading',
      payload: { id: this.props.match.params.id },
    });
  }

  UNSAFE_componentWillUpdate() {
    document.title = 'Detail Lead - Harmonia';
  }

  render() {
    return (
      <PageHeaderWrapper title="archives Details">
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
                <span className={styles.cloTwo}>{}</span>
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
                <span className={styles.cloTwo}>{}</span>
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
                <span className={styles.cloTwo}>{}</span>
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
                <span className={styles.cloTwo}>{}</span>
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
                <span className={styles.cloTwo}>{}</span>
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
                <span className={styles.cloTwo}>{}</span>
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
                  {}
                  {/* {archives.data.contact.map((item) => {
                    return (
                      <>
                        <Tag key={item.name} className={styles.tagOne}>
                          
                          <a
                            onClick={() => {
                              history.push({
                                pathname: `/client/contact/detail/${item.key}`,
                              });
                            }}
                          >
                            {item.label}
                          </a>
                        </Tag>
                      </>
                    );
                  })} */}
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
                  {}
                  {/* {archives.data.address.map((item) => {
                    return (
                      <>
                        <span key={item}>{item}</span>
                      </>
                    );
                  })} */}
                </span>
              </div>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ archives, loading }) => ({
  archives,
  querying: loading.effects['archives/loading'],
}))(ArchivesDetail);

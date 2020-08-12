import React from 'react';
import { history } from 'umi';
import { Col, Row } from 'antd';
import styles from './style.less';
import { rankTitle } from '../../../components/definition';

// if function
const LeadInfomation = (props) => {
  return (
    <>
      <div className={styles.contentLead}>
        <h4>
          <Row>
            <Col span={4}>
              <span style={{ fontWeight: '600' }}>Rank:</span>
            </Col>
            <Col span={19}>{rankTitle[props.lead.rank]}</Col>
          </Row>
        </h4>
        <h4>
          <Row>
            <Col span={4}>
              <span style={{ fontWeight: '600' }}>Contact:</span>
            </Col>
            <Col span={19}>
              {props.lead.contact.map((item, index, listContact) => (
                <a
                  onClick={() => {
                    history.push({
                      pathname: `/client/contact/detail/${item.key}`,
                    });
                  }}
                  key={item.label}
                >
                  {item.label}
                  {index + 1 === listContact.length ? '' : ', '}
                </a>
              ))}
            </Col>
          </Row>
        </h4>

        <h4>
          <Row>
            <Col span={4}>
              <span style={{ fontWeight: '600' }}>Tag:</span>
            </Col>
            <Col span={19}>
              {props.lead.tag.map((item) => (
                <a key={item.label}>#{item.label}</a>
              ))}
            </Col>
          </Row>
        </h4>
        {props.lead.description ? (
          <h4>
            <Row>
              <Col span={4}>
                <span style={{ fontWeight: '600' }}>Description: </span>
              </Col>
              <Col span={19}>
                <p style={{ display: 'inline' }}>{props.lead.description}</p>
              </Col>
            </Row>
          </h4>
        ) : null}
        {props.lead.note ? (
          <h4>
            <Row>
              <Col span={4}>
                <span style={{ fontWeight: '600' }}>Note: </span>
              </Col>
              <Col span={19}>
                <p style={{ display: 'inline' }}>{props.lead.note}</p>
              </Col>
            </Row>
          </h4>
        ) : null}
      </div>
    </>
  );
};
export default LeadInfomation;

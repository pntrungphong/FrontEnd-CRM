import React from 'react';
import { Col, Row } from 'antd';
import { history } from 'umi';

const CustomHeader = (props) => {
  return (
    <div>
      <Row>
        <Col flex={6}>
          <Row>
            <h2 style={{ fontWeight: '600' }}>{props.name}</h2>
          </Row>
          <Row>
            <h3>
              <a
                onClick={() => {
                  history.push({
                    pathname: `/client/company/detail/${props.company.id}`,
                  });
                }}
              >
                {props.company.label}
              </a>
            </h3>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CustomHeader;

import React from 'react';
import { Col, Row, Tag } from 'antd';
import { history } from 'umi';
import { laneColor } from '../laneTitle';
import MarkDealLeadModal from './markDealLeadModal';

const lane = {
  PC: 'Product Consulting',
  LM: 'Lead Management',
  PH: 'Proposal Handling',
};

const CustomHeader = (props) => {
  return (
    <div>
      <Row>
        <Col flex={6}>
          <Row>
            <Col span={7}>
              <h2 style={{ fontWeight: '600' }}>{props.name}</h2>
            </Col>
            <Col span={10}>
              <Tag color={laneColor[`#${props.currentType}`]}>{lane[props.currentType]}</Tag>
            </Col>
            <Col span={3}>
              <MarkDealLeadModal
                currentTouchPoint={props.currentTouchPoint}
                leadId={props.leadId}
                currentStatus={props.currentStatus}
                deal="No deal"
              />
            </Col>
            <Col span={2}>
              <MarkDealLeadModal
                currentTouchPoint={props.currentTouchPoint}
                leadId={props.leadId}
                currentStatus={props.currentStatus}
                deal="Deal"
              />
            </Col>
          </Row>
          <Row>
            <h3>
              <a
                onClick={() => {
                  history.push({
                    pathname: `/client/company/detail/${props.company.key}`,
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

import React from 'react';
import { Col, Row, Switch, message, Tag } from 'antd';
import { history, connect } from 'umi';
import { CloseOutlined } from '@ant-design/icons';
import { laneColor } from '../laneTitle';
import MarkDealLeadModal from './markDealLeadModal';

const lane = {
  PC: 'Product Consulting',
  LM: 'Lead Management',
  PH: 'Proposal Handling',
};

const CustomHeader = connect(({ lead, loading }) => ({
  lead,
  getLoading: loading.effects['lead/changeHov'],
}))((props) => {
  const changeHov = (value) => {
    props
      .dispatch({
        type: 'lead/changeHov',
        payload: { id: props.leadId, onHov: value },
      })
      .then((returnValue) => {
        if (returnValue) {
          message.success('Move Successfully');
          props.dispatch({ type: 'lead/getListWithLane', payload: {} });
        }
      });
  };

  return (
    <div>
      <Row>
        <Col flex={6}>
          <Row>
            <Col span={7}>
              <h2 style={{ fontWeight: '600' }}>{props.name}</h2>
            </Col>
            <Col span={4}>
              <Tag color={laneColor[`#${props.currentType}`]}>{lane[props.currentType]}</Tag>
            </Col>
            <Col span={6}>
              <Switch
                loading={props.getLoading}
                checkedChildren="HOV"
                onChange={changeHov}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={!!props.onHov}
              />
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
});

export default CustomHeader;

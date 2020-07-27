import React from 'react';
import { Col, Row, Menu } from 'antd';
import { history } from 'umi';
import MarkDoneModal from './markdonetouchpoint';

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
                    pathname: `/company/detail/${props.company.id}`,
                  });
                }}
              >
                {props.company.name}
              </a>
            </h3>
          </Row>
        </Col>
        <Col flex={1}>
          <MarkDoneModal
            form={props.form}
            goal={props.goal}
            dispatch={props.dispatch}
            status={props.status}
            lead={props.lead}
            actualdate={props.actualdate}
            rank={props.rank}
            leadId={props.leadId}
            touchpointId={props.touchpointId}
            reloadData={props.reloadData}
          />
        </Col>
      </Row>
      <Row>
        <Menu mode="horizontal" id="menu-touchpoint-update" defaultSelectedKeys="general">
          <Menu.Item key="general">
            <a href="#general">General</a>
          </Menu.Item>
          <Menu.Item key="lead-information">
            <a href="#lead-information">Lead Information</a>
          </Menu.Item>
          <Menu.Item key="scope">
            <a href="#scope">Scope</a>
          </Menu.Item>
          <Menu.Item key="estimation">
            <a href="#estimation">Estimation</a>
          </Menu.Item>
          <Menu.Item key="pricing">
            <a href="#pricing">Pricing</a>
          </Menu.Item>
          <Menu.Item key="proposal">
            <a href="#proposal">Proposal</a>
          </Menu.Item>
          <Menu.Item key="quotation">
            <a href="#quotation">Quotation</a>
          </Menu.Item>
          <Menu.Item key="sla">
            <a href="#sla">SLA</a>
          </Menu.Item>
        </Menu>
      </Row>
    </div>
  );
};

export default CustomHeader;

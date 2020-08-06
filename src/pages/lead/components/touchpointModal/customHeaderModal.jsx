import React from 'react';
import { Col, Row } from 'antd';
import { history } from 'umi';

const CustomHeader = (props) => {
  // const onClickNavLink = (event, tag) => {
  //   event.preventDefault();
  //   const targetSection = document.querySelector(tag);
  //   const topMenu = document.querySelector('#menu-touchpoint-update');
  //   const topMenuHeight = topMenu.offsetHeight + topMenu.offsetTop + 10;
  //   document.querySelector('.ant-modal-body').scrollTo(0, targetSection.offsetTop - topMenuHeight);
  // };

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
      </Row>
      {/* <Row>
        <Menu mode="horizontal" id="menu-touchpoint-update" defaultSelectedKeys="general">
          <Menu.Item key="general">
            <a href="#general" onClick={(event) => onClickNavLink(event, '#general')}>
              General
            </a>
          </Menu.Item>
          <Menu.Item key="lead-information">
            <a
              href="#lead-information"
              onClick={(event) => onClickNavLink(event, '#lead-information')}
            >
              Lead Information
            </a>
          </Menu.Item>
          <Menu.Item key="scope">
            <a href="#scope" onClick={(event) => onClickNavLink(event, '#scope')}>
              Scope
            </a>
          </Menu.Item>
          <Menu.Item key="estimation">
            <a href="#estimation" onClick={(event) => onClickNavLink(event, '#estimation')}>
              Estimation
            </a>
          </Menu.Item>
          <Menu.Item key="pricing">
            <a href="#pricing" onClick={(event) => onClickNavLink(event, '#pricing')}>
              Pricing
            </a>
          </Menu.Item>
          <Menu.Item key="proposal">
            <a href="#proposal" onClick={(event) => onClickNavLink(event, '#proposal')}>
              Proposal
            </a>
          </Menu.Item>
          <Menu.Item key="quotation">
            <a href="#quotation" onClick={(event) => onClickNavLink(event, '#quotation')}>
              Quotation
            </a>
          </Menu.Item>
          <Menu.Item key="sla">
            <a href="#sla" onClick={(event) => onClickNavLink(event, '#sla')}>
              SLA
            </a>
          </Menu.Item>
        </Menu>
      </Row> */}
    </div>
  );
};

export default CustomHeader;

import { Row, Col } from 'antd';
import React from 'react';
import CardLead from './components/cardLead';
import styles from './style.less';

const DashBoard = () => {
  return (
    <>
      <div className={styles.containerBox}>
        <div className={styles.laneNameCol} />
        <div className={styles.lanePlace}>
          <div className={styles.touchPointNav}>
            <Row gutter={[8, 8]} className={styles.listTP}>
              <Col span={3} className={styles.touchPoint}>
                <h1>#1</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#2</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#3</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#4</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#5</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#6</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#7</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#8</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#9</h1>
              </Col>
              <Col span={3} className={styles.touchPoint}>
                <h1>#10</h1>
              </Col>
            </Row>
          </div>
          <Row gutter={[8, 8]} className={styles.lane}>
            <div className={styles.laneNameCol}>
              <div className={styles.laneName}>
                <h3 className={styles.laneTag}>#Hov</h3>
              </div>
            </div>
            <Col span={3} offset={3} className={styles.cardCol}>
              <CardLead />
              <CardLead />
              <CardLead />
              <CardLead />
            </Col>
          </Row>
          <Row gutter={[8, 8]} className={styles.lane}>
            <div className={styles.laneNameCol}>
              <div className={styles.laneName}>
                <h3 className={styles.laneTag}>#LM</h3>
              </div>
            </div>
            <Col span={3} offset={3} className={styles.cardCol}>
              <CardLead />
              <CardLead />
              <CardLead />
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <CardLead />
            </Col>
          </Row>
          <Row gutter={[8, 8]} className={styles.lane}>
            <div className={styles.laneNameCol}>
              <div className={styles.laneName}>
                <h3 className={styles.laneTag}>#PC</h3>
              </div>
            </div>
            <Col span={3} offset={3} className={styles.cardCol}>
              <CardLead />
              <CardLead />
              <CardLead />
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <CardLead />
            </Col>
          </Row>
          <Row gutter={[8, 8]} className={styles.lane}>
            <div className={styles.laneNameCol}>
              <div className={styles.laneName}>
                <h3 className={styles.laneTag}>#PH</h3>
              </div>
            </div>
            <Col span={3} offset={3} className={styles.cardCol}>
              <CardLead />
              <CardLead />
              <CardLead />
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <CardLead />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DashBoard;

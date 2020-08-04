import { Row, Col } from 'antd';
import React from 'react';
import styles from './style.less';

const DashBoard = () => {
  return (
    <>
      <div className={styles.touchPointNav}>
        <Row gutter={[8, 16]}>
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
        </Row>
      </div>
      <div className={styles.containerBox}>
        <div className={styles.laneNameCol}>
          <div className={styles.laneName}>
            <h3>#Hov</h3>
          </div>
          <div className={styles.laneName}>
            <h3>#LM</h3>
          </div>
          <div className={styles.laneName}>
            <h3>#PC</h3>
          </div>
          <div className={styles.laneName}>
            <h3>#PH</h3>
          </div>
        </div>
        <div className={styles.lanePlace}>
          <Row gutter={[8, 16]} className={styles.lane}>
            <Col span={3} offset={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
          </Row>
          <Row gutter={[8, 16]} className={styles.lane}>
            <Col span={3} offset={6} className={styles.cardCol}>
              <div className={styles.cardLead} />
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <div className={styles.cardLead} />
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <div className={styles.cardLead} />
            </Col>
            <Col span={3} className={styles.cardCol}>
              <div className={styles.cardLead} />
            </Col>
            <Col span={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
          </Row>
          <Row gutter={[8, 16]} className={styles.lane}>
            <Col span={3} offset={9} className={styles.cardCol}>
              <div className={styles.cardLead} />
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <div className={styles.cardLead} />
            </Col>
            <Col span={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
            <Col span={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
          </Row>
          <Row gutter={[8, 16]} className={styles.lane}>
            <Col span={3} offset={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
            <Col span={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
            <Col span={3} offset={3} className={styles.cardCol}>
              <div className={styles.cardLead}>17:00 23/08</div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DashBoard;

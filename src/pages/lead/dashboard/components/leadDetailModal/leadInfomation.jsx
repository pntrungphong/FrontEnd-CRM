import React from 'react';
import { history } from 'umi';
import { Col, Row, List } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './style.less';
import { rankTitle } from '../../../components/definition';

// if function
class LeadInfomation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLess: true,
    };
  }

  listComponent = [
    <h4>
      <Row>
        <Col span={3}>
          <span style={{ fontWeight: '600' }}>Rank:</span>
        </Col>
        <Col span={19}>{rankTitle[this.props.lead.rank]}</Col>
      </Row>
    </h4>,
    <h4>
      <Row>
        <Col span={3}>
          <span style={{ fontWeight: '600' }}>Contact:</span>
        </Col>
        <Col span={19}>
          {this.props.lead.contact.map((item, index, listContact) => (
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
    </h4>,
    this.props.lead.description ? (
      <h4>
        <Row>
          <Col span={3}>
            <span style={{ fontWeight: '600' }}>Tag: </span>
          </Col>
          <Col span={19}>
            {this.props.lead.tag.map((item) => (
              <a key={item.label}>#{item.label}</a>
            ))}
          </Col>
        </Row>
      </h4>
    ) : (
      ''
    ),
    this.props.lead.description ? (
      <h4>
        <Row>
          <Col span={3}>
            <span style={{ fontWeight: '600' }}>Description: </span>
          </Col>
          <Col span={19}>
            <p style={{ display: 'inline' }}>{this.props.lead.description}</p>
          </Col>
        </Row>
      </h4>
    ) : (
      ''
    ),
    this.props.lead.note ? (
      <h4>
        <Row>
          <Col span={3}>
            <span style={{ fontWeight: '600' }}>Note: </span>
          </Col>
          <Col span={19}>
            <p style={{ display: 'inline' }}>{this.props.lead.note}</p>
          </Col>
        </Row>
      </h4>
    ) : (
      ''
    ),
  ];

  onLoadMore = (showLess) => {
    this.setState({
      showLess,
    });
  };

  ControllerButton = (btnProps) => {
    if (!btnProps) return null;
    return (
      <div className={styles.controllerButton}>
        {this.state.showLess ? (
          <a onClick={() => this.onLoadMore(false)}>
            Show more <DownOutlined style={{ fontSize: '10px' }} />
          </a>
        ) : (
          <a onClick={() => this.onLoadMore(true)}>
            Show less <UpOutlined style={{ fontSize: '10px' }} />
          </a>
        )}
      </div>
    );
  };

  render() {
    const listData = this.listComponent.slice(
      0,
      this.state.showLess ? 1 : this.listComponent.length,
    );
    return (
      <>
        <div className={styles.contentLead}>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            loadMore={this.ControllerButton(this.listComponent.length > 2)}
            dataSource={listData}
            renderItem={(item) => item}
          />
        </div>
      </>
    );
  }
}
export default LeadInfomation;

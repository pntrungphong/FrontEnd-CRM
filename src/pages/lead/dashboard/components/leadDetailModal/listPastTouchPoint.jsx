import React from 'react';
import { List } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import TouchPointModal from './touchpointmodal';
import styles from './style.less';

class ListPastTouchPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLess: true,
    };
  }

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
    const { touchPoints } = this.props;
    const listData = touchPoints.slice(0, this.state.showLess ? 3 : touchPoints.length);
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          loadMore={this.ControllerButton(touchPoints.length > 3)}
          locale={{ emptyText: 'No touchpoint yet' }}
          renderItem={(item) => (
            <TouchPointModal
              key={item.id}
              update
              status={item.status}
              leadId={this.props.leadId}
              touchPoint={item}
            />
          )}
        />
      </>
    );
  }
}

export default ListPastTouchPoint;

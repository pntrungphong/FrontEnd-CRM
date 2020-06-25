import { Card, Descriptions, Divider, Tag, Spin, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { one, two, three, five } from './style.less';

class ContactDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contact/loading',
      payload: { id: this.props.location.query.id },
    });
  }

  render() {
    const { contact } = this.props;
    if (contact.data === undefined) {
      return <Spin />;
    }
    return (
      <PageHeaderWrapper title="Contact Details/">
        <Card bordered="true">
          <div className={one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={two} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Name">
              {contact.data.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Email">
              {contact.data.email}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Tag">
              123
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Website">
              {contact.data.website}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />

          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Phone">
              {contact.data.phone}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Company">
              <Tag>123</Tag>
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ contact, loading }) => ({
  contact,
  querying: loading.effects['contact/loading'],
}))(ContactDetail);

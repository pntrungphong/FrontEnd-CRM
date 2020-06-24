import { Card, Descriptions, Divider, Tag, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { one, two, three, five } from './style.less';

class ContactDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactModel/loadInfo',
    });
  }

  render() {
    const { contactModel } = this.props;
    return (
      <PageHeaderWrapper title="Contact Details/">
        <Card bordered="true">
          <div className={one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={two} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Name">
              {contactModel.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Email">
              {contactModel.email}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Tag">
              <Tag>{contactModel.tag}</Tag>
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Website">
              {contactModel.website}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Address">
              {contactModel.address}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Url">
              {contactModel.url}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Phone">
              {contactModel.phone}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Company">
              {contactModel.company}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ contactModel, loading }) => ({
  contactModel,
  loading: loading.effects['contactModel/loadInfo'],
}))(ContactDetail);

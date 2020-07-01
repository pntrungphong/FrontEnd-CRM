import { Card, Descriptions, Spin, Divider, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { one, two, three, five } from './style.less';

class LeadDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'lead/loading',
      payload: { id: this.props.location.query.id },
    });
  }

  render() {
    const { lead } = this.props;
    if (lead.data === undefined) {
      return <Spin />;
    }
    return (
      <PageHeaderWrapper title="Lead Details">
        <Card bordered="true">
          <div className={one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={two} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Name">
              {lead.data.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Email">
              {lead.data.email}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Tag">
              {lead.data.tag}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Website">
              {lead.data.website}
            </Descriptions.Item>
          </Descriptions>
          {/* <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Contact">
              {lead.data.contact.map((item) => {
                return (
                  <>
                    <Tag key={item.contactId}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: '/contact/detail',
                            query: {
                              id: item.contactId,
                            },
                          });
                        }}
                      >
                        {item.contactId}
                      </a>
                    </Tag>
                    ,
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions> */}
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Address">
              {lead.data.address}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Url">
              {lead.data.url}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Phone">
              {lead.data.phone}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ lead, loading }) => ({
  lead,
  querying: loading.effects['lead/loading'],
}))(LeadDetail);

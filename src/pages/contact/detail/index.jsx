import { Card, Descriptions, Divider, Tag, Spin, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import { one, two, three, five } from './style.less';
import { StylesProvider } from '@material-ui/core';

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
      <PageHeaderWrapper title="Contact Details">
        <Card bordered="true">
          <div className={one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={two} />
          <Descriptions bordered className={StylesProvider.four}>
            <Descriptions.Item className={five} span={3} label="Name">
              {contact.data.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={two} />
          <Descriptions bordered className={StylesProvider.four}>
            <Descriptions.Item className={five} span={3} label="Title">
              {contact.data.title}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Title">
              {contact.data.title}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Email">
              {contact.data.email.map((item) => {
                return (
                  <>
                    <Tag key={item.url}>{item.url}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Phone">
              {contact.data.phone.map((item) => {
                return (
                  <>
                    <Tag key={item.number}>{item.number}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>

          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Tag">
              {contact.data.tag}
              {/* {contact.data.tag.map((item) => {
                return (
                  <>
                    <Tag key={item}>{item}</Tag>,
                  </>
                );
              })} */}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Referral">
              {contact.data.referral.map((item) => {
                return (
                  <>
                    <Tag key={item.key}>{item.value}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Company">
              {contact.data.company.map((item) => {
                return (
                  <>
                    <Tag key={item.key}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: '/company/detail',
                            query: {
                              id: item.key,
                            },
                          });
                        }}
                      >
                        {item.value}
                      </a>
                    </Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Website">
              {contact.data.website.map((item) => {
                return (
                  <>
                    <Tag key={item.url}>{item.url}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>

          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Address">
              {contact.data.address.map((item) => {
                return (
                  <>
                    <Tag key={item}>{item}</Tag>
                  </>
                );
              })}
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

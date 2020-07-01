import { Card, Descriptions, Spin, Divider, Avatar, Tag } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import { one, two, three, five } from './style.less';

class CompanyDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'company/loading',
      payload: { id: this.props.location.query.id },
    });
  }

  render() {
    const { company } = this.props;
    if (company.data === undefined) {
      return <Spin />;
    }
    return (
      <PageHeaderWrapper title="Company Details">
        <Card bordered="true">
          <div className={one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={two} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Name">
              {company.data.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Email">
              {company.data.email.map((item) => {
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
            <Descriptions.Item className={five} span={3} label="Tag">
              {company.data.tag.map((item) => {
                return (
                  <>
                    <Tag key={item.tag}>{item.tag}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Phone">
              {company.data.phone.map((item) => {
                return (
                  <>
                    <Tag key={item.number}>{item.number}</Tag>
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={two} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Url">
              {company.data.url}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Website">
              {company.data.website.map((item) => {
                return (
                  <>
                    <Tag key={item.url}>{item.url}</Tag>,
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Contact">
              {company.data.contact.map((item) => {
                return (
                  <>
                    <Tag key={item.name}>
                      <a
                        onClick={() => {
                          history.push({
                            pathname: '/contact/detail',
                            query: {
                              id: item.id,
                            },
                          });
                        }}
                      >
                        {item.name}
                      </a>
                    </Tag>
                    ,
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Address">
              {company.data.address.map((item) => {
                return (
                  <>
                    <Tag key={item}>{item}</Tag>,
                  </>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ company, loading }) => ({
  company,
  querying: loading.effects['company/loading'],
}))(CompanyDetail);

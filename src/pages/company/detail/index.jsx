import { Card, Descriptions, Spin, Divider, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'umi';
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
              {company.data.email}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Tag">
              h
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Website">
              {company.data.website}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Address">
              {company.data.address}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Url">
              {company.data.url}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered className={three}>
            <Descriptions.Item className={five} span={3} label="Phone">
              {company.data.phone}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ company, loading }) => ({
  company,
  querying: loading.effects['company/loading'],
}))(CompanyDetail);

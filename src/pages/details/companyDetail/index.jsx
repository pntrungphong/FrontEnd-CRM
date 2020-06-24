import { Card, Descriptions, Divider, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { one, two, three, five } from './style.less';

class CompanyDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'companyModel/loadInfo',
    });
  }

  render() {
    const { companyModel } = this.props;
    return (
      <PageHeaderWrapper title="Company Details/">
        <Card bordered="true">
          <div className={one}>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <Divider className={two} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Name">
              {companyModel.name}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Email">
              {companyModel.email}
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
              {companyModel.website}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Address">
              {companyModel.address}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Url">
              {companyModel.url}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered className={three}>
            <Descriptions.Item className={five} span={3} label="Phone">
              {companyModel.phone}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
          <Descriptions bordered>
            <Descriptions.Item className={five} span={3} label="Url">
              {companyModel.phone}
            </Descriptions.Item>
          </Descriptions>
          <Divider className={three} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ companyModel, loading }) => ({
  companyModel,
  loading: loading.effects['company/loadInfo'],
}))(CompanyDetail);

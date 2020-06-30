import { Card, Descriptions, Spin, Divider, Avatar,Tag} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UserOutlined } from '@ant-design/icons';
import { connect,history } from 'umi';
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
              {company.data.tag}

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
            <Descriptions.Item className={five} span={3} label="Contact">
              {company.data.contact.map((item) => {
                return <>
                  <Tag key={item.contactId}><a
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
          </Tag>,
                </>;
              })}
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
          <Descriptions bordered >
            <Descriptions.Item className={five} span={3} label="Phone">
              {company.data.phone}
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

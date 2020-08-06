import React from 'react';
import { Descriptions, Spin } from 'antd';
import { connect, history } from 'umi';
import styles from '../style.less';

class PopInfomation extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'company/get',
      payload: {
        id: this.props.id,
      },
    });
  };

  render() {
    const { detail } = this.props.company;
    if (this.props.getting === true || !detail) return <Spin />;
    return (
      <>
        <Descriptions title={detail.name} column={1} style={{ width: '300px' }}>
          <Descriptions.Item label="Contact">
            {detail.contact.map((item, index, list) => (
              <a
                key={`link${index}`}
                onClick={() => history.push(`/client/contact/detail/${item.key}`)}
              >
                {item.label}
                {index + 1 !== list.length ? ', ' : ''}
              </a>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {detail.phone.length ? detail.phone[0].number : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {detail.email.length ? detail.email[0].url : ''}
          </Descriptions.Item>
        </Descriptions>
        <a
          onClick={() => history.push(`/client/company/detail/${detail.id}`)}
          className={styles.moreDetailBtn}
        >
          {' '}
          More...{' '}
        </a>
      </>
    );
  }
}
export default connect(({ company, loading }) => ({
  company,
  getting: loading.effects['company/get'],
}))(PopInfomation);

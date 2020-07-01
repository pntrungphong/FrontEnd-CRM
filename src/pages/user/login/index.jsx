import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles, { cusForm } from './style.less';

const NormalLoginForm = (props) => {
  const onFinish = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.large}>
      <Form
        name="normal_login"
        className={cusForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1 className={styles.titleOne}>Welcome Harmonica</h1>
        <div className={styles.medium}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              style={{ borderColor: 'cadetblue' }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
        </div>

        <div className={styles.mediumOne}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              style={{ borderColor: 'cadetblue' }}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={props.submitting}
              type="primary"
              htmlType="submit"
              className={styles.butt}
            >
              Log in
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['login/login'],
}))(NormalLoginForm);

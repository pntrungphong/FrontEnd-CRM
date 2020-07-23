// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './index.less';

const NormalLoginForm = (props) => {
  const onFinish = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.small}>
      <Form
        name="normal_login"
        className={styles.cusForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div>
          <img src="/logo.png" alt="" width="560px" height="168px" />
        </div>
        <h1 className={styles.titleOne}>Welcome</h1>

        <div className={styles.mediumOne}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            {/* <h3>Email</h3> */}
            <Input
              // prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className={styles.inputOne}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            {/* <h3>PassWord:</h3> */}
            <Input
              className={styles.inputOne}
              // prefix={<LockOutlined className={styles.icon} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div className={styles.demo}>
            <Checkbox>Remember Me</Checkbox>
            <a>
              <b className={styles.text}>Forgot Password</b>
            </a>
          </div>

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

      <div className={styles.imgMain}>
        <img src="https://geekup.hexaspace.vn/images/254e00fa6bec87d593748b68dfe69313.svg" alt="" />
      </div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))(NormalLoginForm);

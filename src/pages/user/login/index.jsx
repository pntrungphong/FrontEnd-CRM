import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './style.less';

const NormalLoginForm = (props) => {
  const onFinish = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.boxContainer}>
      <div className={styles.boxContent}>
        <div className={styles.formBox}>
          <Form
            name="normal_login"
            className={styles.customForm}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className={styles.loginLogo}>
              <img src="/square-logo.png" alt="" />
            </div>
            <h1 className={styles.loginTitle}>Welcome!</h1>

            <div className={styles.loginForm}>
              <Form.Item
                className={styles.customFormLabel}
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input size="large" placeholder="Email" className={styles.inputOne} />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  className={styles.inputOne}
                  size="large"
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <div className={styles.subtitle}>
                <Checkbox>Remember Me</Checkbox>
                <a>
                  <b className={styles.text}>Forgot Password</b>
                </a>
              </div>

              <Form.Item>
                <Button
                  block
                  loading={props.submitting}
                  type="primary"
                  htmlType="submit"
                  className={styles.loginButton}
                >
                  Sign in
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))(NormalLoginForm);

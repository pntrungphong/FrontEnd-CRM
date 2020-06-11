import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Alert, Form } from 'antd';
import React, { useState } from 'react';
import { connect, Link } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userAndlogin = {}, submitting } = props;
  const { status, type: loginType } = userAndlogin;
  const [type, setType] = useState('account');
  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (data) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: { ...data, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content="Welcome to Harmonia" />
        )}

        <Form.Item>
          <TextField
            type="email"
            name="userName"
            placeholder="Email Address"
            autoComplete="off"
            rules={[
              {
                required: true,
                message: 'Email address required!',
              },
            ]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <UserAddOutlined />
                </InputAdornment>
              ),
            }}
          />
        </Form.Item>

        <Form.Item>
          <TextField
            name="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Form.Item>
        <Submit loading={submitting}>Login</Submit>
        <div className={styles.other}>
          Not a registered?
          <Link className={styles.register} to="/user/register">
            Find out more and let's connect
          </Link>
        </div>
        <div>
          <a
            style={{
              float: 'right',
            }}
          >
            Forgot Password?
          </a>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))(Login);

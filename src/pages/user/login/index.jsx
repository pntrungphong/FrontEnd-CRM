import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'umi';
import style, { cusForm } from './style.less';


const NormalLoginForm = (props) => {
  const onFinish = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={style.large}>

      <Form
        name="normal_login"
        className={cusForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1 className={style.titleOne}>Welcome Harmonica</h1>
        <div className={style.medium}>
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

        <div className={style.mediumOne}>
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
              style={{ marginLeft: '90px', backgroundColor: 'cadetblue', borderColor: 'cadetblue' }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
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

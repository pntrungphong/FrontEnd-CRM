import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import Image404 from '../assets/404.svg';

const NoFoundPage = () => (
  <Result
    icon={<img src={Image404} alt="" />}
    extra={
      <>
        <div />
        <Button type='primary' onClick={() => history.push('/')}>
          Back Home
        </Button>
      </>
    }
  />
);

export default NoFoundPage;

import { history } from 'umi';
import { Button, Result } from 'antd';
import React from 'react';
import Image404 from '@/assets/404.svg';

export default () => (
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

import { history } from 'umi';
import { Button, Result } from 'antd';
import React from 'react';
import Image500 from '@/assets/500.svg';

export default () => (
  <Result
    icon={<img src={Image500} alt="" />}
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

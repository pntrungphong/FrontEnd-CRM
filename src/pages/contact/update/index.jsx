import { Spin, Form, Button, Breadcrumb } from 'antd';
import React, { useRef, useEffect, useState } from 'react';
import { connect, history } from 'umi';
import { useMount, useUnmount } from 'ahooks';
import SharedForm from '../components/sharedFormv2';

import styles from './style.less';

const layout = {
  labelCol: { span: 8 },
};

const Update = connect(({ contact, tag, loading }) => ({
  contact: contact.detail,
  tag: tag.tag,
  submitting: loading.effects['contact/update'],
  querying: loading.effects['contact/get'],
}))((props) => {
  const formRef = useRef(null);
  const [disableButton, setDisableButton] = useState(true);

  useMount(() => {
    props.dispatch({
      type: 'contact/get',
      payload: { id: props.match.params.id },
    });
    props.dispatch({
      type: 'tag/getTag',
    });
  });

  useEffect(() => {
    document.title = 'Update Contact - Harmonia';
  });

  useUnmount(() => {
    props.dispatch({
      type: 'contact/cleanData',
    });
  });

  const onFinish = (values) => {
    props.dispatch({
      type: 'contact/update',
      payload: { ...values, id: props.match.params.id },
    });
  };

  const onValuesChange = () => {
    if (disableButton) {
      setDisableButton(false);
    }
  };

  if (!props.contact || props.querying) {
    return <Spin />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.editBread}>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              href="#"
              onClick={() => {
                history.push({
                  pathname: `/client/contact`,
                });
              }}
            >
              Contact
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Update</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.header}>
        <h2 className={styles.title}> Update Contact</h2>
      </div>
      <Form
        {...layout}
        ref={formRef}
        name="nest-messages"
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        initialValues={{
          name: props.contact.name,
          phone: props.contact.phone,
          website: props.contact.website,
          email: props.contact.email,
          tag: props.contact.tag,
          title: props.contact.title,
          referral: props.contact.referral,
          address: props.contact.address,
          company: props.contact.company,
        }}
      >
        <SharedForm tag={props.tag} formRef={formRef} />
        <div className={styles.aroundBtn}>
          <Form.Item wrapperCol={{ offset: 8 }} className={styles.editBtn}>
            <Button
              disabled={disableButton}
              size="middle"
              type="primary"
              htmlType="submit"
              loading={props.submitting}
            >
              Update
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                history.push({
                  pathname: `/client/contact`,
                });
              }}
              size="middle"
              type="primary"
            >
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
});

export default Update;

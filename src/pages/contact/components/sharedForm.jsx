import { Form, Input, Button, Row, Select } from 'antd';
import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../style.less';
import QuickCreate, { CreateType } from '../../common/quickCreate';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
};

const SharedForm = (props) => {
  const email = props.contactDetail?.email ?? [];
  const website = props.contactDetail?.website ?? [];
  const address = props.contactDetail?.address ?? [];
  return (
    <div className={styles.getAll}>
      <Form.Item
        {...formItemLayout}
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input contact's name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="contact" label="Contact" className={styles.editOne}>
        <QuickCreate
          formRef={props.formRef}
          placeholder="Type and select a contact"
          createType={CreateType.CONTACT}
          dataIndex="contact"
        />
      </Form.Item>
      <Form.Item {...formItemLayout} name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item {...formItemLayout} name="company" label="Company" dataIndex="company">
        <QuickCreate
          formRef={props.formRef}
          placeholder="Type and select a company"
          createType={CreateType.COMPANY}
          dataIndex="company"
        />
      </Form.Item>
      <Form.Item {...formItemLayout} name="referral" label="Referral">
        <QuickCreate
          formRef={props.formRef}
          placeholder="Type and select a referral"
          createType={CreateType.CONTACT}
          dataIndex="referral"
        />
      </Form.Item>
      <Form.List name="phone">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Form.Item
                    {...field}
                    {...formItemLayout}
                    label={index === 0 ? 'Phone' : ' '}
                    colon={!index}
                    className={styles.phoneFormItem}
                    name={[field.name, 'number']}
                    fieldKey={[field.fieldKey, 'number']}
                    rules={[{ required: true, message: 'Please enter phone!' }]}
                  >
                    <div className={styles.customLayoutRow}>
                      <Input defaultValue={email[index]?.url} />
                      <Form.Item
                        className={styles.typeFormItem}
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                        rules={[{ required: true, message: 'Select type' }]}
                      >
                        <Select placeholder="Type">
                          <Option value="Primary">Primary</Option>
                          <Option value="Contact">Contact</Option>
                          <Option value="Personal">Personal</Option>
                        </Select>
                      </Form.Item>
                      {index > 0 ? (
                        <MinusCircleOutlined
                          style={{ fontSize: 'medium', margin: 'auto 10px' }}
                          onClick={() => remove(field.name)}
                        />
                      ) : (
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customEmptySpace]}
                        />
                      )}
                    </div>
                  </Form.Item>
                </Row>
              ))}
              <Form.Item
                {...formItemLayout}
                label={fields.length > 0 ? ' ' : 'Phone'}
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add phone
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <Form.List name="email">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Form.Item
                    {...field}
                    {...formItemLayout}
                    label={index === 0 ? 'Email' : ' '}
                    colon={!index}
                    className={styles.phoneFormItem}
                    name={[field.name, 'url']}
                    fieldKey={[field.fieldKey, 'url']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter email',
                      },
                      {
                        type: 'email',
                        message: 'This field must be a valid email.',
                      },
                    ]}
                  >
                    <div className={styles.customLayoutRow}>
                      <Input defaultValue={email[index]?.url} />
                      <Form.Item
                        className={styles.typeFormItem}
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                        rules={[{ required: true, message: 'Select type' }]}
                      >
                        <Select placeholder="Type">
                          <Option value="Primary">Primary</Option>
                          <Option value="Contact">Contact</Option>
                          <Option value="Personal">Personal</Option>
                        </Select>
                      </Form.Item>
                      {index > 0 ? (
                        <MinusCircleOutlined
                          style={{ fontSize: 'medium', margin: 'auto 10px' }}
                          onClick={() => remove(field.name)}
                        />
                      ) : (
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customEmptySpace]}
                        />
                      )}
                    </div>
                  </Form.Item>
                </Row>
              ))}
              <Form.Item
                {...formItemLayout}
                label={fields.length > 0 ? ' ' : 'Email'}
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add email
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <Form.List name="website">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Form.Item
                    {...field}
                    {...formItemLayout}
                    label={index === 0 ? 'Social Link' : ' '}
                    colon={!index}
                    className={styles.phoneFormItem}
                    name={[field.name, 'url']}
                    fieldKey={[field.fieldKey, 'url']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Social Link',
                      },
                      {
                        type: 'url',
                        message: 'This field must be a valid Social Link.',
                      },
                    ]}
                  >
                    <div className={styles.customLayoutRow}>
                      <Input defaultValue={website[index]?.url} />
                      <Form.Item
                        className={styles.typeFormItem}
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                        rules={[{ required: true, message: 'Select type' }]}
                      >
                        <Select placeholder="Type">
                          <Option value="Facebook">Facebook</Option>
                          <Option value="Skype">Skype</Option>
                          <Option value="Zalo">Zalo</Option>
                          <Option value="Youtube">Youtube</Option>
                          <Option value="Linkedin">Linkedin</Option>
                          <Option value="Instagram">Instagram</Option>
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined
                        style={{ fontSize: 'medium', margin: 'auto 10px' }}
                        onClick={() => remove(field.name)}
                      />
                    </div>
                  </Form.Item>
                </Row>
              ))}
              <Form.Item
                {...formItemLayout}
                label={fields.length > 0 ? ' ' : 'Social Link'}
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add social link
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.List name="address">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Form.Item
                    {...field}
                    {...formItemLayout}
                    label={index === 0 ? 'Address' : ' '}
                    colon={!index}
                    className={styles.phoneFormItem}
                    name={[field.name, 'address']}
                    fieldKey={[field.fieldKey, 'address']}
                    rules={[{ required: true, message: 'Please enter address!' }]}
                  >
                    <div className={styles.customLayoutRow}>
                      <Input
                        defaultValue={address[index]?.address}
                        addonAfter={
                          <MinusCircleOutlined
                            style={{ fontSize: 'medium' }}
                            onClick={() => remove(field.name)}
                          />
                        }
                      />
                    </div>
                  </Form.Item>
                </Row>
              ))}
              <Form.Item
                {...formItemLayout}
                label={fields.length > 0 ? ' ' : 'Address'}
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add address
                </Button>
              </Form.Item>
              <Form.Item name="tag" {...formItemLayout} label="Tag" className={styles.editOne}>
                <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
                  {props.tag.map((item) => {
                    return <Option key={item.key}>{item.label}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

export default SharedForm;

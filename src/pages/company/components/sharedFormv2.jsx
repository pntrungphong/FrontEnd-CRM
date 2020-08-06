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
  return (
    <div className={styles.getAll}>
      <div>
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input company's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item {...formItemLayout} name="contact" label="Contact" className={styles.editOne}>
        <QuickCreate
          formRef={props.formRef}
          placeholder="Type and select a contact"
          createType={CreateType.CONTACT}
          dataIndex="contact"
        />
      </Form.Item>
      <Form.Item
        name="url"
        label="Website"
        {...formItemLayout}
        rules={[
          {
            type: 'url',
            message: 'This field must be a valid website.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="tag" {...formItemLayout} label="Tag" className={styles.editOne}>
        <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
          {props.tag.map((item) => {
            return <Option key={item.key}>{item.label}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.List name="phone">
        {(fields, { add, remove }) => {
          return (
            <div style={{ width: '104%' }}>
              {fields.map((field, index) => (
                <div className={styles.editInput}>
                  <Row key={field.key} className={styles.phoneFormItem}>
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
                      <Input pattern="^[0-9]{10}$" className={styles.getInput} />
                    </Form.Item>
                  </Row>
                  <div className={styles.iconOne}>
                    {index > 0 ? (
                      <MinusCircleOutlined
                        className={styles.icon}
                        onClick={() => remove(field.name)}
                      />
                    ) : (
                      <MinusCircleOutlined
                        className={['dynamic-delete-button', styles.customEmptySpace]}
                        onClick={() => remove(field.name)}
                      />
                    )}
                  </div>
                </div>
              ))}
              <Form.Item
                {...formItemLayout}
                label={fields.length > 0 ? ' ' : 'Phone'}
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add Phone
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.List name="email">
        {(fields, { add, remove }) => {
          return (
            <div style={{ width: '104%' }}>
              {fields.map((field, index) => (
                <div className={styles.editInput}>
                  <Row key={field.key} className={styles.phoneFormItemOne}>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      label={index === 0 ? 'Email' : ' '}
                      colon={!index}
                      className={styles.phoneFormItemOne}
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
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Row>
                  <Form.Item
                    className={styles.typeFormItem}
                    name={[field.name, 'type']}
                    fieldKey={[field.fieldKey, 'type']}
                    rules={[{ required: true, message: 'Select type' }]}
                  >
                    <Select placeholder="Type">
                      <Option value="Primary">Primary</Option>
                      <Option value="Company">Company</Option>
                      <Option value="Personal">Personal</Option>
                    </Select>
                  </Form.Item>
                  <div className={styles.iconOne}>
                    {index > 0 ? (
                      <MinusCircleOutlined
                        className={styles.icon}
                        onClick={() => remove(field.name)}
                      />
                    ) : (
                      <MinusCircleOutlined
                        className={['dynamic-delete-button', styles.customEmptySpace]}
                        onClick={() => remove(field.name)}
                      />
                    )}
                  </div>
                </div>
              ))}
              <Form.Item
                {...formItemLayout}
                label={fields.length > 0 ? ' ' : 'Email'}
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add Email
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.List name="website">
        {(fields, { add, remove }) => {
          return (
            <div style={{ width: '102.5%' }}>
              {fields.map((field, index) => (
                <div className={styles.editInput}>
                  <Row key={field.key} className={styles.phoneFormItemOne}>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      label={index === 0 ? 'Social Link' : ' '}
                      colon={!index}
                      className={styles.phoneFormItemOne}
                      name={[field.name, 'url']}
                      fieldKey={[field.fieldKey, 'url']}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter social link',
                        },
                        {
                          type: 'url',
                          message: 'This field must be a valid social link.',
                        },
                      ]}
                    >
                      <Input style={{ width: '100%' }} />
                    </Form.Item>
                  </Row>
                  <Form.Item
                    className={styles.typeFormItem}
                    name={[field.name, 'type']}
                    fieldKey={[field.fieldKey, 'type']}
                    rules={[{ required: true, message: 'Select type' }]}
                  >
                    <Select placeholder="Type">
                      <Option value="Primary">Primary</Option>
                      <Option value="Company">Company</Option>
                      <Option value="Personal">Personal</Option>
                    </Select>
                  </Form.Item>
                  <div className={styles.iconOne}>
                    {index > 0 ? (
                      <MinusCircleOutlined
                        className={styles.icon}
                        onClick={() => remove(field.name)}
                      />
                    ) : (
                      <MinusCircleOutlined
                        className={['dynamic-delete-button', styles.customEmptySpace]}
                        onClick={() => remove(field.name)}
                      />
                    )}
                  </div>
                </div>
              ))}
              <Form.Item
                {...formItemLayout}
                label={
                  fields.length > 0 ? ' ' : <div className={styles.editLabel}>Social Link</div>
                }
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add Social Link
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.List name="address">
        {(fields, { add, remove }) => {
          return (
            <div style={{ width: '104.5%' }}>
              {fields.map((field, index) => (
                <div className={styles.editInput}>
                  <Row key={field.key} className={styles.phoneFormItem}>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      label={index === 0 ? 'Address' : ' '}
                      colon={!index}
                      className={styles.phoneFormItem}
                      fieldKey={[field.fieldKey, 'address']}
                      rules={[{ required: true, message: 'Please enter address!' }]}
                    >
                      <Input className={styles.getInput} />
                    </Form.Item>
                  </Row>
                  <MinusCircleOutlined className={styles.icon} onClick={() => remove(field.name)} />
                </div>
              ))}
              <Form.Item
                {...formItemLayout}
                label={fields.length > 0 ? ' ' : 'Address'}
                colon={!(fields.length > 0)}
              >
                <Button onClick={() => add()} className={styles.addButton}>
                  <PlusOutlined /> Add Address
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

export default SharedForm;

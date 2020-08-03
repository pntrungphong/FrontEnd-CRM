import { Form, Input, Button, Row, Col, Select } from 'antd';
import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../style.less';
import QuickCreate, { CreateType } from '../../common/quickCreate';

const { Option } = Select;

const SharedForm = (props) => {
  return (
    <div>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="company" label="Company">
        <QuickCreate
          formRef={props.formRef}
          placeholder="Type and select a company"
          createType={CreateType.COMPANY}
          dataIndex="company"
        />
      </Form.Item>
      <Form.Item name="referral" label="Referral">
        <QuickCreate
          formRef={props.formRef}
          placeholder="Type and select a referral"
          createType={CreateType.CONTACT}
          dataIndex="referral"
        />
      </Form.Item>
      <div className={styles.editOne}>
        <Form.List name="phone" label="Phone">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col span={index === 0 ? 4 : 8} />
                    <Col flex={index === 0 ? '4.3' : '3'}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? 'Phone' : ''}
                        className={index === 0 ? styles.childrenRowWithLabel : styles.childrenRow}
                        name={[field.name, 'number']}
                        fieldKey={[field.fieldKey, 'number']}
                        rules={[{ required: true, message: 'Please enter phone!' }]}
                      >
                        <Input pattern="^[0-9]{10}$" />
                      </Form.Item>
                    </Col>
                    <Col flex="2">
                      <Form.Item
                        {...field}
                        className={styles.childrenRow}
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                        rules={[{ required: true, message: 'Select type' }]}
                      >
                        <Select placeholder="Type">
                          <Option value="Personal">Personal</Option>
                          <Option value="Primary">Primary</Option>
                          <Option value="Company">Company</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {index > 0 ? (
                      <MinusCircleOutlined
                        className={['dynamic-delete-button', styles.customDeleteButton]}
                        onClick={() => remove(field.name)}
                      />
                    ) : (
                      <MinusCircleOutlined
                        className={['dynamic-delete-button', styles.customEmptySpace]}
                      />
                    )}
                  </Row>
                ))}
                <Row>
                  <Col flex="1" />
                  <Col flex="2">
                    <Form.Item className={styles.customRow}>
                      <Button className={styles.customButtonAdd} onClick={() => add()}>
                        <PlusOutlined /> Add
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            );
          }}
        </Form.List>
      </div>
      <div className={styles.editOne}>
        <Form.List name="email">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col span={index === 0 ? 4 : 8} />
                    <Col flex={index === 0 ? '4.3' : '3'}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? 'Email' : ''}
                        className={index === 0 ? styles.childrenRowWithLabel : styles.childrenRow}
                        name={[field.name, 'url']}
                        fieldKey={[field.fieldKey, 'url']}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter email!',
                          },
                          {
                            type: 'email',
                            message: 'This field must be a valid email.',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col flex="2">
                      <Form.Item
                        {...field}
                        className={styles.childrenRow}
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
                    </Col>
                    <Col flex="none">
                      {index > 0 ? (
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customDeleteButton]}
                          onClick={() => remove(field.name)}
                        />
                      ) : (
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customEmptySpace]}
                        />
                      )}
                    </Col>
                  </Row>
                ))}
                {fields.length > 0 ? (
                  <Row>
                    <Col flex="1" />
                    <Col flex="2">
                      <Form.Item className={styles.customRow}>
                        <Button className={styles.customButtonAdd} onClick={() => add()}>
                          <PlusOutlined /> Add
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Form.Item className={styles.customRow} label="Email:">
                    <Button className={styles.customButtonAdd} onClick={() => add()}>
                      <PlusOutlined /> Add
                    </Button>
                  </Form.Item>
                )}
              </div>
            );
          }}
        </Form.List>
      </div>
      <div className={styles.editOne}>
        <Form.List name="website">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col span={index === 0 ? 4 : 8} />
                    <Col flex={index === 0 ? '4.3' : '3'}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? 'Social link' : ''}
                        className={index === 0 ? styles.childrenRowWithLabel : styles.childrenRow}
                        name={[field.name, 'url']}
                        fieldKey={[field.fieldKey, 'url']}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter url!',
                          },
                          {
                            type: 'url',
                            message: 'This field must be a valid url.',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col flex="2">
                      <Form.Item
                        {...field}
                        className={styles.childrenRow}
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
                    </Col>
                    <Col flex="none">
                      <MinusCircleOutlined
                        className={['dynamic-delete-button', styles.customDeleteButton]}
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                ))}
                {fields.length > 0 ? (
                  <Row>
                    <Col flex="1" />
                    <Col flex="2">
                      <Form.Item className={styles.customRow}>
                        <Button className={styles.customButtonAdd} onClick={() => add()}>
                          <PlusOutlined /> Add
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Form.Item className={styles.customRow} label="Social link:">
                    <Button className={styles.customButtonAdd} onClick={() => add()}>
                      <PlusOutlined /> Add
                    </Button>
                  </Form.Item>
                )}
              </div>
            );
          }}
        </Form.List>
      </div>

      <div className={styles.editOne}>
        <Form.List name="address">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col span={index === 0 ? 1 : 8} />
                    <Col flex={3}>
                      <Row>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Address' : ''}
                            className={
                              index === 0 ? styles.childrenRowWithLabel : styles.childrenRow
                            }
                            fieldKey={[field.fieldKey, 'address']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter address !',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customDeleteButton]}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Row>
                    </Col>
                  </Row>
                ))}
                {fields.length > 0 ? (
                  <Row>
                    <Col flex="1" />
                    <Col flex="2">
                      <Form.Item className={styles.customRow}>
                        <Button className={styles.customButtonAdd} onClick={() => add()}>
                          <PlusOutlined /> Add
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Form.Item className={styles.customRow} label="Address">
                    <Button className={styles.customButtonAdd} onClick={() => add()}>
                      <PlusOutlined /> Add
                    </Button>
                  </Form.Item>
                )}
              </div>
            );
          }}
        </Form.List>
      </div>
      <Form.Item name="tag" label="Tag" className={styles.editOne}>
        <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
          {props.tag.map((item) => {
            return <Option key={item.key}>{item.label}</Option>;
          })}
        </Select>
      </Form.Item>
    </div>
  );
};

export default SharedForm;

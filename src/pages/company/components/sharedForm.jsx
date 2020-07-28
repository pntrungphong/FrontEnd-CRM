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
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="contact" label="Contact" className={styles.editOne}>
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
        className={styles.editOne}
        rules={[
          {
            type: 'url',
            message: 'This field must be a valid website.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="tag" label="Tag" className={styles.editOne}>
        <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
          {props.tag.map((item) => {
            return <Option key={item.key}>{item.label}</Option>;
          })}
        </Select>
      </Form.Item>
      <div>
        <Form.List name="phone">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row key={field.key}>
                    <Col span={8} />
                    <Col span={16}>
                      <Row>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
                            name={[field.name, 'number']}
                            fieldKey={[field.fieldKey, 'number']}
                            rules={[{ required: true, message: 'Please enter phone!' }]}
                          >
                            <Input pattern="^[0-9]{10}$" />
                          </Form.Item>
                        </Col>
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customDeleteButton]}
                          onClick={() => remove(field.name)}
                        />
                      </Row>
                    </Col>
                  </Row>
                ))}
                <Form.Item label="Phone" className={fields.length === 0 ? '' : styles.customRow}>
                  <Button className={styles.customButtonAdd} onClick={() => add()}>
                    <PlusOutlined /> Add
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </div>
      <div>
        <Form.List className={styles.editOne} name="email">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row key={field.key}>
                    <Col span={8} />
                    <Col span={16}>
                      <Row>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
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
                <Form.Item label="Email" className={fields.length === 0 ? '' : styles.customRow}>
                  <Button className={styles.customButtonAdd} onClick={() => add()}>
                    <PlusOutlined /> Add
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </div>
      <div>
        <Form.List className={styles.editOne} name="website">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row key={field.key}>
                    <Col span={8} />
                    <Col span={16}>
                      <Row>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
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
                <Form.Item
                  label="Social link"
                  className={fields.length === 0 ? '' : styles.customRow}
                >
                  <Button className={styles.customButtonAdd} onClick={() => add()}>
                    <PlusOutlined /> Add
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </div>
      <div>
        <Form.List className={styles.editOne} name="address">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row key={field.key}>
                    <Col span={8} />
                    <Col span={16}>
                      <Row>
                        <Col flex="2">
                          <Form.Item
                            {...field}
                            className={styles.childrenRow}
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
                <Form.Item label="Address" className={fields.length === 0 ? '' : styles.customRow}>
                  <Button className={styles.customButtonAdd} onClick={() => add()}>
                    <PlusOutlined /> Add
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </div>
    </div>
  );
};

export default SharedForm;

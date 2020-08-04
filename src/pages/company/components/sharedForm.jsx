import { Form, Input, Button, Row, Col, Select } from 'antd';
import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../style.less';
import QuickCreate, { CreateType } from '../../common/quickCreate';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 3 },
};

const formItemLayoutWithoutLabel = {
  wrapperCol: { offset: 3 },
};

const SharedForm = (props) => {
  return (
    <div className={styles.getAll}>
      <div>
        <Form.Item
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
        <Input className={styles.editWidth} />
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
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Form.Item
                      {...field}
                      {...(index === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
                      label={index === 0 ? 'Phone' : ''}
                      className={styles.childrenRow}
                      // className={styles.spaceInp}
                      name={[field.name, 'number']}
                      fieldKey={[field.fieldKey, 'number']}
                      rules={[{ required: true, message: 'Please enter phone!' }]}
                    >
                      <div className={styles.spaceRow}>
                        <Input className={styles.spaceInp} pattern="^[0-9]{10}$" />
                        <MinusCircleOutlined
                          className={styles.customDeleteButton}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </Form.Item>
                  </Row>
                ))}
                {fields.length > 0 ? (
                  <Row>
                    <Col flex="2">
                      <Form.Item className={styles.customRow}>
                        <Button className={styles.customButtonOne} onClick={() => add()}>
                          <PlusOutlined /> Add
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Form.Item className={styles.customRow} label="Phone">
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
      <div>
        <Form.List name="email">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Form.Item
                      {...field}
                      {...(index === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
                      label={index === 0 ? 'Email' : ''}
                      className={styles.childrenRow}
                      // className={styles.spaceInp}
                      // name={[field.name, 'number']}
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
                      <div className={styles.spaceRow}>
                        <Input className={styles.spaceInp} />

                        <div style={{ width: '177px' }}>
                          <Select placeholder="Type">
                            <Option value="Primary">Primary</Option>
                            <Option value="Company">Company</Option>
                            <Option value="Personal">Personal</Option>
                          </Select>
                        </div>
                      </div>
                      <MinusCircleOutlined
                        className={styles.customDeleteButton}
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  </Row>
                ))}
                {fields.length > 0 ? (
                  <Row>
                    <Col flex="2">
                      <Form.Item className={styles.customRow}>
                        <Button className={styles.customButtonOne} onClick={() => add()}>
                          <PlusOutlined /> Add
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Form.Item className={styles.customRow} label="Email">
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
      {/* <div>
        <Form.List className={styles.editOne} name="email">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field,index) => (
                  <Row key={field.key}>
                    <Col span={index === 0 ? 0 : 3} />
                    <Col span={1} >
                      
                      <Row>
                        <Col flex="2">
                          <Form.Item
                          label={index === 0 ? 'Email' : ''}
                          {...field}
                        {...index === 0 ? formItemLayout : formItemLayoutWithoutLabel}
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
                            <div className={styles.spaceRow}>
                              <Input className={styles.spaceInp} />
                              <Form.Item
                                {...field}
                                className={styles.childrenRow}
                                name={[field.name, 'type']}
                                fieldKey={[field.fieldKey, 'type']}
                                rules={[{ required: true, message: 'Select type' }]}
                              >
                                <div style={{ width: '177px' }}>
                                  <Select placeholder="Type">
                                    <Option value="Primary">Primary</Option>
                                    <Option value="Company">Company</Option>
                                    <Option value="Personal">Personal</Option>
                                  </Select>
                                </div>
                              </Form.Item>
                              <MinusCircleOutlined
                                className={['dynamic-delete-button', styles.customDeleteButton]}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </div>
                          </Form.Item>
                        </Col>
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
      </div> */}
      <div>
        <Form.List name="social link">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Form.Item
                      {...field}
                      {...(index === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
                      label={index === 0 ? 'Social Link' : ''}
                      className={styles.childrenRow}
                      // className={styles.spaceInp}
                      // name={[field.name, 'number']}
                      fieldKey={[field.fieldKey, 'url']}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter Social Link',
                        },
                        {
                          type: 'email',
                          message: 'This field must be a valid Social Link.',
                        },
                      ]}
                    >
                      <div className={styles.spaceRow}>
                        <Input className={styles.spaceInp} />

                        <div style={{ width: '177px' }}>
                          <Select placeholder="Type">
                            <Option value="Primary">Primary</Option>
                            <Option value="Company">Company</Option>
                            <Option value="Personal">Personal</Option>
                          </Select>
                        </div>
                      </div>
                      <MinusCircleOutlined
                        className={styles.customDeleteButton}
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  </Row>
                ))}
                {fields.length > 0 ? (
                  <Row>
                    <Col flex="2">
                      <Form.Item className={styles.customRow}>
                        <Button className={styles.customButtonOne} onClick={() => add()}>
                          <PlusOutlined /> Add
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Form.Item className={styles.customRow} label="Email">
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
      <div>
        <Form.List name="address">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Form.Item
                      {...field}
                      {...(index === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
                      label={index === 0 ? 'Address' : ''}
                      className={styles.childrenRow}
                      // className={styles.spaceInp}
                      // name={[field.name, 'number']}
                      fieldKey={[field.fieldKey]}
                      rules={[{ required: true, message: 'Please enter address!' }]}
                    >
                      <div className={styles.spaceRow}>
                        <Input className={styles.spaceInp} />
                        <MinusCircleOutlined
                          className={styles.customDeleteButton}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </Form.Item>
                  </Row>
                ))}
                {fields.length > 0 ? (
                  <Row>
                    <Col flex="2">
                      <Form.Item className={styles.customRow}>
                        <Button className={styles.customButtonOne} onClick={() => add()}>
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
    </div>
  );
};

export default SharedForm;

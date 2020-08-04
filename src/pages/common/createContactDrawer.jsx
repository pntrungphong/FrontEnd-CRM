import { Spin, Select, Divider, Form, Drawer, Button, Input, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import styles from './style.less';
import QuickCreate, { CreateType } from './quickCreate';

const { Option } = Select;

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);

class CreateContactDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.formContactRef = React.createRef();
    this.fetchDataByName = debounce(this.fetchDataByName, 700);
    this.state = {
      inputValue: '',
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  fetchDataByName = (value) => {
    this.props.dispatch({
      type: 'quickCreate/getListDataRelated',
      payload: { value, searchType: this.props.createType },
    });

    this.setState({
      inputValue: value,
    });
  };

  handleOnChange = () => {
    this.props.dispatch({
      type: 'quickCreate/clearListSearchData',
    });
    this.setState({
      inputValue: '',
    });
  };

  onBlur = () => {
    this.props.dispatch({
      type: 'quickCreate/clearListSearchData',
    });
    this.setState({
      inputValue: '',
    });
  };

  onInputKeyDown = (event) => {
    if (event.nativeEvent.code === 'Backspace') {
      this.setState({
        inputValue: '',
      });
    }
  };

  onFocus = () => {
    this.props.dispatch({
      type: 'quickCreate/getListDataRelated',
      payload: { value: ' ', searchType: this.props.createType },
    });
  };

  onFinish = async (value) => {
    const responseValue = await this.props.dispatch({
      type: 'contact/quickCreateContact',
      payload: value,
    });
    let listValue = this.props.formRef.current.getFieldValue('contact');
    if (!listValue) listValue = [];
    listValue.push(responseValue);
    this.props.formRef.current.setFieldsValue({ contact: [...listValue] });
    this.setState({
      inputValue: '',
      visible: false,
    });
    this.props.formRef.current.getFieldInstance('contact').blur();
    this.props.formRef.current.getFieldInstance('contact').focus();
  };

  NotFoundComponent = (props) => {
    return (
      <>
        <div className={styles.resultNotFound}>No results found</div>
        <Divider className={styles.customDevider} />
        <h3 onClick={this.showDrawer} className={styles.quickCreateTitle}>
          Create &quot;{props.inputValue}&quot; as contact
        </h3>
      </>
    );
  };

  render() {
    const { listSearchData } = this.props.quickCreate;
    return (
      <>
        <Form.Item name={this.props.dataIndex} className={styles.disableDefaultStyle}>
          <Select
            key={this.props.dataIndex}
            mode="multiple"
            autoClearSearchValue
            placeholder={this.props.placeholder}
            labelInValue
            value={this.state.inputValue}
            notFoundContent={iff(
              this.props.fetchingData,
              <Spin size="small" />,
              this.state.inputValue !== '' ? (
                <this.NotFoundComponent inputValue={this.state.inputValue} />
              ) : (
                ''
              ),
            )}
            filterOption={false}
            onSearch={this.fetchDataByName}
            onChange={this.handleOnChange}
            onBlur={this.onBlur}
            onInputKeyDown={this.onInputKeyDown}
            onFocus={this.onFocus}
          >
            {this.props.fetchingData || !listSearchData ? (
              <Option>
                <Spin size="small" />
              </Option>
            ) : (
              listSearchData.map((d) => <Option key={d.key}>{d.label}</Option>)
            )}
          </Select>
        </Form.Item>
        <Drawer
          title="Create new contact"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
          width={512}
          closable
          destroyOnClose
        >
          <Form
            labelCol={{ span: 4 }}
            ref={this.formContactRef}
            name="create-contact"
            onFinish={(value) => {
              this.onFinish(value);
            }}
            initialValues={{
              company: this.props.defaultCompany,
              name: this.state.inputValue,
              phone: [
                {
                  number: undefined,
                  type: undefined,
                },
              ],
              email: [
                {
                  url: undefined,
                  type: undefined,
                },
              ],
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <QuickCreate
                formRef={this.formContactRef}
                placeholder="Type and select a company"
                createType={CreateType.COMPANY}
                dataIndex="company"
              />
            </Form.Item>
            <Form.Item name="referral" label="Referral">
              <QuickCreate
                formRef={this.formContactRef}
                placeholder="Type and select a referral"
                createType={CreateType.CONTACT}
                dataIndex="referral"
              />
            </Form.Item>
            <Form.List name="phone" label="Phone">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Row key={field.key}>
                        <Col span={index === 0 ? 1 : 4} />
                        <Col flex={index === 0 ? '9' : '7.5'}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Phone' : ''}
                            className={
                              index === 0 ? styles.childrenRowWithLabel : styles.childrenRow
                            }
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
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customDeleteButton]}
                          onClick={() => (index > 0 ? remove(field.name) : null)}
                        />
                      </Row>
                    ))}
                    <Row>
                      <Col flex="1" />
                      <Col flex="5">
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
            <Form.List name="email">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Row key={field.key}>
                        <Col span={index === 0 ? 1 : 4} />
                        <Col flex={index === 0 ? '9' : '7.5'}>
                          <Form.Item
                            {...field}
                            label={index === 0 ? 'Email' : ''}
                            className={
                              index === 0 ? styles.childrenRowWithLabel : styles.childrenRow
                            }
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
                        <MinusCircleOutlined
                          className={['dynamic-delete-button', styles.customDeleteButton]}
                          onClick={() => (index > 0 ? remove(field.name) : null)}
                        />
                      </Row>
                    ))}

                    <Row>
                      <Col flex="1" />
                      <Col flex="5">
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

            <Form.Item className={styles.editBtn}>
              <Button htmlType="reset">Cancel</Button>
              <Button type="primary" htmlType="submit" loading={this.props.creating}>
                Create
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    );
  }
}
export default connect(({ quickCreate, loading, contact }) => ({
  quickCreate,
  contact,
  fetchingData: loading.effects['quickCreate/getListDataRelated'],
  creating: loading.effects['contact/create'],
}))(CreateContactDrawer);

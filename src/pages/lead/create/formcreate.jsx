import { Form, Input, Select, Radio, Checkbox } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './style.less';
import QuickCreate, { CreateType } from '../../common/quickCreate';
import CreateContactDrawer from '../../common/createContactDrawer';
import CustomUploadFile from './components/customuploadfile';

const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
};

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyValue: undefined,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'tag/getTag',
    });
  }

  onFinish = (values) => {
    const payloadValue = values;
    payloadValue.lane = this.props.formRef.current.getFieldValue('lane');
    this.props
      .dispatch({
        type: 'lead/create',
        payload: { ...payloadValue },
      })
      .then((value) => {
        if (value) this.props.dispatch({ type: 'lead/getListWithLane', payload: {} });
      });
    this.props.closeModal();
  };

  render() {
    const { tag } = this.props.tag;
    return (
      <Form
        id={this.props.id}
        {...layout}
        className={styles.formCreateLead}
        ref={this.props.formRef}
        name="nest-messages"
        onFinish={this.onFinish}
      >
        <Form.Item
          name="name"
          label="Lead Name"
          rules={[{ required: true, message: 'Please input lead name' }]}
        >
          <Input placeholder="Enter lead name" />
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: 'Please input company' }]}
          getValueProps={(value) => {
            if (this.state.companyValue !== value) {
              this.setState({ companyValue: value });
            }
          }}
        >
          <QuickCreate
            formRef={this.props.formRef}
            placeholder="Type and select a company"
            createType={CreateType.COMPANY}
            dataIndex="company"
          />
        </Form.Item>

        <Form.Item
          name="contact"
          label="Contact"
          rules={[{ required: true, message: 'Please input contact' }]}
        >
          <CreateContactDrawer
            formRef={this.props.formRef}
            defaultCompany={this.state.companyValue}
            placeholder="Type and select contact"
            createType={CreateType.CONTACT}
            dataIndex="contact"
          />
        </Form.Item>

        <Form.Item name="relation" label="Related To">
          <QuickCreate
            formRef={this.props.formRef}
            placeholder="Type and select relation contact"
            createType={CreateType.CONTACT}
            dataIndex="relation"
          />
        </Form.Item>

        <Form.Item name="tag" label="Tag">
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select tags"
            labelInValue
            tokenSeparators={[',']}
          >
            {tag.map((item) => {
              return <Option key={item.key}>{item.label}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item name="rank" label="Rank" rules={[{ required: true, message: 'Choose rank' }]}>
          <Radio.Group className={styles.customRadioRank}>
            <Radio value="0">A</Radio>
            <Radio value="1">B</Radio>
            <Radio value="2">C</Radio>
            <Radio value="3">D</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="reason"
          label="Rank Explanation"
          rules={[{ required: true, message: 'Explanation for this rank' }]}
        >
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder="Add reason for the ranking"
          />
        </Form.Item>
        <Form.Item name="hov" label="HOV" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} placeholder="Add lead description here" />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <TextArea rows={4} placeholder="Add a note here" />
        </Form.Item>
        <Form.Item name="brief" label="Brief">
          <CustomUploadFile dataIndex="brief" />
        </Form.Item>
      </Form>
    );
  }
}
export default connect(({ lead, tag, loading }) => ({
  lead,
  tag,
  submitting: loading.effects['lead/create'],
  fetchingCompany: loading.effects['lead/searchCompanyByName'],
  fetchingContact: loading.effects['lead/searchContactByName'],
}))(CreateForm);

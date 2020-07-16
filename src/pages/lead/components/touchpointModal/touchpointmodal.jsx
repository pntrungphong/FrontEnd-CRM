import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  TimePicker,
  DatePicker,
  Radio,
  Button,
  // message,
  Spin,
  Select,
} from 'antd';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { useMount, useUnmount } from 'ahooks';
import CustomUploadFile from './customuploadfile';
import EditableTable from './tasktable';
import styles from './style.less';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrappercol: { span: 16 },
};

const validateMessages = (label) => ({
  required: `${label} is required!`,
});

const Update = connect(({ lead, tag, loading }) => ({
  lead,
  tag,
  submitting: loading.effects['lead/update'],
  querying: loading.effects['lead/loading'],
}))(function (props) {
  console.log(props);
  useMount(() => {
    props.dispatch({
      type: 'lead/loading',
      payload: { id: props.leadId },
    });
  });
  useUnmount(() => {
    props.dispatch({
      type: 'tag/getTag',
    });
    props.dispatch({
      type: 'lead/cleanData',
    });
  });

  const onFinish = (values) => {
    props.dispatch({
      type: 'lead/update',
      payload: { ...values, id: props.leadId },
    });
    // console.log(props.submitting);
  };

  let fetchCompany = (value) => {
    props.dispatch({
      type: 'lead/handleSearchChange',
      payload: { value: props.lead.searchValue, listCompany: [] },
    });

    props.dispatch({
      type: 'lead/searchCompanyByName',
      payload: { value },
    });
  };

  let fetchContact = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value: props.lead.searchContactValue, listContact: [] },
    });

    props.dispatch({
      type: 'lead/searchContactByName',
      payload: { value },
    });
  };

  fetchCompany = debounce(fetchCompany, 1000);
  fetchContact = debounce(fetchContact, 1000);

  const handleChange = (value) => {
    props.dispatch({
      type: 'lead/handleSearchChange',
      payload: { value, listCompany: [] },
    });
  };

  const handleContactChange = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  if (props.lead.data === undefined) {
    return <Spin />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>Lead Information</p>
      </div>

      <Form
        {...layout}
        form={props.updateForm}
        name="nest-messages"
        onFinish={onFinish}
        // title="Lead Infomation"
        initialValues={{
          lead: {
            name: props.lead.data.name,
            rank: props.lead.data.rank,
            company: props.lead.data.company,
            contact: props.lead.data.contact,
            tag: props.lead.data.tag,
            brief: props.lead.data.brief,
            description: props.lead.data.description,
          },
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['lead', 'name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['lead', 'company']}
          label="Company"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            showSearch
            labelInValue
            tokenSeparators={[',']}
            value={props.lead.searchValue}
            placeholder="Select company"
            notFoundContent={
              props.fetchingCompany ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text">Create Company</Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchCompany}
            onChange={handleChange}
          >
            {props.lead.listCompany.map((d) => (
              <Option key={d.key}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={['lead', 'contact']}
          label="Related To"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            labelInValue
            tokenSeparators={[',']}
            value={props.lead.searchContactValue}
            placeholder="Select contact"
            notFoundContent={
              props.fetchingContact ? (
                <Spin size="small" />
              ) : (
                <p>
                  <Button type="text">Create Contact</Button>
                </p>
              )
            }
            filterOption={false}
            onSearch={fetchContact}
            onChange={handleContactChange}
          >
            {props.lead.listContact.map((d) => (
              <Option key={d.key}>{d.label}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={['lead', 'description']}
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name={['lead', 'tag']} label="Tag">
          <Select mode="tags" style={{ width: '100%' }} labelInValue tokenSeparators={[',']}>
            <Option key="1">String</Option>
            <Option key="6">tesst</Option>
          </Select>
        </Form.Item>
        <Form.Item name={['lead', 'brief']} label="Brief">
          <CustomUploadFile dataIndex="brief" />
        </Form.Item>
        <Form.Item name={['lead', 'scope']} label="Scope">
          <CustomUploadFile dataIndex="scope" />
        </Form.Item>
        <Form.Item name={['lead', 'sla']} label="SLA">
          <CustomUploadFile dataIndex="sla" />
        </Form.Item>
        <Form.Item name={['lead', 'pricing']} label="Pricing">
          <CustomUploadFile dataIndex="pricing" />
        </Form.Item>
        <Form.Item name={['lead', 'estimation']} label="Estimation">
          <CustomUploadFile dataIndex="estimation" />
        </Form.Item>
        <Form.Item name={['lead', 'quotation']} label="Quotation">
          <CustomUploadFile dataIndex="quotation" />
        </Form.Item>
      </Form>
    </div>
  );
});

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};

class Rankmodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: 1,
      reason: '',
      visible: false,
    };
  }

  onRankChange = (e) => {
    this.setState({
      rank: e.target.value,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onOk = () => {
    this.setState({
      visible: false,
    });
    this.props.onChange({
      changerank: this.state.rank,
      reason: this.state.reason,
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onReasonChange = (e) => {
    this.setState({
      reason: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Input readOnly value={rankStore[this.state.rank]} />
        <Modal
          title="Do you Want to update rank?"
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}

          // onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item name="changerank">
              <Radio.Group onChange={this.onRankChange} value={this.state.rank}>
                <Radio value={0}>A</Radio>
                <Radio value={1}>B</Radio>
                <Radio value={2}>C</Radio>
                <Radio value={3}>D</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Reason" name="reason">
              <TextArea value={this.state.reason} onChange={this.onReasonChange} />
            </Form.Item>
          </Form>
        </Modal>
        <Button onClick={this.showModal}>Change</Button>
      </div>
    );
  }
}

const TouchpointCreateForm = ({ leadId }) => {
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
  };

  const onCreate = (values) => {
    console.table(values);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={onShow}>Add</Button>
      <Modal
        title="Touchpoint #1"
        visible={visible}
        okText="ADD"
        cancelText="Cancel"
        okButtonProps="default"
        cancelButtonProps="primary"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // console.table(values);
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
          updateForm
            .validateFields()

            .then((values) => {
              console.table(values);

              onCreate(values);
            })

            .catch((info) => {
              console.log('Validate Failed:', info);
            });
          updateForm.submit();
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="goal"
            label="Goal"
            rules={[
              {
                required: true,
                message: 'Please input Goal',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="task">
            <EditableTable />
          </Form.Item>
          <Form.Item name="meetingtime" label="Meeting Time">
            <TimePicker use12Hours format="h:mm a" />
          </Form.Item>
          <Form.Item name="meetingdate" label="Meeting Date">
            <DatePicker format={dateFormatList} />
          </Form.Item>
          <Form.Item name="note" label="Note">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="rank" label="Rank">
            <Rankmodal />
          </Form.Item>
        </Form>
        <Update leadId={leadId} updateForm={updateForm} />
      </Modal>
    </div>
  );
};
export default TouchpointCreateForm;

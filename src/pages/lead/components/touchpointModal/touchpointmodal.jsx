import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Spin, Select } from 'antd';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import { useUnmount } from 'ahooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CustomUploadFile from './customuploadfile';
import EditableTable from './tasktable';
import Rankmodal from './rankmodal';

const { TextArea } = Input;
const { Option } = Select;

const Update = connect(({ lead, tag, loading }) => ({
  lead,
  tag,
  submitting: loading.effects['lead/update'],
  querying: loading.effects['lead/loading'],
  fetchingCompany: loading.effects['lead/searchCompanyByName'],
  fetchingContact: loading.effects['lead/searchContactByName'],
}))((props) => {
  useUnmount(() => {
    props.dispatch({
      type: 'tag/getTag',
    });
    props.dispatch({
      type: 'lead/cleanLeadData',
    });
  });

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

  const handleRelationChange = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  const handleContactChange = (value) => {
    props.dispatch({
      type: 'lead/handleSearchContactChange',
      payload: { value, listContact: [] },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>Lead Information</p>
      </div>

      <Form.Item
        name={['lead', 'name']}
        label="Name"
        rules={[
          {
            required: true,
            min: 4,
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
        label="Contact"
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
                <Button type="text">New</Button>
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
        name={['lead', 'relation']}
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
          notFoundContent={
            props.fetchingContact ? (
              <Spin size="small" />
            ) : (
              <p>
                <Button type="text">New</Button>
              </p>
            )
          }
          filterOption={false}
          onSearch={fetchContact}
          onChange={handleRelationChange}
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
            min: 10,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name={['lead', 'tag']} label="Tag">
        <Select mode="tags" className={styles.tag} labelInValue tokenSeparators={[',']}>
          {/* <Option key="1">String</Option>
            <Option key="6">tesst</Option> */}
        </Select>
      </Form.Item>
      <Form.Item name={['lead', 'brief']} label="Brief">
        <CustomUploadFile dataIndex="brief" />
      </Form.Item>
    </div>
  );
});

const TouchpointCreateForm = connect(({ task, lead, touchpoint }) => ({
  task,
  touchpoint,
  lead,
}))((props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
    props.dispatch({
      type: 'touchpoint/get',
      payload: { id: props.touchpointId },
    });
    props.dispatch({
      type: 'lead/loading',
      payload: { id: props.leadId },
    });
  };

  const cleanData = () => {};

  const onPlaning = (values) => {
    const returnValue = values;
    returnValue.leadId = props.leadId;
    returnValue.touchpointId = props.touchpointId;
    returnValue.lead.id = props.leadId;
    if (values.rank.rank) {
      if (values.rank.rank === props.rank) returnValue.lead.rank = props.rank;
      else returnValue.lead.rank = values.rank;
    } else returnValue.lead.rank = values.rank;

    props.dispatch({
      type: 'touchpoint/cleanData',
    });

    props.dispatch({
      type: 'touchpoint/update',
      payload: { ...returnValue },
    });

    props.dispatch({
      type: 'lead/update',
      payload: { ...returnValue.lead },
    });

    props.dispatch({
      type: 'touchpoint/cleanData',
    });

    props.dispatch({
      type: 'lead/loadListLead',
    });

    setVisible(false);
  };
  const onCancel = () => {
    setVisible(false);
    props.dispatch({
      type: 'task/cleanData',
    });
    form.resetFields();
    props.dispatch({
      type: 'touchpoint/cleanData',
    });
  };

  return (
    <div>
      <a onClick={onShow} className={styles.updateTouchPointButton}>
        <FontAwesomeIcon icon={faEllipsisH} size="lg" />
      </a>
      <Modal
        title={props.name}
        visible={visible}
        destroyOnClose
        afterClose={cleanData}
        className={styles.customModal}
        okText="ADD"
        cancelText="Cancel"
        okButtonProps="default"
        cancelButtonProps="primary"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onPlaning(values);
              // setVisible(false);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        {props.touchpoint.data && props.lead.data ? (
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              goal: props.touchpoint.data.goal,
              meetingdate: props.touchpoint.data.meetingdate,
              note: props.touchpoint.data.note,
              rank: props.rank,
              scope: props.touchpoint.data.scope,
              sla: props.touchpoint.data.sla,
              pricing: props.touchpoint.data.pricing,
              estimation: props.touchpoint.data.estimation,
              quotation: props.touchpoint.data.quotation,
              lead: {
                name: props.lead.data.name,
                rank: props.lead.data.rank,
                company: props.lead.data.company,
                contact: props.lead.data.contact,
                tag: props.lead.data.tag,
                relation: props.lead.data.relation,
                brief: props.lead.data.file,
                description: props.lead.data.description,
              },
            }}
          >
            <Form.Item
              name="goal"
              label="Goal"
              rules={[
                {
                  required: true,
                  message: 'Please input Goal',
                  min: 10,
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="task">
              <EditableTable
                dispatch={props.dispatch}
                touchpointId={props.touchpointId}
                listTask={props.touchpoint.data.task}
              />
            </Form.Item>

            <Form.Item name="meetingdate" label="Meeting Date">
              <DatePicker format="YYYY-MM-DD HH:mm" showTime />
            </Form.Item>
            <Form.Item name="note" label="Note" rules={[{ min: 10 }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="rank" label="Rank">
              <Rankmodal rank={props.rank} />
            </Form.Item>
            <Update leadId={props.leadId} />
            <Form.Item name="scope" label="Scope">
              <CustomUploadFile dataIndex="scope" />
            </Form.Item>
            <Form.Item name="sla" label="SLA">
              <CustomUploadFile dataIndex="sla" />
            </Form.Item>
            <Form.Item name="pricing" label="Pricing">
              <CustomUploadFile dataIndex="pricing" />
            </Form.Item>
            <Form.Item name="estimation" label="Estimation">
              <CustomUploadFile dataIndex="estimation" />
            </Form.Item>
            <Form.Item name="quotation" label="Quotation">
              <CustomUploadFile dataIndex="quotation" />
            </Form.Item>
          </Form>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
});
export default TouchpointCreateForm;

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Tag, Button, DatePicker, Modal, Select, Form } from 'antd';
import moment from 'moment';

const EditableContext = React.createContext();

const { Option } = Select;

const User = {
  '48862ade-6f9a-471f-835a-cff4f3b9a567': 'chau.dh',
  '50b0cb2e-3782-4b11-82c0-4e2f6580ab94': 'tu.tt',
  '171ecb82-4daa-43dc-8fec-61878b42d506': 'khoa.nd',
  '39d088f6-cc81-4263-ac27-b920983a4eb0': 'nhan.lh',
};

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  select,
  editable,
  datetime,
  selectData,
  children,
  status,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (status === 'Done') return;
    if (record.taskname === '' && dataIndex !== 'taskname') return;
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log(errInfo);
    }
  };

  const onSelect = (value) => {
    switch (dataIndex) {
      case 'pic':
        handleSave({ ...record, pic: value });
        break;
      case 'type':
        handleSave({ ...record, type: value });
        break;
      default:
        break;
    }
    toggleEdit();
  };

  const onChangeTime = (dateString) => {
    const duedate = moment(dateString);
    toggleEdit();
    handleSave({ ...record, duedate });
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children[1] === '' ? '--Add Task--' : children}
      </div>
    );
  } else if (select) {
    let selectElement;
    if (dataIndex === 'type') {
      if (children[1] === '') selectElement = '--Add Type--';
      else selectElement = <Tag>{children}</Tag>;
    } else if (children[1] === '') selectElement = '--Add PIC--';
    else selectElement = children;
    childNode = editing ? (
      <Form.Item name={dataIndex}>
        <Select ref={inputRef} onBlur={toggleEdit} onSelect={onSelect}>
          {selectData.map((d) => (
            <Option key={d}>{d}</Option>
          ))}
        </Select>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {selectElement}
      </div>
    );
  } else if (datetime) {
    const fakeChildren = [
      children[0],
      children[1] === '' ? children[1] : record.duedate.format('DD-MM-YYYY'),
    ];

    childNode = editing ? (
      <Form.Item name={dataIndex}>
        <DatePicker
          ref={inputRef}
          format="DD-MM-YYYY"
          onBlur={toggleEdit}
          onChange={onChangeTime}
        />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {fakeChildren[1] === '' ? '--Add date--' : fakeChildren}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Task name',
        dataIndex: 'taskname',
        width: '25%',
        editable: true,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: '25%',
        selectData: ['Lead Management', 'Product Consulting', 'Proposal Handling'],
        select: true,
      },
      {
        title: 'PIC',
        dataIndex: 'pic',
        selectData: ['chau.dh', 'tu.tt', 'khoa.nd', 'truong.nx'],
        width: '25%',
        select: true,
      },
      {
        title: 'Due date',
        width: '100%',
        dataIndex: 'duedate',
        datetime: true,
      },
    ];

    this.props.dispatch({
      type: 'task/saveListTask',
      payload: this.props.listTask,
    });

    const newData = [];
    this.props.listTask.forEach((element) => {
      newData.push({
        key: newData.length,
        taskname: element.taskname,
        type: element.type,
        pic: User[element.userId],
        duedate: moment(element.dueDate),
      });
    });

    this.state = {
      dataSource: newData,
      count: newData.length,
      visible: false,
    };
  }

  handleDelete = (key) => {
    const { count, dataSource } = this.state;
    const newData = dataSource.filter((item) => item.key !== key);
    this.setState({
      dataSource: newData,
      count: count - 1,
    });

    const formatedData = newData.filter((item) => item.taskname !== '');

    if (this.props.onChange) {
      this.props.onChange(formatedData.length > 0 ? [...formatedData] : undefined);
    }
  };

  onShow = () => {
    this.setState({
      visible: true,
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleAdd = (values) => {
    const { count, dataSource } = this.state;

    const postData = {
      touchpointId: this.props.touchpointId,
      taskname: values.taskname,
      type: values.type ? values.type : '',
      pic: values.pic ? values.pic[1] : '',
      duedate: values.duedate ? values.duedate.format('YYYY-MM-DD') : '',
    };
    this.props.dispatch({
      type: 'task/create',
      payload: postData,
    });

    this.props.dispatch({
      type: 'lead/loadListLead',
      payload: {
        page: 1,
        searchValue: this.props.lead.leadSearchValue,
        status: this.props.lead.status,
      },
    });

    const newData = {
      key: count,
      taskname: values.taskname,
      type: values.type ? values.type : '',
      pic: values.pic ? values.pic[0] : '',
      duedate: values.duedate ? values.duedate : '',
    };
    const newSource = [...dataSource, newData];
    this.setState({
      dataSource: newSource,
      count: count + 1,
      visible: false,
    });
    if (this.props.onChange) {
      this.props.onChange([...newSource]);
    }
  };

  handleSave = (row) => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    this.props.dispatch({
      type: 'task/update',
      payload: {
        touchpointId: this.props.touchpointId,
        newData: row,
        index,
        listTask: this.props.listTask,
      },
    });
    const selectItem = newData[index];
    newData.splice(index, 1, { ...selectItem, ...row });
    this.setState({
      dataSource: newData,
    });
    const formatedData = newData.filter(() => selectItem.taskname !== '');
    if (this.props.onChange) {
      this.props.onChange([...formatedData]);
    }
    this.props.dispatch({
      type: 'lead/loadListLead',
      payload: {
        page: 1,
        searchValue: this.props.lead.leadSearchValue,
        status: this.props.lead.status,
      },
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (col.action) {
        return col;
      }

      if (col.select) {
        return {
          ...col,
          onCell: (record) => ({
            record,
            select: col.select,
            status: this.props.status,
            selectData: col.selectData,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      }

      if (col.datetime) {
        return {
          ...col,
          onCell: (record) => ({
            record,
            datetime: col.datetime,
            dataIndex: col.dataIndex,
            title: col.title,
            status: this.props.status,
            handleSave: this.handleSave,
          }),
        };
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          status: this.props.status,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Modal
          title="Add Task"
          visible={this.state.visible}
          destroyOnClose
          onCancel={this.onCancel}
          footer={[
            <Button form="addTaskForm" key="submit" htmlType="submit" type="primary">
              Add
            </Button>,
          ]}
        >
          <Form {...layout} onFinish={this.handleAdd} id="addTaskForm">
            <Form.Item name="taskname" label="Task name" required>
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Type">
              <Select>
                <Option value="Lead Management">Lead Management</Option>
                <Option value="Product Consulting">Product Consulting</Option>
                <Option value="Proposal Handling">Proposal Handling</Option>
              </Select>
            </Form.Item>
            <Form.Item name="pic" label="PIC">
              <Select>
                <Option value={['chau.dh', '48862ade-6f9a-471f-835a-cff4f3b9a567']}>chau.dh</Option>
                <Option value={['tu.tt', '50b0cb2e-3782-4b11-82c0-4e2f6580ab94']}>tu.tt</Option>
                <Option value={['khoa.nd', '171ecb82-4daa-43dc-8fec-61878b42d506']}>khoa.nd</Option>
                <Option value={['nhan.lh', '39d088f6-cc81-4263-ac27-b920983a4eb0']}>nhan.lh</Option>
              </Select>
            </Form.Item>
            <Form.Item name="duedate" label="Due Date">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Form>
        </Modal>
        <Button
          hidden={!!(this.props.status === 'Done')}
          onClick={this.onShow}
          style={{
            marginBottom: 10,
          }}
        >
          Add task
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Tag, Button, notification, DatePicker, Modal, Select, Form } from 'antd';
import moment from 'moment';
import styles from './style.less';

const EditableContext = React.createContext();

const { Option } = Select;

const tagColorStore = {
  'Proposal Handling': 'cyan',
  'Lead Management': 'purple',
  'Product Consulting': 'blue',
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
  status,
  children,
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
    if (record.taskName === '' && dataIndex !== 'taskName') return;
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
      notification.error({
        message: errInfo,
      });
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

  const onChangeTime = async (dateString) => {
    await form.validateFields();
    const dueDate = moment(dateString);
    toggleEdit();
    handleSave({ ...record, dueDate });
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
      else selectElement = <Tag color={tagColorStore[children[1]]}>{children}</Tag>;
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
      children[1] === '' ? children[1] : record.dueDate.format('DD-MM-YYYY'),
    ];

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

    this.columns =
      this.props.status === 'Done'
        ? [
            {
              title: 'Task name',
              dataIndex: 'taskName',
              width: '25%',
              editable: true,
            },
            {
              title: 'PIC',
              dataIndex: 'pic',
              selectData: ['chau.dh', 'tu.tt', 'khoa.nd', 'nhan.lh'],
              width: '25%',
              select: true,
            },
            {
              title: 'Due date',
              width: '25%',
              dataIndex: 'dueDate',
              datetime: true,
            },
          ]
        : [
            {
              title: 'Task name',
              dataIndex: 'taskName',
              width: '25%',
              editable: true,
            },
            {
              title: 'PIC',
              dataIndex: 'pic',
              selectData: ['chau.dh', 'tu.tt', 'khoa.nd', 'nhan.lh'],
              width: '25%',
              select: true,
            },
            {
              title: 'Due date',
              width: '25%',
              dataIndex: 'dueDate',
              datetime: true,
            },
            {
              title: 'Action',
              key: 'action',
              size: 'small',
              width: '25%',
              render: (record) => <a onClick={() => this.handleDelete(record.key)}>Delete</a>,
            },
          ];

    const newData = this.props.value
      ? this.props.value.map((element, index) => {
          return {
            key: index,
            taskName: element.taskName,
            type: element.type,
            pic: element.pic,
            dueDate: element.dueDate,
          };
        })
      : [];

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

    const formattedData = newData.filter((item) => item.taskName !== '');

    if (this.props.onChange) {
      this.props.onChange(formattedData.length > 0 ? [...formattedData] : undefined);
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

    const newData = {
      key: count,
      taskName: values.taskName,
      type: values.type ? values.type : '',
      pic: values.pic ? values.pic[0] : '',
      dueDate: values.dueDate ? values.dueDate : '',
    };

    const newSource = [newData, ...dataSource];

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
    const selectItem = newData[index];
    newData.splice(index, 1, { ...selectItem, ...row });
    this.setState({
      dataSource: newData,
    });

    const formattedData = newData.filter(() => selectItem.taskName !== '');
    if (this.props.onChange) {
      this.props.onChange([...formattedData]);
    }
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
            status: this.props.status,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          status: this.props.status,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Modal
          title="Add task"
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
            <Form.Item
              name="taskName"
              label="Task name"
              rules={[
                {
                  required: true,
                  message: 'Task name is required.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="pic"
              label="PIC"
              rules={[
                {
                  required: true,
                  message: 'PIC is required.',
                },
              ]}
            >
              <Select>
                <Option value={['chau.dh', '48862ade-6f9a-471f-835a-cff4f3b9a567']}>chau.dh</Option>
                <Option value={['tu.tt', '50b0cb2e-3782-4b11-82c0-4e2f6580ab94']}>tu.tt</Option>
                <Option value={['khoa.nd', '171ecb82-4daa-43dc-8fec-61878b42d506']}>khoa.nd</Option>
                <Option value={['nhan.lh', '39d088f6-cc81-4263-ac27-b920983a4eb0']}>nhan.lh</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[
                {
                  required: true,
                  message: 'Due Date is required.',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Form>
        </Modal>
        <h3 className={styles.modalTaskTitle}>
          <Button
            type="primary"
            size="middle"
            hidden={!!(this.props.status === 'Done')}
            onClick={this.onShow}
          >
            Add task
          </Button>
        </h3>
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

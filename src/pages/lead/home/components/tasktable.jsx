import React, { useContext, useState, useEffect, useRef } from 'react';
// import styles from './style.less';
import { Table, Input, Tag, Button, DatePicker, Popconfirm, Select, Form } from 'antd';
// import { isBuffer } from 'lodash';
import moment from 'moment';

const EditableContext = React.createContext();

const { Option } = Select;

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
      console.log('Save failed:', errInfo);
    }
  };

  const onSelect = (value) => {
    console.table(value);
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
        {children[1] === '' ? '--Add task name--' : children}
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
      children[1] === '' ? children[1] : record.duedate.format('YYYY-MM-DD HH:mm'),
    ];

    childNode = editing ? (
      <Form.Item name={dataIndex}>
        <DatePicker
          ref={inputRef}
          format="YYYY-MM-DD HH:mm"
          showTime
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
        title: 'Task Name',
        dataIndex: 'taskname',
        width: '25%',
        editable: true,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: '25%',
        selectData: [
          'Product Consulting',
          'Lead Management',
          'Proposal Handling',
          'Lead Generation',
        ],
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
      {
        title: 'operation',
        action: true,
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [],
      count: 0,
    };
  }

  handleDelete = (key) => {
    const { count, dataSource } = this.state;
    const newData = dataSource.filter((item) => item.key !== key);
    this.setState({
      dataSource: newData,
      count: count - 1,
    });

    // const deleteItem = dataSource.filter(item => item.key === key)[0];
    const formatedData = newData.filter((item) => item.taskname !== '');

    if (this.props.onChange) {
      this.props.onChange(formatedData.length > 0 ? [...formatedData] : undefined);
    }
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      taskname: '',
      type: '',
      pic: '',
      duedate: '',
    };
    const newSource = [...dataSource, newData];
    this.setState({
      dataSource: newSource,
      count: count + 1,
    });
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
    const formatedData = newData.filter(() => selectItem.taskname !== '');
    if (this.props.onChange) {
      this.props.onChange([...formatedData]);
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
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          style={{
            minWidth: '200%',
          }}
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

import { Spin, Select, Divider, Form } from 'antd';
import React from 'react';
import { connect } from 'umi';
import debounce from 'lodash/debounce';
import styles from './style.less';

const { Option } = Select;

// if function
const iff = (condition, then, otherwise) => (condition ? then : otherwise);

class QuickCreate extends React.Component {
  constructor(props) {
    super(props);
    this.fetchDataByName = debounce(this.fetchDataByName, 700);
    this.state = {
      inputValue: '',
    };
  }

  fetchDataByName = (value) => {
    this.props.dispatch({
      type: 'quickCreate/getListDataRelated',
      payload: { value, searchType: this.props.createType },
    });

    this.setState({
      inputValue: value,
    });
  };

  formatFieldValue = (field, listValue) => {
    if (field === 'company') return { company: [...listValue] };
    if (field === 'contact') return { contact: [...listValue] };
    if (field === 'relation') return { relation: [...listValue] };
    if (field === 'referral') return { referral: [...listValue] };
    return {};
  };

  quickCreate = async (field) => {
    const searchValue = this.state.inputValue;
    const value = await this.props.dispatch({
      type: 'quickCreate/quickCreate',
      payload: {
        name: searchValue,
        createType: this.props.createType,
      },
    });
    let listValue = this.props.formRef.current.getFieldValue(field);
    if (!listValue) listValue = [];
    listValue.push(value);
    this.props.formRef.current.setFieldsValue(this.formatFieldValue(field, listValue));
    this.setState({
      inputValue: '',
    });
    this.props.formRef.current.getFieldInstance(field).blur();
    this.props.formRef.current.getFieldInstance(field).focus();
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

  NotFoundComponent = (props) => {
    return (
      <>
        <div className={styles.resultNotFound}>No results found</div>
        <Divider className={styles.customDevider} />
        <h3
          onClick={() => this.quickCreate(this.props.dataIndex)}
          className={styles.quickCreateTitle}
        >
          Create &quot;{props.inputValue}&quot; as {props.field}
        </h3>
      </>
    );
  };

  render() {
    const { listSearchData } = this.props.quickCreate;
    return (
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
              <this.NotFoundComponent
                inputValue={this.state.inputValue}
                field={this.props.createType}
              />
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
    );
  }
}
export default connect(({ quickCreate, loading }) => ({
  quickCreate,
  fetchingData: loading.effects['quickCreate/getListDataRelated'],
}))(QuickCreate);

export const CreateType = Object.freeze({
  CONTACT: 'contact',
  COMPANY: 'company',
});

import React from 'react';
import { Col, Row } from 'antd';
import UploadLinkModal from './uploadLinkModal';
import UploadFileModal from './uploadFileModal';
import styles from './style.less';
import ListFile from './listFile';

class CustomUploadFile extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    const fileData = value
      ? value.map((file, index) => {
          return {
            key: index,
            order: file.order,
            id: file.id,
            originalname: file.originalname,
            createdAt: file.createdAt,
            createdBy: file.createdBy,
            note: file.note,
          };
        })
      : [];
    this.state = {
      dataSource: [...fileData],
      count: fileData.length,
    };
  }

  onAddLink = (fileData) => {
    this.updateDataSource(fileData);
  };

  removeFile = (key) => {
    const { dataSource, count } = this.state;
    const fileData = [...dataSource];
    const index = fileData.findIndex((item) => key === item.key);
    fileData.splice(index, 1);
    const newFileData = fileData.map((file, newIndex) => {
      return {
        key: newIndex,
        id: file.id,
        originalname: file.originalname,
        note: file.note,
      };
    });
    this.setState({
      dataSource: newFileData,
      count: count - 1,
    });
    if (fileData.length !== 0) {
      this.props.onChange([...fileData]);
    } else {
      this.props.onChange(undefined);
    }
  };

  onAddFile = (fileData) => {
    this.updateDataSource(fileData);
  };

  updateDataSource = (fileData) => {
    if (!fileData) return;
    const { dataSource, count } = this.state;
    const newFileData = {
      ...fileData,
      key: count,
    };

    const newSource = [...dataSource, newFileData];
    this.setState({
      dataSource: newSource,
      count: count + 1,
    });
    this.props.onChange([...newSource]);
  };

  render() {
    return (
      <div>
        <div className={styles.actionBtn}>
          <Row>
            <Col span={16} />
            <Col span={4}>
              <UploadLinkModal
                touchPointId={this.props.touchPointId}
                leadId={this.props.leadId}
                onAddLink={this.onAddLink}
                count={this.state.count}
              />
            </Col>
            <Col span={4}>
              <UploadFileModal
                touchPointId={this.props.touchPointId}
                leadId={this.props.leadId}
                onAddFile={this.onAddFile}
                count={this.state.count}
              />
            </Col>
          </Row>
        </div>
        <ListFile
          onChange={this.props.onChange}
          order={this.props.order}
          removeFile={(key) => this.removeFile(key)}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}

export default CustomUploadFile;

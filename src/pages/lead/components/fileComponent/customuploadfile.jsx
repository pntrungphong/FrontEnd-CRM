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
            fileType: file.fileType,
            fileUrl: file.fileUrl,
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

  onAddFile = (fileData) => {
    this.updateDataSource(fileData);
  };

  updateDataSource = (fileData) => {
    if (!fileData) return;
    const { dataSource, count } = this.state;
    const newFileData = {
      ...fileData,
      key: count,
      order: this.props.order,
      fileType: fileData.mimetype,
      fileUrl: fileData.url ?? '',
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
          status={this.props.status}
          order={this.props.order}
          dataIndex={this.props.dataIndex}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}

export default CustomUploadFile;

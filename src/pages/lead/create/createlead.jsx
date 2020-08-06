import React from 'react';
import { connect } from 'umi';
import { Drawer, Button, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CreateForm from './formcreate';

class CreateLead extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      showModal: false,
    };
  }

  showModal(showModal) {
    this.setState({ showModal });
  }

  onLaneChange = (value) => {
    this.formRef.current.setFieldsValue({ lane: value });
    this.formRef.current.submit();
  };

  render() {
    return (
      <>
        <FontAwesomeIcon
          icon={faPlus}
          size="1x"
          onClick={() => this.showModal(true)}
          className={styles.customCreateBtn}
        />
        <Drawer
          destroyOnClose
          className={styles.modalCreate}
          style={{ top: 0 }}
          title="Add new Lead"
          closable
          width={800}
          visible={this.state.showModal}
          onClose={() => this.showModal(false)}
          footer={[
            <Row justify="space-around">
              <Col span={4}>
                <Button onClick={() => this.onLaneChange()}>Save</Button>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => this.onLaneChange('LM')}>
                  #LM
                </Button>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => this.onLaneChange('PC')}>
                  #PC
                </Button>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => this.onLaneChange('PH')}>
                  #PH
                </Button>
              </Col>
            </Row>,
          ]}
        >
          <CreateForm
            formRef={this.formRef}
            id="createLeadForm"
            closeModal={() => this.showModal(false)}
          />
        </Drawer>
      </>
    );
  }
}
export default connect(({ lead }) => ({
  lead,
}))(CreateLead);

import React from 'react';
import { connect } from 'umi';
import { Drawer, Button, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './style.less';
import CreateForm from './formcreate';
import { laneColor } from '../components/definition';

class CreateLead extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      showModal: false,
    };
  }

  onLaneChange = (value) => {
    this.formRef.current.setFieldsValue({ lane: value });
    this.formRef.current.submit();
  };

  showModal(showModal) {
    this.setState({ showModal });
  }

  render() {
    return (
      <>
        {this.props.isIcon === true ? (
          <Button className={styles.createLeadBtn} onClick={() => this.showModal(true)}>
            <FontAwesomeIcon icon={faPlus} color="white" size="2x" />
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => this.showModal(true)}
            className={styles.customCreateBtn}
          >
            Create New Lead
          </Button>
        )}
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
            <Row justify="space-around" key="listController">
              <Col span={4}>
                <Button onClick={() => this.onLaneChange()}>Save</Button>
              </Col>
              <Col span={4}>
                <Button
                  onClick={() => this.onLaneChange('LM')}
                  style={{ background: laneColor.LM }}
                >
                  #LM
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  onClick={() => this.onLaneChange('PC')}
                  style={{ background: laneColor.PC }}
                >
                  #PC
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  onClick={() => this.onLaneChange('PH')}
                  style={{ background: laneColor.PH }}
                >
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

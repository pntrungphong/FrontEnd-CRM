import { Collapse } from 'antd';
import React from 'react';
import ListFileView from './listFileView';

const { Panel } = Collapse;

const CollapseFileDetail = (props) => {
  return (
    <Collapse>
      <Panel header="All file of lead" key="fileoflead">
        <ListFileView
          onChange={null}
          removeFile={null}
          status="Done"
          order={null}
          dataIndex=""
          dataSource={props.listFile}
        />
      </Panel>
    </Collapse>
  );
};
export default CollapseFileDetail;

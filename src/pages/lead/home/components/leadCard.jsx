import { Card, Popover } from 'antd';
import React from 'react';
import { history } from 'umi';
import UpdateLead from '../../update/updateLeadModal';
import PopInfomation from './popInfomation';
import styles from '../style.less';

const rankStore = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
};

const LeadTitle = ({ leadName, rank, id }) => {
  return (
    <>
      <div className={styles.leadTitle}>
        <div
          onClick={() => history.push({ pathname: `'/sales/lead/detail/${id}` })}
          className={styles.textTwo}
        >
          {leadName}
        </div>
        <div className={styles.rankHeader}>{rankStore[rank]}</div>
        <div id="components-dropdown-demo-dropdown-button">
          <UpdateLead leadId={id} />
        </div>
      </div>
    </>
  );
};

const LeadCard = (props) => {
  return (
    <div>
      <Card
        headStyle={{ padding: 0 }}
        bodyStyle={{ padding: 5, paddingLeft: 10 }}
        title={<LeadTitle leadName={props.item.name} rank={props.item.rank} id={props.item.id} />}
        className={styles.cardOne}
      >
        <div className={styles.textOne}>
          <h3>
            <strong>Company: </strong>
            <Popover
              destroyTooltipOnHide
              content={<PopInfomation id={props.item.company.id} type="company" />}
              trigger="click"
              placement="right"
            >
              <a>{props.item.company.name}</a>
            </Popover>
          </h3>
          <h3>
            <strong>Description: </strong> {props.item.description}
          </h3>
        </div>
      </Card>
    </div>
  );
};

export default LeadCard;

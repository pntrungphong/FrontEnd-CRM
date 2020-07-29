import { Card } from 'antd';
import React from 'react';
import { history } from 'umi';
import UpdateLead from '../../update/updateLeadModal';
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
          onClick={() => history.push({ pathname: `/lead/detail/${id}` })}
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
    <div key={props.item.id}>
      <Card
        headStyle={{ padding: 0 }}
        bodyStyle={{ padding: 5, paddingLeft: 10 }}
        title={<LeadTitle leadName={props.item.name} rank={props.item.rank} id={props.item.id} />}
        className={styles.cardOne}
      >
        <div className={styles.textOne}>
          <h3>
            <strong>Company: </strong>
            <a
              onClick={() => {
                history.push({
                  pathname: `/company/detail/${props.item.company.id}`,
                });
              }}
            >
              {props.item.company.name}
            </a>
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

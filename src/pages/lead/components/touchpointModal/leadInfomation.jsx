import React from 'react';
import styles from './style.less';

// if function
const LeadInfomation = (props) => {
  return (
    <>
      <div className={styles.header}>
        <p className={styles.title}>Lead Information</p>
      </div>

      <h4>Name: {props.lead.name}</h4>
      <h4>
        Company: <a href="">{props.lead.company.label}</a>{' '}
      </h4>
      <h4>
        Contact:{' '}
        {props.lead.contact.map((item) => (
          <a href="" key={item.label}>
            {' '}
            {item.label}
          </a>
        ))}
      </h4>
      <h4>
        Relation to:{' '}
        {props.lead.relation.map((item) => (
          <a href="" key={item.label}>
            {' '}
            {item.label}
          </a>
        ))}
      </h4>
      <h4>
        Description: <p>{props.lead.description}</p>
      </h4>

      <h4>
        Hash tag:{' '}
        {props.lead.tag.map((item) => (
          <a key={item.label}>#{item.label}</a>
        ))}
      </h4>
    </>
  );
};
export default LeadInfomation;

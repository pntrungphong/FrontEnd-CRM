import React from 'react';
import styles from './Welcome.less';

export default () => (
  <div className={styles.welcome}>
    <div className="content">
      <img src="/geekadventure.svg" alt="GEEK Adventure" />

      <div className="cover-content">
          <h1 className="heading-content">
            It's time for GEEK Adventure
          </h1>
          <div className="body-content">
            Join us and share our interest in 
making impactful digital products.
          </div>
        </div>
    </div>
  </div>
);

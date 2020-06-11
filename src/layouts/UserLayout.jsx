import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { connect, Link, useIntl } from 'umi';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Col, Row } from 'antd';
import styles from './UserLayout.less';
import materialUITheme from '../../config/materialUITheme';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <ThemeProvider theme={materialUITheme}>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div className={styles.container}>
          <div className={styles.content}>
            <Row>
              <Col className={styles.logoContainer} sm={24} md={12}>
                <div className={styles.sider}>
                  LOGO
                </div>
              </Col>
              <Col sm={24} md={12}>
                <div className={styles.mainContent}>
                  <div className={styles.header}>
                    <Link to="/">
                      <h3 className={styles.title}>Welcome to Harmonia Portal!</h3>
                    </Link>
                  </div>
                  <div className={styles.desc}>Please Login with your Registered Email</div>

                  {children}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);

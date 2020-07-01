/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { PageLoading } from '@ant-design/pro-layout';
import React from 'react';
import { connect, Link, useIntl } from 'umi';
import { Button, Result } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
// import { useMount } from "ahooks";
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';
import { getAuthorityFromRouter } from '@/utils/utils';
import RightContent from '@/components/GlobalHeader/RightContent';
// import { stringify } from 'querystring';
import styles from './BasicLayout.less';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  // useMount(() => {
  //   const { dispatch } = props;
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //   }
  // });
  /**
   * init variables
   */

  const logout = () => {
    dispatch({
      type: 'login/logout',
      payload: {},
    });
  };

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: getAuthority(),
  };
  const { formatMessage } = useIntl();

  const { loading, currentUser } = props;
  const isLogin = currentUser && currentUser.id;
  // const queryString = stringify({
  //   redirect: window.location.href,
  // });

  if (!isLogin && loading) {
    return <PageLoading />;
  }

  return (
    <>
      <ProLayout
        className={styles.antMenuCustom}
        // logo="Logo"
        // formatMessage={formatMessage}
        menuHeaderRender={(logoDom) => (
          <>
            <Link className={styles.logo} to="/">
              {logoDom}
            </Link>
            <div className={styles.splitter} />
            <div className={styles.titleOne}>HARMONIA</div>
            <Button onClick={logout} type="primary" className="btn-logout">
              Logout
            </Button>
          </>
        )}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps) => {
          const { name } = menuItemProps;
          const customDom = <span className={styles.antMenuItemInner}>{name}</span>;
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return customDom;
          }

          return <Link to={menuItemProps.path}>{customDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        breakpoint="sm"
        collapsedButtonRender={() => <MenuOutlined />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings, user, loading }) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(BasicLayout);

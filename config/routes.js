export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: './user/login',
      },
      {
        Routes: ['src/pages/Authorized'],
        component: '../layouts/BasicLayout',
        authority: ['admin', '', 'user', 'USER'],
        routes: [
          {
            path: '/company',
            name: 'company',
            component: 'company/home',
          },
          {
            path: '/company/update',
            component: 'company/update',
          },
          {
            path: '/company/detail',
            component: 'company/detail',
          },
          {
            path: '/contact/detail',
            component: 'contact/detail',
          },
          {
            path: '/company/create',
            component: 'company/create',
          },
          {
            path: '/contact/',
            name: 'contact',
            component: 'contact/home',
          },
          {
            path: '/contact/update',
            component: 'contact/update',
          },
          {
            path: '/contact/create',
            component: 'contact/create',
          },
        ],
      },
    ],
  },
];

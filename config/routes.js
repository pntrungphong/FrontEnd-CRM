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
        authority: ['admin', 'user', 'USER'],
        routes: [
          {
            path: '/company',
            name: 'Company',
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
            path: '/contact',
            name: 'Contact',
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
          {
            path: '/lead',
            name: 'Lead',
            component: 'lead/home',
          },
          {
            path: '/lead/update',
            component: 'lead/update',
          },
          {
            path: '/lead/detail',
            component: 'lead/detail',
          },
          {
            path: '/lead/create',
            component: 'lead/create',
          },
        ],
      },
    ],
  },
];

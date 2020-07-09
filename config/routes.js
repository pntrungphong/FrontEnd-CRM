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
            path: '/company/update/:id?',
            component: 'company/update',
          },
          {
            path: '/company/detail/:id?',
            component: 'company/detail',
          },
          {
            path: '/contact/detail/:id?',
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
            path: '/contact/update/:id?',
            component: 'contact/update',
          },
          {
            path: '/contact/create',
            component: 'contact/create',
          },
          {
            path: '/contact/detail/id',
            component: 'contact/detail',
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
            path: '/lead/detail/:id?',
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

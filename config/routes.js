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
            path: '/',
            component: 'lead/dashboard',
          },
          {
            path: '/sales/dashboard',
            name: 'Sales Dashboard',
            component: 'lead/dashboard',
          },
          {
            path: '/client',
            name: 'Database Management',
            routes: [
              {
                path: '/client/contact',
                name: 'Contact',
                component: 'contact/home',
              },
              {
                path: '/client/lead',
                name: 'Lead',
                component: 'archives/home',
              },
              {
                path: '/client/company',
                name: 'Company',
                component: 'company/home',
              },
              {
                path: '/client/company/update/:id?',
                component: 'company/update',
              },
              {
                path: '/client/company/detail/:id?',
                component: 'company/detail',
              },
              {
                path: '/client/contact/detail/:id?',
                component: 'contact/detail',
              },
              {
                path: '/client/company/create',
                component: 'company/create',
              },
              {
                path: '/client/contact/update/:id?',
                component: 'contact/update',
              },
              {
                path: '/client/contact/create',
                component: 'contact/create',
              },
              {
                path: '/client/contact/detail/:id?',
                component: 'contact/detail',
              },
              {
                path: '/client/lead/update/:id?',
                component: 'lead/update',
              },
              {
                path: '/client/lead/detail/:id?',
                component: 'lead/detail',
              },
              {
                path: '/client/lead/create',
                component: 'lead/create',
              },
              {
                path: '/client/lead/archives/detail/:id?',
                component: 'archives/detail',
              },
              {
                path: '/client/lead/archives/create',
                component: 'archives/create',
              },
            ],
          },
        ],
      },
    ],
  },
];

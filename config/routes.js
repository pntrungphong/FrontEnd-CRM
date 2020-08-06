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
            path: '/client',
            name: 'Client Management',
            routes: [
              {
                path: '/client/company',
                name: 'Company',
                component: 'company/home',
              },
              {
                path: '/client/contact',
                name: 'Contact',
                component: 'contact/home',
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
            ],
          },
          {
            path: '/sales',
            name: 'Sales Management',
            routes: [
              {
                path: '/sales/dashboard',
                name: 'Dashboard',
                component: 'lead/dashboard',
              },
              {
                path: '/sales/lead/update/:id?',
                component: 'lead/update',
              },
              {
                path: '/sales/lead/detail/:id?',
                component: 'lead/detail',
              },
              {
                path: '/sales/lead/create',
                component: 'lead/create',
              },
              {
                path: '/sales/lead/archives',
                name: 'Lead Database',
                component: 'archives/home',
              },
              {
                path: '/sales/lead/archives/detail/:id?',
                component: 'archives/detail',
              },
              {
                path: '/sales/lead/archives/create',
                component: 'archives/create',
              },
            ],
          },
        ],
      },
    ],
  },
];

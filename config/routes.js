export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/dashboard',
        component: '../layouts/SecurityLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', '', 'user', 'USER'],
        routes: [
          {
            path: '/',
            component: 'Welcome.jsx',
          },
        ],
      },
      {
        path: '/login',
        component: './user/login',
      },
    ],
  },
];

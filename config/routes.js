export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        routes: [
          {
            path: '/company',
            component: './company',
          },
        ],
      },
    ],
  },
];

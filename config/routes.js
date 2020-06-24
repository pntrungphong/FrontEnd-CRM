export default [{
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [{
            path: '/dashboard',
            component: '../layouts/BasicLayout',
            Routes: ['src/pages/Authorized'],
            authority: ['admin', '', 'user', 'USER'],

        },
        {
            path: '/company',
            Routes: ['src/pages/Authorized'],
            authority: ['admin', '', 'user', 'USER'],
            routes: [{
                    path: '/',
                    component: './company/home',
                },
                {
                    path: '/update',
                    component: 'company/update',
                },
                {
                    path: '/create',
                    component: 'company/create',
                },
                // {
                //     path: '/contact/',
                //     component: 'contact/home',
                // },
                // {
                //     path: '/contact/update',
                //     component: 'contact/update',
                // },
                // {
                //     path: '/contact/create',
                //     component: 'contact/create',
                // },

            ]

        },
        {
            path: '/login',
            component: './user/login',
        },



    ],
}, ];
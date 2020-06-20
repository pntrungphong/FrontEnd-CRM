export default [{
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [{
        path: '/',
        routes: [{
                path: '/',
                component: 'Welcome',
            },
            {
                path: '/company',
                component: 'Company',
            },
            {
                path: '/company/create',
                component: 'company/create',
            },
            {
                path: '/login',
                component: 'user/login',
            },
            {
                path: '/register',
                component: 'user/register',
            },
            {
                path: '/company/update',
                component: 'company/update',
            },


        ]
    }, ],
}, ];
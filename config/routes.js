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
                path: '/company/',
                component: 'company/home',
            },
            {
                path: '/company/update',
                component: 'company/update',
            },



        ]
    }, ],
}, ];
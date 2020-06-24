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
            {
                path: '/company/create',
                component: 'company/create',
            },
            {
                path: '/contact/',
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



        ]
    }, ],
}, ];
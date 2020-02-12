export default [{
    path: '/login',
    name: 'login',
    component: require('../../views/authentication/Login').default,
    meta: {auth: false}
}, {
    path: '/password/forgot',
    name: 'password.forgot',
    component: require('../../views/authentication/ForgotPassword').default,
    meta: {auth: false}
}, {
    path: '/password/reset/:token',
    name: 'password.reset',
    props: true,
    component: require('../../views/authentication/ResetPassword').default,
    meta: {auth: false}
}];

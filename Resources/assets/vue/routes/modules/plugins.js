import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/plugins',
    name: 'plugins',
    component: require('../../views/plugins/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/plugins/edit/:id',
    name: 'plugins.edit',
    component: require('../../views/plugins/Edit').default,
    props: true,
    meta: {auth: true, role: ROLE_USER}
}];

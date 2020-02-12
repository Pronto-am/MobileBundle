import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/config',
    name: 'remote_config',
    component: require('../../views/config/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/config/edit',
    name: 'remote_config.add',
    component: require('../../views/config/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/config/edit/:id',
    name: 'remote_config.edit',
    props: true,
    component: require('../../views/config/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}];

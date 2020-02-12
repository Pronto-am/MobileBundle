import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/devices',
    name: 'devices',
    component: require('../../views/devices/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/devices/edit',
    name: 'devices.add',
    component: require('../../views/devices/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}];

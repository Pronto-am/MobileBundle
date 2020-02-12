import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/users',
    name: 'users',
    component: require('../../views/users/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/users/edit',
    name: 'users.add',
    component: require('../../views/users/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/users/edit/:id',
    name: 'users.edit',
    props: true,
    component: require('../../views/users/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}];

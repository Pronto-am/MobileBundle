import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/customers',
    name: 'customers',
    component: require('../../views/customers/Index').default,
    meta: {auth: true, role: ROLE_SUPER_ADMIN}
}, {
    path: '/customers/edit',
    name: 'customers.add',
    component: require('../../views/customers/Edit').default,
    meta: {auth: true, role: ROLE_SUPER_ADMIN}
}, {
    path: '/customers/edit/:id',
    name: 'customers.edit',
    props: true,
    component: require('../../views/customers/Edit').default,
    meta: {auth: true, role: ROLE_SUPER_ADMIN}
}];

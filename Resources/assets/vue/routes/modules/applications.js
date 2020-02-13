import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/applications',
    name: 'applications',
    component: require('../../views/applications/Index').default,
    meta: {auth: true, role: ROLE_USER, layout: 'front'}
}, {
    path: '/applications/select',
    name: 'applications.select',
    component: require('../../views/applications/Select').default,
    meta: {auth: true, role: ROLE_USER, layout: 'front'}
}, {
    path: '/applications/edit',
    name: 'applications.add',
    component: require('../../views/applications/Edit').default,
    props: true,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/applications/edit/:id',
    name: 'applications.edit',
    component: require('../../views/applications/Edit').default,
    props: true,
    meta: {auth: true, role: ROLE_USER}
}];

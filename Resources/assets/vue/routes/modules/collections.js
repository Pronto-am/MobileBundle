import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/collections',
    name: 'collections',
    component: require('../../views/collections/Index').default,
    meta: {auth: true, role: ROLE_SUPER_ADMIN}
}, {
    path: '/collections/edit',
    name: 'collections.add',
    component: require('../../views/collections/Edit').default,
    meta: {auth: true, role: ROLE_SUPER_ADMIN}
}, {
    path: '/collections/edit/:id',
    name: 'collections.edit',
    props: true,
    component: require('../../views/collections/Edit').default,
    meta: {auth: true, role: ROLE_SUPER_ADMIN}
}];

import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/versions',
    name: 'app_versions',
    component: require('../../views/versions/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/versions/edit',
    name: 'app_versions.add',
    component: require('../../views/versions/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/versions/edit/:id',
    name: 'app_versions.edit',
    props: true,
    component: require('../../views/versions/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}];

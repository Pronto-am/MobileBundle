import {ROLE_USER} from '../../services/auth.service';

export default [{
    path: '/translations',
    name: 'translations',
    component: require('../../views/translations/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/translations/edit',
    name: 'translations.add',
    component: require('../../views/translations/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/translations/edit/:id',
    name: 'translations.edit',
    props: true,
    component: require('../../views/translations/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}];

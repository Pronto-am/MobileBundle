import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../../services/auth.service';

export default [{
    path: '/notifications',
    name: 'push_notifications',
    component: require('../../views/notifications/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/notifications/edit',
    name: 'push_notifications.add',
    component: require('../../views/notifications/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/notifications/edit/:id',
    name: 'push_notifications.edit',
    props: true,
    component: require('../../views/notifications/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/notifications/statistics/:id',
    name: 'push_notifications.statistics',
    props: true,
    component: require('../../views/notifications/statistics/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/notifications/segments',
    name: 'push_notifications.segments',
    component: require('../../views/notifications/segments/Index').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/notifications/segments/edit',
    name: 'push_notifications.segments.add',
    component: require('../../views/notifications/segments/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}, {
    path: '/notifications/segments/edit/:id',
    name: 'push_notifications.segments.edit',
    props: true,
    component: require('../../views/notifications/segments/Edit').default,
    meta: {auth: true, role: ROLE_USER}
}];

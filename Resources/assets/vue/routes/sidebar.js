import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../services/auth.service';
import Vue from 'vue';

export default [{
    name: 'applications',
    icon: 'list-alt',
    locKey: 'menu.applications',
    role: ROLE_SUPER_ADMIN,
}, {
    name: 'collections',
    icon: 'file-alt',
    locKey: 'menu.collections',
    submenuOpen: false,
    role: ROLE_USER,
    children: [],
}, {
    name: 'push_notifications',
    icon: 'bell',
    locKey: 'menu.push_notifications',
    submenuOpen: false,
    role: ROLE_USER,
    children: [{
        name: 'push_notifications.segments',
        locKey: 'menu.segments',
        role: ROLE_SUPER_ADMIN,
    }],
}, {
    name: 'devices',
    icon: 'mobile-alt',
    locKey: 'menu.devices',
    role: ROLE_USER,
}, {
    name: 'app_versions',
    icon: 'code-branch',
    locKey: 'menu.app_versions',
    role: ROLE_SUPER_ADMIN,
}, {
    name: 'remote_config',
    icon: 'list',
    locKey: 'menu.remote_config',
    role: ROLE_USER,
}, {
    name: 'users',
    icon: 'list',
    locKey: 'menu.users',
    role: ROLE_USER,
}, {
    name: 'plugins',
    icon: 'plug',
    locKey: 'menu.plugins',
    role: ROLE_SUPER_ADMIN,
}, {
    name: 'customers',
    icon: 'cogs',
    locKey: 'menu.customers',
    role: ROLE_SUPER_ADMIN,
}];

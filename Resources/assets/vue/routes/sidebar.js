import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../services/auth.service';

export default [{
    name: 'applications',
    icon: 'list-alt',
    text: 'Applicaties',
    role: ROLE_SUPER_ADMIN,
}, {
    name: 'collections',
    icon: 'file-alt',
    text: 'Collecties',
    submenuOpen: false,
    role: ROLE_USER,
    children: [],
}, {
    name: 'push_notifications',
    icon: 'bell',
    text: 'Push notificaties',
    submenuOpen: false,
    role: ROLE_USER,
    children: [{
        name: 'push_notifications.segments',
        text: 'Segmenten',
        role: ROLE_SUPER_ADMIN,
    }],
}, {
    name: 'devices',
    icon: 'mobile-alt',
    text: 'Apparaten',
    role: ROLE_USER,
}, {
    name: 'app_versions',
    icon: 'code-branch',
    text: 'App versies',
    role: ROLE_SUPER_ADMIN,
}, {
    name: 'remote_config',
    icon: 'list',
    text: 'Remote config',
    role: ROLE_USER,
}, {
    name: 'users',
    icon: 'list',
    text: 'Gebruikers',
    role: ROLE_USER,
}, {
    name: 'plugins',
    icon: 'plug',
    text: 'Plugins',
    role: ROLE_SUPER_ADMIN,
}, {
    name: 'customers',
    icon: 'cogs',
    text: 'Klanten',
    role: ROLE_SUPER_ADMIN,
}];

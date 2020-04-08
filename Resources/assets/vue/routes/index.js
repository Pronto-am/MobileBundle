import applications from './modules/applications';
import authentication from './modules/authentication';
import collections from './modules/collections';
import config from './modules/remote_config';
import customers from './modules/customers';
import devices from './modules/devices';
import notifications from './modules/notifications';
import plugins from './modules/plugins';
import translations from './modules/translations';
import versions from './modules/app_versions';
import users from './modules/users';

const routes = [{
    path: '/',
    name: 'dashboard',
    component: require('../views/Dashboard').default,
    meta: {auth: true},
}, {
    path: '*',
    name: '404',
    component: require('../views/errors/NotFound').default,
    meta: {auth: false},
}].concat(
    applications, authentication, collections, config, customers, devices, notifications, plugins, translations, users, versions,
);

export default routes;

import applications from './modules/applications';
import authentication from './modules/authentication';
import config from './modules/remote_config';
import customers from './modules/customers';
import devices from './modules/devices';
import notifications from './modules/notifications';
import plugins from './modules/plugins';
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
    applications, authentication, config, customers, devices, notifications, plugins, users, versions,
);

export default routes;

import authentication from './modules/authentication';
import applications from './modules/applications';
import plugins from './modules/plugins';
import users from './modules/users';
import notifications from './modules/notifications';
import versions from './modules/app_versions';
import devices from './modules/devices';
import config from './modules/remote_config';

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
    authentication, plugins, applications, versions, users, notifications, devices, config
);

export default routes;

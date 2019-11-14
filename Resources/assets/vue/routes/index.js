import authentication from './modules/authentication';

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
  authentication,
);

export default routes;

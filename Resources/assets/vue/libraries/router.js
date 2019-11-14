import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../routes';
import OAuth from './../oauth';
import acl from './../acl';

const router = new VueRouter({
  mode: 'history',
  base: '/beta/',
  routes: routes
});

Vue.use(VueRouter);

let oAuth = new OAuth();

router.beforeEach((to, from, next) => {
  //If visiting login view but you already have logged in, you should not be able to see this view
  if (!to.meta.auth && oAuth.isAuthenticated()) {
    return next({
      path: '/'
    })
  }

  //If you are visiting '/' and you are a guest then, you must be redirected to login
  if (to.meta.auth && oAuth.guest()) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }

  if(to.meta.auth) {
    // Customers' license is insufficient
    if (to.meta.license !== undefined &&
            window.customer.license !== undefined &&
            window.customer.license.license_type < to.meta.license) {

      return next({
        path: '/'
      })
    }

    // User has no rights visiting this page
    if (to.meta.permission !== undefined &&
            window.roles !== undefined &&
            !acl.userCan(to.meta.permission)) {

      return next({
        path: '/'
      })
    }
  }

  return next()
});

export default router;

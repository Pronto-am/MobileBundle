import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../routes';
import OAuthService from './../services/oauth.service';

const router = new VueRouter({
    mode: 'history',
    base: '/beta/',
    routes: routes
});

Vue.use(VueRouter);

let oAuth = new OAuthService();

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

    // Logged in and visiting a protected route
    if(to.meta.auth && oAuth.isAuthenticated()) {
        // Check if the user has selected an application version
        if(!Vue.prototype.$applicationService.versionIsSet() && to.name !== 'applications.select') {
            return next({
                name: 'applications.select'
            });
        }

        if(!Vue.prototype.$auth.userHasRole(to.meta.role)) {
            return next({
                name: 'dashboard'
            });
        }
    }

    return next()
});

export default router;

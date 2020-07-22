import Vue from 'vue'
import OAuthService from './services/oauth.service';
import AuthService from './services/auth.service';
import ApplicationService from './services/application.service';
import ErrorService from "./services/errors.service";

Vue.prototype.$events = new Vue();

/**
 * Prototype to create a url
 * @param url
 * @param params
 * @returns {string}
 */
Vue.prototype.$path = (url, params = {}) => {
    let keys = Object.keys(params);

    for (let key of keys) {
        url = url.replace(`:${key}`, params[key]);
    }

    return `/api/vue/${url.replace(/^\/+/g, '')}`;
};

Vue.prototype.$oauth = new OAuthService();
Vue.prototype.$auth = new AuthService();
Vue.prototype.$application = new ApplicationService();
Vue.prototype.$error = new ErrorService();

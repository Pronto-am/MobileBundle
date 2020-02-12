import Vue from 'vue';

/**
 * Request interceptor
 */
window.axios.interceptors.request.use((config) => {

    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    // Add the authentication header when the user is logged in
    if (Vue.prototype.$oauth.isAuthenticated()) {
        // Set the authorization header for each request
        config.headers['Authorization'] = Vue.prototype.$oauth.getAuthHeader();
    }

    // Add application and version ID
    if(Vue.prototype.$applicationService.applicationIsSet()) {
        config.headers['Application-Id'] = Vue.prototype.$applicationService.getApplication().id;
    }
    if(Vue.prototype.$applicationService.versionIsSet()) {
        config.headers['Application-Version-Id'] = Vue.prototype.$applicationService.getVersion().id;
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});


/**
 * Response interceptor
 */
window.axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;

}, async (error) => {
    let originalRequest = error.config;

    // Refresh the access token
    if (error.response !== undefined && error.response.status === 401 && Vue.prototype.$oauth.isAuthenticated() && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            await Vue.prototype.$oauth.refreshToken();

            // Retry original request
            return axios(originalRequest);
        } catch (error) {
            // Logout
            await Vue.prototype.$oauth.logout();
        }
    }

    // Do something with response error
    return Promise.reject(error);
});



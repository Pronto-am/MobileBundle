import OAuth from './../oauth';

let oAuth = new OAuth();

/**
 * Request interceptor
 */
window.axios.interceptors.request.use(function (config) {

    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    // Add the authentication header when the user is logged in
    if (oAuth.isAuthenticated()) {
    // Set the authorization header for each request
        config.headers['Authorization'] = oAuth.getAuthHeader();
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


/**
 * Response interceptor
 */
window.axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {

    // Refresh the access token
    if (error.response !== undefined && error.response.status === 401 && oAuth.isAuthenticated()) {
        oAuth.logout();
    }

    // Do something with response error
    return Promise.reject(error);
});



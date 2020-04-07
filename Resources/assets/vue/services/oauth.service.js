import Cookies from 'js-cookie';
import Vue from 'vue';

export default class OAuthService {

    /**
     * Constructor
     */
    constructor() {
        this.session = Cookies;
    }

    /**
     * Logout
     */
    logout() {
        Vue.prototype.$application.clear();

        this.session.remove('access_token');
        this.session.remove('refresh_token');
    }

    /**
     * Guest check
     * @returns {boolean}
     */
    guest() {
        return !this.isAuthenticated();
    }

    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.session.get('access_token') !== undefined;
    }

    /**
     * Refresh the access token of the user
     * @returns {Promise<any>}
     */
    refreshToken() {
        return new Promise((resolve, reject) => {
            axios.post('/api/vue/auth/token', {
                refresh_token: this.session.get('refresh_token')
            }).then(response => {
                this.storeSession(response.data);

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Get the authentication header
     * @returns {*}
     */
    getAuthHeader() {
        if (this.isAuthenticated()) {
            let access_token = this.getItem('access_token');

            return 'Bearer ' + access_token
        }

        return null
    }

    /**
     * Get an item from the cookies
     * @param key
     */
    getItem(key) {
        return this.session.get(key);
    }

    /**
     * Store the session data
     * @param data
     */
    storeSession(data) {
        let hourInMilliSeconds = 86400;
        let time = data.expires_in / hourInMilliSeconds;

        this.session.set('access_token', data.access_token);
        this.session.set('refresh_token', data.refresh_token);
    }

}

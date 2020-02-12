import Vue from 'vue';

export const ROLE_USER = 'ROLE_USER';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

/**
 * ACL class to provide helper functions for the user and it's roles
 */
export default class AuthService {

    /**
     * Initialize the ACL plugin
     */
    async init() {
        try {
            const response = await axios.all([
                axios.get(Vue.prototype.$url('auth/user')),
            ]);

            this.user = response[0].data.data;
        } catch (error) {
            this.user = {};
        }
    }

    /**
     * Check if a user has the provided role
     * @returns {boolean}
     * @param role
     */
    userHasRole(role) {
        if (this.isAdmin()) {
            return true;
        }

        if(role === undefined) {
            return true;
        }

        console.log(this.user);

        try {
            return this.user.roles.indexOf(role) !== -1;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a user is an administrator
     * @returns {boolean}
     */
    isAdmin() {
        try {
            return this.user.roles.indexOf('ROLE_SUPER_ADMIN') !== -1;
        } catch (error) {
            return false;
        }
    }
}

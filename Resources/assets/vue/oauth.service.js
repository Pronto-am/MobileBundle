export default {
    user: null,

    destroySession() {
        this.user = null
    },

    async currentUser() {
        if (this.user) {
            return this.user
        }

        try {
            let user = await window.axios.get('/api/vue/users/profile');

            this.user = user;

            return new Promise(resolve => resolve(user))
        } catch (error) {
            return new Promise(reject => reject(error))
        }
    },

    async attemptLogin(credentials) {
        try {
            let response = await window.axios.post('/api/vue/users/login', credentials);
            return new Promise(resolve => resolve(response))
        } catch (error) {
            return new Promise(reject => reject(error))
        }
    },

    async refreshToken(params) {
        try {
            let response = await window.axios.post('/api/vue/users/refresh', params);
            return new Promise(resolve => resolve(response))
        } catch (error) {
            return new Promise(reject => reject(error))
        }
    },

    addAuthorizationHeader(header) {
        window.axios.defaults.headers.common['Authorization'] = header
    }
}

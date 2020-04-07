import Vue from 'vue';

export default class ApplicationService {
    async init() {
        try {
            this.application = JSON.parse(localStorage.getItem('application'));
            this.version = JSON.parse(localStorage.getItem('applicationVersion'));

            if(this.application !== null) {
                let response = await axios.get(Vue.prototype.$path('applications/:id', {id: this.application.id}));
                let application = response.data.data;

                this.setApplication(application);
            }
        } catch (error) {
            console.error(error);
        }
    }

    applicationIsSet() {
        return this.getApplication() !== null;
    }

    setApplication(application) {
        // delete application['customer'];
        delete application['oauth_clients'];

        this.application = application;
        localStorage.setItem('application', JSON.stringify(application));
    }

    getApplication() {
        return this.application;
    }

    clearApplication() {
        localStorage.removeItem('application');
    }

    versionIsSet() {
        return this.getVersion() !== null;
    }

    setVersion(version) {
        this.version = version;
        localStorage.setItem('applicationVersion', JSON.stringify(version));
    }

    getVersion() {
        return this.version;
    }

    clearVersion() {
        localStorage.removeItem('version');
    }

    clear() {
        this.clearApplication();
        this.clearVersion();
    }
}

import Vue from 'vue';

export default class ApplicationService {
    async init() {
        try {
            this.application = JSON.parse(localStorage.getItem('application'));
            this.version = JSON.parse(localStorage.getItem('applicationVersion'));

            let response = await axios.get(Vue.prototype.$path('applications/:id', {id: this.application.id}));
            this.application = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    applicationIsSet() {
        return this.getApplication() !== null;
    }

    setApplication(application) {
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

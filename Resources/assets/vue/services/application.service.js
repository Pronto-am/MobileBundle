export default class ApplicationService {
    constructor() {
        // TODO: Retrieve an updated instance of the application from the api, to update properties
    }

    applicationIsSet() {
        return this.getApplication() !== null;
    }

    setApplication(application) {
        localStorage.setItem('application', JSON.stringify(application));
    }

    getApplication() {
        return JSON.parse(localStorage.getItem('application'));
    }

    clearApplication() {
        localStorage.removeItem('application');
    }

    versionIsSet() {
        return this.getVersion() !== null;
    }

    setVersion(version) {
        localStorage.setItem('applicationVersion', JSON.stringify(version));
    }

    getVersion() {
        return JSON.parse(localStorage.getItem('applicationVersion'));
    }

    clearVersion() {
        localStorage.removeItem('version');
    }

    clear() {
        this.clearApplication();
        this.clearVersion();
    }
}

import Repository from './repository';

const resource = '/plugins';

export class PluginRepository {
    list() {
        return Repository.get(resource);
    }

    get(id) {
        return Repository.get(`${resource}/${id}`);
    }
}

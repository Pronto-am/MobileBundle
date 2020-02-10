import { PluginRepository } from './plugin_repository';

const repositories = {
    plugins: PluginRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name],
};

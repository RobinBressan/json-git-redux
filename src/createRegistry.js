export default function createRegistry(repositories) {
    const storage = { ...repositories };

    const registry = {
        register(repositoryName, repository) {
            storage[repositoryName] = repository;

            return registry;
        },

        has(repositoryName) {
            return !!storage[repositoryName];
        },

        get(repositoryName) {
            return storage[repositoryName];
        },

        reduce(reducer, initialValue) {
            return Object
                .keys(storage)
                .reduce((previous, repositoryName) => reducer(
                    previous,
                    storage[repositoryName],
                    repositoryName,
                ), initialValue);
        },
    };

    return registry;
}

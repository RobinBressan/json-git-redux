function ensureRepository(registry, repositoryName) {
    if (!registry.has(repositoryName)) {
        throw new Error(`Repository ${repositoryName} not found`);
    }
}

export function getLog(registry, repositoryName) {
    ensureRepository(registry, repositoryName);

    return registry.get(repositoryName).log;
}

export function getTree(registry, repositoryName) {
    ensureRepository(registry, repositoryName);

    return registry.get(repositoryName).tree;
}

export function getDiff(registry, repositoryName, left, right) {
    ensureRepository(registry, repositoryName);

    return registry.get(repositoryName).diff(left, right);
}

export function apply(registry, repositoryName, patch) {
    ensureRepository(registry, repositoryName);

    return registry.get(repositoryName).apply(patch);
}

export function getJSON(registry, repositoryName) {
    ensureRepository(registry, repositoryName);

    return registry.get(repositoryName).toJSON();
}

import {
    CHECKOUT,
    COMMIT,
    MERGE,
    REVERT,
} from './types';

export function checkout(repositoryName, targetBranch, shouldCreateBranch = false) {
    return {
        payload: {
            repositoryName,
            shouldCreateBranch,
            targetBranch,
        },
        type: CHECKOUT,
    };
}

export function commit(repositoryName, author, message, tree) {
    return {
        payload: {
            author,
            message,
            repositoryName,
            tree,
        },
        type: COMMIT,
    };
}

export function merge(repositoryName, author, targetBranch, resolver) {
    const payload = {
        author,
        repositoryName,
        targetBranch,
    };

    if (resolver) {
        payload.resolver = resolver;
    }

    return {
        payload,
        type: MERGE,
    };
}

export function revert(repositoryName, author, targetCommitHash, resolver) {
    const payload = {
        author,
        repositoryName,
        targetCommitHash,
    };

    if (resolver) {
        payload.resolver = resolver;
    }

    return {
        payload,
        type: REVERT,
    };
}

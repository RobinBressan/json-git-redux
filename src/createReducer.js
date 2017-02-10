import {
    COMMIT,
    MERGE,
    CHECKOUT,
    REVERT,
} from './types';

export default function createReducer(registry) {
    function createState() {
        return {
            heads: registry.reduce((previous, repository, repositoryName) => ({
                ...previous,
                [repositoryName]: repository.head,
            }), {}),
        };
    }

    const initialState = createState();

    return function reducer(state = initialState, action) {
        const {
            payload: {
                repositoryName,
                ...payload
            } = {},
            type,
        } = action;

        if (!repositoryName) {
            return state;
        }

        if (!registry.has(repositoryName)) {
            throw new Error(`Repository ${repositoryName} not found`);
        }

        const repository = registry.get(repositoryName);

        switch (type) {
        case CHECKOUT:
            repository.checkout(
                payload.targetBranch,
                payload.shouldCreateBranch,
            );

            return createState();

        case COMMIT:
            repository.commit(
                payload.author,
                payload.message,
                payload.tree,
            );

            return createState();

        case MERGE:
            if (payload.resolver) {
                repository.merge(
                    payload.author,
                    payload.targetBranch,
                    payload.resolver,
                );
            } else {
                repository.merge(
                    payload.author,
                    payload.targetBranch,
                );
            }

            return createState();

        case REVERT:
            if (payload.resolver) {
                repository.revert(
                    payload.author,
                    payload.targetCommitHash,
                    payload.resolver,
                );
            } else {
                repository.revert(
                    payload.author,
                    payload.targetCommitHash,
                );
            }

            return createState();

        default:
            return state;
        }
    };
}

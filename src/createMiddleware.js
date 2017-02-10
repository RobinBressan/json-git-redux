import {
    CHECKOUT,
    COMMIT,
    MERGE,
    REVERT,
    succeeded,
    failed,
} from './types';

export default function createMiddleware() {
    return store => next => (action) => {
        const {
            payload,
            type,
        } = action;

        if ([
            CHECKOUT,
            COMMIT,
            MERGE,
            REVERT,
        ].indexOf(type) === -1) {
            next(action);
            return;
        }

        try {
            next(action);

            store.dispatch({
                payload: { ...payload },
                type: succeeded(type),
            });
        } catch (error) {
            store.dispatch({
                payload: {
                    ...payload,
                    error,
                },
                type: failed(type),
            });
        }
    };
}

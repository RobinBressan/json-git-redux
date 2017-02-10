import baseCreateReducer from './createReducer';
import createRegistry from './createRegistry';
import createSelectorFactory from './createSelectorFactory';
import * as selectors from './selectors';

const registry = createRegistry();

const createSelector = createSelectorFactory(registry);

export const apply = createSelector(selectors.apply);
export const getDiff = createSelector(selectors.getDiff);
export const getLog = createSelector(selectors.getLog);
export const getTree = createSelector(selectors.getTree);
export const getJSON = createSelector(selectors.getJSON);

export function createReducer(repositories) {
    Object
        .keys(repositories)
        .map(name => registry.register(name, repositories[name]));

    return baseCreateReducer(registry);
}

export { default as createMiddleware } from './createMiddleware';

export {
    checkout,
    commit,
    merge,
    revert,
} from './actionCreators';

export {
    CHECKOUT_FAILED,
    CHECKOUT_SUCCEEDED,
    CHECKOUT,
    COMMIT_FAILED,
    COMMIT_SUCCEEDED,
    COMMIT,
    MERGE_FAILED,
    MERGE_SUCCEEDED,
    MERGE,
    REVERT_FAILED,
    REVERT_SUCCEEDED,
    REVERT,
} from './types';

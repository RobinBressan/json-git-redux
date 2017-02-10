export default function createSelectorFactory(registry) {
    return function createSelector(selectorCallback) {
        return function selector(...args) {
            return selectorCallback(registry, ...args);
        };
    };
}

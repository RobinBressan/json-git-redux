import expect from 'expect';
import createSelectorFactory from './createSelectorFactory';

describe('createSelectorFactory', () => {
    it('should create a function which can call selectors with a registry', () => {
        const registry = { get: true };
        const createSelector = createSelectorFactory(registry);

        const selectorCallback = expect.createSpy().andReturn('hello');
        const selector = createSelector(selectorCallback);

        expect(selector('foo', 'bar')).toBe('hello');
        expect(selectorCallback).toHaveBeenCalledWith(registry, 'foo', 'bar');
    });
});

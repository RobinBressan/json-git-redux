import expect from 'expect';
import createRegistry from './createRegistry';

describe('createRegistry', () => {
    let registry;

    beforeEach(() => {
        registry = createRegistry();
    });

    it('should expose an api to register/get a repository', () => {
        const repository = {};
        registry.register('test', repository);

        expect(registry.get('test')).toBe(repository);
    });

    it('should tell if a repository exists when has() is called', () => {
        const repository = {};
        registry.register('test', repository);

        expect(registry.has('test')).toBe(true);
        expect(registry.has('other')).toBe(false);
    });

    it('should expose a reduce() method', () => {
        const repository1 = {};
        registry.register('test1', repository1);

        const repository2 = {};
        registry.register('test2', repository2);

        const reducer = expect.createSpy().andReturn({ foo: 'bar' });
        registry.reduce(reducer, {});

        expect(reducer.calls[0].arguments).toEqual([
            {},
            repository1,
            'test1',
        ]);
        expect(reducer.calls[1].arguments).toEqual([
            { foo: 'bar' },
            repository2,
            'test2',
        ]);
    });
});

import expect from 'expect';
import {
    apply,
    getDiff,
    getLog,
    getTree,
    getJSON,
} from './selectors';

describe('Selectors', () => {
    let registry;
    let repository;

    beforeEach(() => {
        repository = {
            tree: {
                foo: 'bar',
            },
            log: {
                hash: 'commit',
            },
            diff: expect.createSpy().andReturn('i am a diff'),
            apply: expect.createSpy().andReturn('i am a tree'),
            toJSON: expect.createSpy().andReturn('i am a json'),
        };

        registry = {
            has: expect.createSpy().andReturn(true),
            get: expect.createSpy().andReturn(repository),
        };
    });

    it('should return the history of a repository when getLog() is called and return the result', () => {
        expect(getLog(registry, 'test')).toEqual({
            hash: 'commit',
        });
        expect(registry.has).toHaveBeenCalledWith('test');
        expect(registry.get).toHaveBeenCalledWith('test');
    });

    it("should throw an error is the repository doesn't exist when getLog is called", () => {
        registry.has.andReturn(false);
        expect(() => getLog(registry, 'test')).toThrow(/Repository test not found/);
    });

    it('should return the tree of a repository when getTree() is called and return the result', () => {
        expect(getTree(registry, 'test')).toEqual({
            foo: 'bar',
        });
        expect(registry.has).toHaveBeenCalledWith('test');
        expect(registry.get).toHaveBeenCalledWith('test');
    });

    it("should throw an error is the repository doesn't exist when getTree is called", () => {
        registry.has.andReturn(false);
        expect(() => getTree(registry, 'test')).toThrow(/Repository test not found/);
    });

    it('should call repository.diff() on a repository when getDiff() is called and return the result', () => {
        expect(getDiff(registry, 'test', 'master', 'dev')).toBe('i am a diff');
        expect(registry.has).toHaveBeenCalledWith('test');
        expect(registry.get).toHaveBeenCalledWith('test');
        expect(repository.diff).toHaveBeenCalledWith('master', 'dev');
    });

    it("should throw an error is the repository doesn't exist when getDiff is called", () => {
        registry.has.andReturn(false);
        expect(() => getDiff(registry, 'test', 'master', 'dev')).toThrow(/Repository test not found/);
    });

    it('should call repository.apply() on a repository when apply() is called and return the result', () => {
        expect(apply(registry, 'test', { hello: 'world' })).toBe('i am a tree');
        expect(registry.has).toHaveBeenCalledWith('test');
        expect(registry.get).toHaveBeenCalledWith('test');
        expect(repository.apply).toHaveBeenCalledWith({ hello: 'world' });
    });

    it("should throw an error is the repository doesn't exist when apply is called", () => {
        registry.has.andReturn(false);
        expect(() => apply(registry, 'test', { hello: 'world' })).toThrow(/Repository test not found/);
    });

    it('should call repository.toJSON() on a repository when getJSON() is called and return the result', () => {
        expect(getJSON(registry, 'test')).toBe('i am a json');
        expect(registry.has).toHaveBeenCalledWith('test');
        expect(registry.get).toHaveBeenCalledWith('test');
        expect(repository.toJSON).toHaveBeenCalledWith();
    });

    it("should throw an error is the repository doesn't exist when getJSON is called", () => {
        registry.has.andReturn(false);
        expect(() => getJSON(registry, 'test')).toThrow(/Repository test not found/);
    });
});

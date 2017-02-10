import expect from 'expect';
import createReducer from './createReducer';
import createRegistry from './createRegistry';
import {
    checkout,
    commit,
    merge,
    revert,
} from './actionCreators';
import {
    COMMIT,
    MERGE,
    CHECKOUT,
    REVERT,
} from './types';

describe('createReducer()', () => {
    let reducer;
    let registry;
    let repositories;

    beforeEach(() => {
        registry = createRegistry();
        repositories = {
            first: {
                head: '000',
                checkout: expect.createSpy(),
                commit: expect.createSpy(),
                merge: expect.createSpy(),
                revert: expect.createSpy(),
            },
            second: {
                head: '111',
                checkout: expect.createSpy(),
                commit: expect.createSpy(),
                merge: expect.createSpy(),
                revert: expect.createSpy(),
            },
        };

        registry.register('first', repositories.first);
        registry.register('second', repositories.second);

        reducer = createReducer(registry);
    });

    it('should init the state if not defined yet', () => {
        expect(reducer(undefined, {})).toEqual({
            heads: {
                first: '000',
                second: '111',
            },
        });
    });

    it(`should perform a checkout on the wanted repository when ${CHECKOUT} action is received`, () => {
        repositories.first.head = '010';

        const nextState = reducer(undefined, checkout('first', 'dev'));

        expect(nextState).toEqual({
            heads: {
                first: '010',
                second: '111',
            },
        });
        expect(repositories.first.checkout).toHaveBeenCalledWith('dev', false);
        expect(repositories.second.checkout).toNotHaveBeenCalled();
    });

    it(`should perform a checkout on the wanted repository when ${CHECKOUT} action is received with shouldCreateBranch to true`, () => {
        repositories.first.head = '010';

        const nextState = reducer(undefined, checkout('first', 'dev', true));

        expect(nextState).toEqual({
            heads: {
                first: '010',
                second: '111',
            },
        });
        expect(repositories.first.checkout).toHaveBeenCalledWith('dev', true);
        expect(repositories.second.checkout).toNotHaveBeenCalled();
    });

    it(`should perform a commit on the wanted repository when ${COMMIT} action is received`, () => {
        repositories.second.head = '110';

        const nextState = reducer(undefined, commit('second', 'robin', 'first commit', { foo: 'bar' }));

        expect(nextState).toEqual({
            heads: {
                first: '000',
                second: '110',
            },
        });
        expect(repositories.first.commit).toNotHaveBeenCalled();
        expect(repositories.second.commit).toHaveBeenCalledWith('robin', 'first commit', { foo: 'bar' });
    });

    it(`should perform a merge on the wanted repository when ${MERGE} action is received`, () => {
        repositories.first.head = '010'; // we update first head too to check the reducer recompile all the heads
        repositories.second.head = '110';

        const nextState = reducer(undefined, merge('second', 'robin', 'dev'));

        expect(nextState).toEqual({
            heads: {
                first: '010',
                second: '110',
            },
        });
        expect(repositories.first.merge).toNotHaveBeenCalled();
        expect(repositories.second.merge).toHaveBeenCalledWith('robin', 'dev');
    });

    it(`should perform a merge on the wanted repository when ${MERGE} action is received with a resolver`, () => {
        repositories.first.head = '010'; // we update first head too to check the reducer recompile all the heads
        repositories.second.head = '110';

        const nextState = reducer(undefined, merge('second', 'robin', 'dev', 'i am a resolver'));

        expect(nextState).toEqual({
            heads: {
                first: '010',
                second: '110',
            },
        });
        expect(repositories.first.merge).toNotHaveBeenCalled();
        expect(repositories.second.merge).toHaveBeenCalledWith('robin', 'dev', 'i am a resolver');
    });

    it(`should perform a revert on the wanted repository when ${REVERT} action is received`, () => {
        repositories.first.head = '010';

        const nextState = reducer(undefined, revert('second', 'robin', 'a3e'));

        expect(nextState).toEqual({
            heads: {
                first: '010',
                second: '111',
            },
        });
        expect(repositories.first.revert).toNotHaveBeenCalled();
        expect(repositories.second.revert).toHaveBeenCalledWith('robin', 'a3e');
    });

    it(`should perform a revert on the wanted repository when ${REVERT} action is received with a resolver`, () => {
        repositories.first.head = '010';

        const nextState = reducer(undefined, revert('second', 'robin', 'a3e', 'i am a resolver'));

        expect(nextState).toEqual({
            heads: {
                first: '010',
                second: '111',
            },
        });
        expect(repositories.first.revert).toNotHaveBeenCalled();
        expect(repositories.second.revert).toHaveBeenCalledWith('robin', 'a3e', 'i am a resolver');
    });

    it("should throw an error if the repository doesn't exist", () => {
        expect(() => reducer(undefined, revert('unknown', 'robin', 'a3e'))).toThrow(/Repository unknown not found/);
    });
});

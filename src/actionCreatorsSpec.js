import expect from 'expect';
import {
    checkout,
    commit,
    merge,
    revert,
} from './actionCreators';
import {
    CHECKOUT,
    COMMIT,
    MERGE,
    REVERT,
} from './types';

describe('Action creators', () => {
    it(`should return a ${CHECKOUT} action when checkout() is called`, () => {
        expect(checkout('mygit', 'dev')).toEqual({
            payload: {
                repositoryName: 'mygit',
                shouldCreateBranch: false,
                targetBranch: 'dev',
            },
            type: CHECKOUT,
        });

        expect(checkout('mygit', 'dev', true)).toEqual({
            payload: {
                repositoryName: 'mygit',
                shouldCreateBranch: true,
                targetBranch: 'dev',
            },
            type: CHECKOUT,
        });
    });

    it(`should return a ${COMMIT} action when commit() is called`, () => {
        expect(commit('mygit', 'robin', 'first commit', { foo: 'bar' })).toEqual({
            payload: {
                author: 'robin',
                message: 'first commit',
                repositoryName: 'mygit',
                tree: {
                    foo: 'bar',
                },
            },
            type: COMMIT,
        });
    });

    it(`should return a ${MERGE} action when merge() is called`, () => {
        expect(merge('mygit', 'robin', 'dev')).toEqual({
            payload: {
                author: 'robin',
                targetBranch: 'dev',
                repositoryName: 'mygit',
            },
            type: MERGE,
        });
    });

    it(`should return a ${MERGE} action when merge() is called with a resolver`, () => {
        expect(merge('mygit', 'robin', 'dev', 'i am a resolver')).toEqual({
            payload: {
                author: 'robin',
                repositoryName: 'mygit',
                resolver: 'i am a resolver',
                targetBranch: 'dev',
            },
            type: MERGE,
        });
    });

    it(`should return a ${REVERT} action when revert() is called`, () => {
        expect(revert('mygit', 'robin', 'a3e')).toEqual({
            payload: {
                author: 'robin',
                repositoryName: 'mygit',
                targetCommitHash: 'a3e',
            },
            type: REVERT,
        });
    });

    it(`should return a ${REVERT} action when revert() is called with a resolver`, () => {
        expect(revert('mygit', 'robin', 'a3e', 'i am a resolver')).toEqual({
            payload: {
                author: 'robin',
                repositoryName: 'mygit',
                resolver: 'i am a resolver',
                targetCommitHash: 'a3e',
            },
            type: REVERT,
        });
    });
});

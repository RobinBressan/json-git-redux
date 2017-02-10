import expect from 'expect';
import createMiddleware from './createMiddleware';
import {
    checkout,
    commit,
    merge,
    revert,
} from './actionCreators';
import {
    CHECKOUT_FAILED,
    CHECKOUT_SUCCEEDED,
    COMMIT_FAILED,
    COMMIT_SUCCEEDED,
    MERGE_FAILED,
    MERGE_SUCCEEDED,
    REVERT_FAILED,
    REVERT_SUCCEEDED,
} from './types';


describe('createMiddleware()', () => {
    let middleware;
    let next;
    let store;

    beforeEach(() => {
        next = expect.createSpy();
        store = {
            dispatch: expect.createSpy(),
        };

        middleware = createMiddleware()(store)(next);
    });

    it('should call next with the action whatever the action type is', () => {
        middleware({
            payload: {
                hello: 'world',
            },
            type: 'foo',
        });

        expect(next).toHaveBeenCalledWith({
            payload: {
                hello: 'world',
            },
            type: 'foo',
        });
        expect(next.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${CHECKOUT_SUCCEEDED} if checkout didn't triggered any error`, () => {
        const action = checkout('mygit', 'dev');

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            ...action,
            type: CHECKOUT_SUCCEEDED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${CHECKOUT_FAILED} if checkout triggered an error`, () => {
        const error = new Error('Oops');
        next.andThrow(error);

        const action = checkout('mygit', 'dev');

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            payload: {
                ...action.payload,
                error,
            },
            type: CHECKOUT_FAILED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${COMMIT_SUCCEEDED} if commit didn't triggered any error`, () => {
        const action = commit('mygit', 'robin', 'first commit', { foo: 'bar' });

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            ...action,
            type: COMMIT_SUCCEEDED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${COMMIT_FAILED} if commit triggered an error`, () => {
        const error = new Error('Oops');
        next.andThrow(error);

        const action = commit('mygit', 'robin', 'first commit', { foo: 'bar' });

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            payload: {
                ...action.payload,
                error,
            },
            type: COMMIT_FAILED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${MERGE_SUCCEEDED} if merge didn't triggered any error`, () => {
        const action = merge('mygit', 'robin', 'dev');

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            ...action,
            type: MERGE_SUCCEEDED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${MERGE_FAILED} if merge triggered an error`, () => {
        const error = new Error('Oops');
        next.andThrow(error);

        const action = merge('mygit', 'robin', 'dev');

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            payload: {
                ...action.payload,
                error,
            },
            type: MERGE_FAILED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${REVERT_SUCCEEDED} if revert didn't triggered any error`, () => {
        const action = revert('mygit', 'robin', 'a3e');

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            ...action,
            type: REVERT_SUCCEEDED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });

    it(`should call next with the action and then dispatch a ${REVERT_FAILED} if revert triggered an error`, () => {
        const error = new Error('Oops');
        next.andThrow(error);

        const action = revert('mygit', 'robin', 'a3e');

        middleware(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            payload: {
                ...action.payload,
                error,
            },
            type: REVERT_FAILED,
        });
        expect(next.calls.length).toBe(1);
        expect(store.dispatch.calls.length).toBe(1);
    });
});

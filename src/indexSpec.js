import expect from 'expect';
import * as index from './index';

describe('Entrypoint', () => {
    it('should export the lib', () => {
        expect(index).toIncludeKey(
            'apply',
            'CHECKOUT_FAILED',
            'CHECKOUT_SUCCEEDED',
            'checkout',
            'CHECKOUT',
            'COMMIT_FAILED',
            'COMMIT_SUCCEEDED',
            'commit',
            'COMMIT',
            'createMiddleware',
            'createReducer',
            'diff',
            'getLog',
            'getTree',
            'MERGE_FAILED',
            'MERGE_SUCCEEDED',
            'merge',
            'MERGE',
            'REVERT_FAILED',
            'REVERT_SUCCEEDED',
            'revert',
            'REVERT',
            'toJSON',
        );
    });
});

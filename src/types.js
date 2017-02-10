function type(name) {
    return `@@jsonGit/${name}`;
}

export function succeeded(targetType) {
    return `${targetType}/succeeded`;
}

export function failed(targetType) {
    return `${targetType}/failed`;
}

export const CHECKOUT = type('CHECKOUT');
export const CHECKOUT_FAILED = failed(CHECKOUT);
export const CHECKOUT_SUCCEEDED = succeeded(CHECKOUT);

export const COMMIT = type('COMMIT');
export const COMMIT_FAILED = failed(COMMIT);
export const COMMIT_SUCCEEDED = succeeded(COMMIT);

export const MERGE = type('MERGE');
export const MERGE_FAILED = failed(MERGE);
export const MERGE_SUCCEEDED = succeeded(MERGE);

export const REVERT = type('REVERT');
export const REVERT_FAILED = failed(REVERT);
export const REVERT_SUCCEEDED = succeeded(REVERT);

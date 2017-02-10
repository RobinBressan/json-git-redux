# json-git-redux [![Build Status](https://travis-ci.org/RobinBressan/json-git-redux.svg?branch=master)](https://travis-ci.org/RobinBressan/json-git-redux)

Official [json-git](https://github.com/RobinBressan/json-git) bindings for Redux.

## Installation

It is avaible through npm:

```sh
npm install json-git-redux
```

## Usage

### Setup

First, you must registered the *reducer* with your repositories and the *middleware*:

```js
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux'
import createRepository from 'json-git'
import {
    createMiddleware as createJsonGitMiddleware,
    createReducer as createJsonGitReducer,
} from 'json-git-redux';

import reducers from '<project-path>/reducers'

// Instanciate all your repositories here
// You can use any name you like as key
const repositories = {
    myRepository: createRepository(),
};

// Add the reducer to your store on the `jsonGit` key
// Then add the middleware
const store = createStore(
    combineReducers({
        ...reducers,
        jsonGit: createJsonGitReducer(repositories),
    }),
    applyMiddleware(createJsonGitMiddleware()),
);
```

The *middleware* is responsible for dispatching succeeded/failed actions about write actions.

### Write operations with action creators

**json-git-redux** provides 4 action creators to perform write operations on your repositories:

* `checkout(repositoryName, branch [, create=false])` creates and/or changes the current branch on a repository
* `commit(repositoryName, author, message, tree)` creates a new commit on the current branch of a repository
* `merge(repositoryName, author, branch [, resolver])` merges a branch into the current branch on a repository
* `revert(repositoryName, author, commitHash, [, resolver])` reverts the changes introduced by a commit on a repository

To use them, just import them from `json-git-redux`:

```js
import React, {
    Component,
    PropTypes,
} from 'react';
import { connect } from 'react-redux';
import {
    checkout,
    commit,
    merge,
    revert,
} from 'json-git-redux';

class Foo extends Component {
    constructor(props, context) {
        super(props, context);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { commit } = this.props;

        commit('myRepository', 'robin', 'first commit', {
            foo: 'bar',
        });
    }

    render() {
        return (
            <button onClick={this.onClick}>Commit</button>
        );
    }
}

Foo.propTypes = {
    checkout: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    merge: PropTypes.func.isRequired,
    revert: PropTypes.func.isRequired,
};

export default connect(state => (
    head: state.jsonGit.heads.myRepository,
), {
    checkout,
    commit,
    merge,
    revert,
})(Foo);
```

Note that **you must subscribe your component to the head of your repository** if you want it to be refreshed at each change (`head: state.jsonGit.heads.myRepository`).

### Read operations with selectors

**json-git-redux** provides 4 selectors to perform read operations on your repositories:

* `apply(repositoryName, patch [, resolver])` applies a patch to the current tree of a repository and returns the result
* `getDiff(repositoryName, left, right)` generates a JSON Patch between two branches or commits in a repository
* `getJSON(repositoryName)` exports a snapshot of a repository
* `getLog(repositoryName)` returns the full history of a repository
* `getTree(repositoryName)` returns the current tree of a repository

To use them, just import them from `json-git-redux`:

```js
import React, {
    Component,
    PropTypes,
} from 'react';
import { connect } from 'react-redux';
import {
    apply,
    getDiff,
    getJSON,
    getLog,
    getTree,
} from 'json-git-redux';

class Foo extends Component {
    render() {
        const tree = getTree('myRepository');

        return (
            <pre>{tree}</pre>
        );
    }
}

Foo.propTypes = {};

export default Foo;
```

### Action types

| Type | Description |
| --- | --- |
| `CHECKOUT_FAILED` | When a checkout failed |
| `CHECKOUT_SUCCEEDED` | When a checkout succeed |
| `CHECKOUT` | When a checkout is performed |
| `COMMIT_FAILED` | When a commit failed |
| `COMMIT_SUCCEEDED` | When a commit succeed |
| `COMMIT` | When a commit is performed |
| `MERGE_FAILED` | When a merge failed |
| `MERGE_SUCCEEDED` | When a merge succeed |
| `MERGE` | When a merge is performed |
| `REVERT_FAILED` | When a revert failed |
| `REVERT_SUCCEEDED` | When a revert succeed |
| `REVERT` | When a revert is performed |

## Development

Install dependencies with [yarn](https://yarnpkg.com/). You're then good to go.

To run the tests, just do `npm test`.

## Contribute

All contributions are welcome and must pass the tests. If you add a new feature, please write tests for it.

## License

This application is available under the MIT License.

// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import * as TestUtils from 'react-dom/test-utils';
import { Todo, mapStateToProps } from '../src/app/containers/Todo';
import { RootState } from '../src/app/reducers';

let rootState: RootState;

beforeEach(() => {
  rootState = {
    todos: [
      {
        id: 1,
        text: 'Use Redux',
        completed: false,
      },
    ],
  };
});

describe('Todo container', () => {
  describe('the container element', () => {
    describe('mapStateToProps', () => {
      it('should map the state to props correctly', () => {
        const componentProps = {} as Todo.Props;
        const componentState = mapStateToProps(rootState, componentProps);

        expect(componentState.todos).toEqual(rootState.todos);
      });
    });
  });
});

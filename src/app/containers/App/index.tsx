import * as React from 'react';
import * as style from './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, Route } from 'react-router';
import { TodoActions } from '../../actions';
import { omit } from '../../utils';
import { Header } from '../../components';
import { Todo } from '../Todo';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    actions: TodoActions;
  }
}

@connect(
  null,
  mapDispatchToProps,
)
export class App extends React.Component<App.Props> {
  render() {
    const { actions } = this.props;

    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <Route path="/" component={Todo} />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
  };
}

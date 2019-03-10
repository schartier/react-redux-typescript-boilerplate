import * as React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { TodoActions } from '../../actions';
import { RootState } from '../../reducers';
import { TodoModel } from '../../models';
import { omit } from '../../utils';
import { TodoList, Footer } from '../../components';

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  key => TodoModel.Filter[key],
);

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: todo => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: todo => todo.completed,
};

export namespace Todo {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    actions: TodoActions;
    filter: TodoModel.Filter;
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export class Todo extends React.Component<Todo.Props> {
  static defaultProps: Partial<Todo.Props> = {
    filter: TodoModel.Filter.SHOW_ALL,
  };

  constructor(props: Todo.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some(todo => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted();
    }
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {
    const { todos, actions, filter } = this.props;
    const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
    const activeCount = todos.length - todos.filter(todo => todo.completed).length;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    return (
      <div>
        <TodoList todos={filteredTodos} actions={actions} />;
        <Footer
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClickClearCompleted={this.handleClearCompleted}
          onClickFilter={this.handleFilterChange}
        />
      </div>
    );
  }
}

export function mapStateToProps(state: RootState, props: Todo.Props) {
  const hash = props.location && props.location.hash.replace('#', '');
  const filter = FILTER_VALUES.find(value => value === hash) || TodoModel.Filter.SHOW_ALL;

  return { todos: state.todos, filter };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
  };
}

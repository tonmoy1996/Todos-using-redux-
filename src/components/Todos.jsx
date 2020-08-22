import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getTodos,
  deleteTodo,
  updateTodo,
  eleminateCompletedTodo,
} from '../actions/todoActions';
import AddTodo from './AddTodo';
class Todos extends Component {
  state = {
    todoList: [],
    setCurrentID: '',
    todo: {},
    show: false,
  };

  componentWillReceiveProps(nextProps) {
    const list = window.localStorage.getItem('todoList');
    const parsedList = JSON.parse(list);
    this.setState({
      todoList: parsedList,
    });
  }
  componentDidMount() {
    this.props.getTodos();
    const list = window.localStorage.getItem('todoList');
    const parsedList = JSON.parse(list);
    this.setState({
      todoList: parsedList,
    });
  }

  onDelete = (id) => {
    this.setState({
      todoList: this.state.todoList.filter((todo) => todo.id !== id),
    });
    this.props.deleteTodo(id);
  };
  onUpdate = (todo) => {
    this.setState({
      todo,
    });
  };

  addToHandler = (todo) => {
    this.setState({
      todoList: [...this.state.todoList, todo],
    });
  };
  completeToggle = (todo) => {
    todo.isCompleted = true;
    this.setState({
      todoList: [...this.state.todoList, todo],
    });
    this.props.updateTodo(todo);
  };
  getComplete = () => {
    const list = window.localStorage.getItem('todoList');
    const parsedList = JSON.parse(list);
    const newlist = parsedList.filter((todo) => todo.isCompleted === true);
    this.setState({
      todoList: newlist,
    });
  };
  getActive = () => {
    const list = window.localStorage.getItem('todoList');
    const parsedList = JSON.parse(list);
    const newlist = parsedList.filter((todo) => todo.isCompleted === false);
    this.setState({
      todoList: newlist,
    });
  };
  getAll = () => {
    const list = window.localStorage.getItem('todoList');
    const parsedList = JSON.parse(list);
    this.setState({
      todoList: parsedList,
    });
  };
  removeComplete = () => {
    console.log(123);
    this.props.eleminateCompletedTodo();
  };
  mouseEnter = () => {
    this.setState({
      show: true,
    });
  };
  mouseOut = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    const todoList = this.state.todoList ? this.state.todoList : [];
    const count = todoList.length;
    return (
      <div className='container mt-5'>
        <AddTodo addToHandler={this.addToHandler} todo={this.state.todo} />
        <div className='row'>
          <div className='col-md-10'>
            <div className='card'>
              <div className='card-header text-center'>Todos</div>
              <ul className='list-group list-group-flush'>
                {todoList.map((todo) => {
                  return (
                    <li key={todo.id} className='list-group-item'>
                      <i
                        onClick={() => this.completeToggle(todo)}
                        className={
                          todo.isCompleted
                            ? 'fa fa-check-circle float-left '
                            : 'fa fa-check-circle-o float-left'
                        }
                        style={{
                          fontSize: '2rem',
                        }}
                      ></i>
                      <span
                        style={{
                          ...(todo.isCompleted
                            ? {
                                textDecorationLine: 'line-through',
                                opacity: '50%',
                              }
                            : ''),
                        }}
                      >
                        {todo.title}
                      </span>
                      <i
                        onClick={() => this.onDelete(todo.id)}
                        className='fa fa-remove float-right btn btn-warning'
                      ></i>
                      <i
                        onClick={() => this.onUpdate(todo)}
                        className='fa fa-pencil mr-3 float-right btn btn-primary'
                      ></i>
                    </li>
                  );
                })}
              </ul>

              <div
                className='d-flex justify-content-around mt-3'
                onMouseEnter={() => this.mouseEnter()}
                onMouseLeave={() => this.mouseOut()}
              >
                <span>{count} items left</span>
                <div className='mr-2'>
                  <a
                    href='!#'
                    className='btn btn-primary mr-2'
                    onClick={() => this.getAll()}
                  >
                    All
                  </a>
                  <a
                    href='!#'
                    className='btn btn-info mr-2'
                    onClick={() => this.getActive()}
                  >
                    Active
                  </a>
                  <a
                    href='!#'
                    className='btn btn-warning mr-2'
                    onClick={() => this.getComplete()}
                  >
                    Completed
                  </a>
                  {this.state.show ? (
                    <a
                      href='!#'
                      className='btn btn-danger mr-2 float-right'
                      onClick={() => this.removeComplete()}
                    >
                      Clear completed
                    </a>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});
export default connect(mapStateToProps, {
  getTodos,
  deleteTodo,
  updateTodo,
  eleminateCompletedTodo,
})(Todos);

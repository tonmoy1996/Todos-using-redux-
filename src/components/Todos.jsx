import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, deleteTodo } from '../actions/todoActions';
import AddTodo from './AddTodo';
class Todos extends Component {
  state = {
    todoList: [],
    setCurrentID: '',
    todo: {},
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
  render() {
    const todoList = this.state.todoList ? this.state.todoList : [];
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
                      {todo.title}
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
export default connect(mapStateToProps, { getTodos, deleteTodo })(Todos);

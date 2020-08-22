import React, { Component } from 'react';
import InputGroup from './Common/InputGroup';
import { connect } from 'react-redux';
import { getTodos, addTodo, updateTodo } from '../actions/todoActions';
import { v4 as uuidv4 } from 'uuid';
class AddTodo extends Component {
  state = {
    title: '',
    currentId: '',
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.todo.title ? nextProps.todo.title : '',
      currentId: nextProps.todo.id,
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.currentId) {
      const todo = {
        id: this.state.currentId,
        title: this.state.title,
        isCompleted: false,
      };
      this.setState({
        title: '',
        currentId: '',
      });
      this.props.todo.title = '';
      this.props.todo.id = '';
      this.props.updateTodo(todo);
    } else {
      const id = uuidv4();
      const todo = {
        id: id,
        title: this.state.title,
        isCompleted: false,
      };
      this.props.addToHandler(todo);
      this.props.addTodo(todo);

      this.setState({
        title: '',
      });
    }
  };
  render() {
    return (
      <div className='conatiner'>
        <div className='row'>
          <div className='col-md-10'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <InputGroup
                  name='title'
                  value={this.state.title}
                  placeholder='add todo'
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-info btn-block'>
                  {this.state.currentId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});
export default connect(mapStateToProps, { getTodos, addTodo, updateTodo })(
  AddTodo
);

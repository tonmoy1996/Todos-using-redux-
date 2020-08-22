import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  Active_TODO,
} from '../actions/types';

export const getTodos = () => (dispatch) => {
  const list = window.localStorage.getItem('todoList');
  let parsedList = JSON.parse(list);
  if (parsedList == null) {
    parsedList = [];
    window.localStorage.setItem('todoList', JSON.stringify(parsedList));
  }
  dispatch({
    type: GET_TODOS,
    payload: parsedList,
  });
};

export const addTodo = (todo) => (dispatch) => {
  const list = window.localStorage.getItem('todoList');
  const parsedList = JSON.parse(list);
  parsedList.push(todo);
  window.localStorage.setItem('todoList', JSON.stringify(parsedList));
  dispatch({
    type: ADD_TODO,
    payload: todo,
  });
};

export const deleteTodo = (id) => (dispatch) => {
  const list = window.localStorage.getItem('todoList');
  const parsedList = JSON.parse(list);
  const newList = parsedList.filter((todo) => todo.id !== id);
  window.localStorage.setItem('todoList', JSON.stringify(newList));

  dispatch({
    type: DELETE_TODO,
    payload: id,
  });
};

export const updateTodo = (todo) => (dispatch) => {
  const list = window.localStorage.getItem('todoList');
  const parsedList = JSON.parse(list);
  const newList = parsedList.map((item) =>
    item.id === todo.id ? (item = todo) : item
  );
  window.localStorage.setItem('todoList', JSON.stringify(newList));
  dispatch({
    type: UPDATE_TODO,
    payload: todo,
  });
};

export const eleminateCompletedTodo = () => (dispatch) => {
  const list = window.localStorage.getItem('todoList');
  let newlist = JSON.parse(list).filter((todo) => todo.isCompleted === false);
  if (newlist == null) {
    newlist = [];
    window.localStorage.setItem('todoList', JSON.stringify(newlist));
  }
  window.localStorage.setItem('todoList', JSON.stringify(newlist));
  dispatch({
    type: Active_TODO,
    payload: newlist,
  });
};

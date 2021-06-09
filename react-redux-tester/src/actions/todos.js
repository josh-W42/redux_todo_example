import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = todo => {
  return {
    type: ADD_TODO,
    todo,
  }
}

const removeTodo = id => {
  return {
    type: REMOVE_TODO,
    id,
  }
}

const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

export const handleDeleteTodo = todo => {
  return dispatch => {
    // Implementing optimistic updates
    dispatch(removeTodo(todo.id));

    return API.deleteTodo(todo.id)
      .catch((error) => {
        dispatch(addTodo(todo));
        alert("Could Not Delete Todo");
      });
  }
}

export const handleAddTodo = (name, callback) => {
  return dispatch => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodo(todo));
        callback();              
      }).catch(() => {
        alert("Could Not Add Todo");
      })
  }
}

export const handleToggleTodo = (id) => {
  return dispatch => {
    // Implementing optimistic updating
    dispatch(toggleTodo(id));

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodo(id));
        alert("Could Not Toggle Todo");
      });
  }
}
/*
  We'll being looking on how to manage state in react as
  a precursor to looking at redux.

  Redux itself is a predictable state container for js apps.

  The end goal of this example app is a "todo list" type app.

  The Rules of Redux:
  1. Only an event can change the state of the store.
  2. The function that returns the new state needs to be a pure function.

  Aside: Pure functions,
    1. Always return the same result if the same arguments are passed in.
    2. Depends solely on the arguments given.
    3. Does not produce side effects. (API requests, I/O operations).

    simple example:

    const square = x => x * x;

    simple anti-example:
    const tipPercent = 0.15;
    const calculateTip = cost => cost * tipPercent;
    ^ This is not a pure function because it relies on external data.

    Here is a counter-example that fixes the above function
    const calculateTip = (cost, tipPercent = 0.15) => cost * tipPercent;
*/


// Library Code

/**
 * This is a factory function that creates the store (An abstract data type?).
 * 
 * @returns Object of available actions.
 */
const createStore = (reducer) => {
  /*
  Conceptually, the store allows you to:
  1. Store the state tree. ie. state variable
  2. Get the state for use. ie. getState
  3. Listen to the changes of the state. ie. subscribe
  4. Update the state. ie. dispatch
  */
 
 let state;
 const listeners = [];
 
 const getState = () => state;
 
 const subscribe = newListener => {
   listeners.push(newListener);
   // To Unsubscribe,
   return () => {
     listeners.filter((listener) => listener !== newListener);
    }
  }
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
  
  return {
    getState,
    subscribe,
    dispatch
  }
}


// App Code

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// action creators
const addTodoAction = todo => {
  return {
    type: ADD_TODO,
    todo,
  }
}

const removeTodoAction = id => {
  return {
    type: REMOVE_TODO,
    id,
  }
}

const toggleTodoAction = id => {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

const addGoalAction = goal => {
  return {
    type: ADD_GOAL,
    goal,
  }
}

const removeGoalAction = id => {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

/**
 * This is a reducer, it allows us act on the
 * state and modify it while following the
 * rules of redux.
 * 
 * By convention this is a pure function.
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);

    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, { complete: !todo.complete })
      );

    default:
      return state;
  }
}

/**
 * A reducer function for managing actions the state
 * related to goals
 * @param {*} state 
 * @param {*} action 
 * @returns the state
 */
const goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);

    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
  
    default:
      return state;
  }
}

/**
 * The root reducer function that routes
 * actions to their respective reducers.
 * @param {Object} state 
 * @param {Object} action 
 * @returns Object of all reducers
 */
const app = (state = {}, action) => {
  return  {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app);

store.subscribe(() => {
  console.log('The state is now:', store.getState());
});
const unsubscribe = store.subscribe(() => {
  console.log('The store has changed');
});

store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false,
}));

store.dispatch(addTodoAction({
  id: 1,
  name: 'Walk the dog',
  complete: true,
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn React Native',
}));

store.dispatch(addGoalAction({
  id: 1,
  name: 'Train for a marathon',
}));

store.dispatch(addGoalAction({
  id: 2,
  name: 'Whoops',
}));

store.dispatch(removeGoalAction(2));
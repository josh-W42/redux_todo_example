/*
  We'll being looking on how to manage state in react as
  a precursor to looking at redux.

  Redux itself is a predictable state container for js apps.

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

/**
 * This is a factory function that creates the store (An abstract data type?).
 * @returns 
 */
const createStore = () => {
  /*
    Conceptually, the store allows you to:
    1. Store the state tree.
    2. Get the state for use.
    3. Listen to the changes of the state.
    4. Update the state.
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

  return {
    getState,
    subscribe
  }
}

const store = createStore();

// A proposed method to allow users to
// listen to the changes of the state.
store.subscribe(() => {
  console.log(`The state is now: ${store.getState()}`);
});
const unsubscribe = store.subscribe(() => {
  console.log('The store has changed');
});
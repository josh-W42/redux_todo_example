/*
  We'll being looking on how to manage state in react as
  a precursor to looking a redux.
*/

/**
 * This is a factory function that creates the store (An abstract data type?).
 * @returns 
 */
const createStore = () => {
  /*
    Conceptually, the store allows you to:
    1. Store the state.
    2. Get the state for use.
    3. Listen to the changes of the state.
    4. Update the state.
  */

  let state;

  const getState = () => state;

  return getState;
}
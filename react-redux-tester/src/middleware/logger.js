const logger = store => next => action => {
  // this groups all log statements together
  console.group(action.type);
    console.log('The action:', action);
    const result = next(action);
    console.log('The new state:', store.getState());
  console.groupEnd();
  return result;
}

export default logger;
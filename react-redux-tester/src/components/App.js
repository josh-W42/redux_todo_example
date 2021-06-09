import React from 'react';
import ConnectedTodos from './todos';
import ConnectedGoals from './goals';
import { connect } from 'react-redux';
import {
  handleInitialData,
} from '../actions/shared';

class App extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props;

    dispatch(handleInitialData());
  }


  render() {

    if (this.props.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <ConnectedGoals />
        <ConnectedTodos />
      </div>
    )
  }
}

export default connect((state) => ({
  loading: state.loading,
}))(App);

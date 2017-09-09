import React, { Component } from 'react';

// redux
import { createStore } from 'redux';
import gaymerBearsApp from './Reducers/Reducers';
import {
  addGaymer,
  getAllGames,
  getLiveGames,
  getGaymersForGame,
  setSelectedGame,
  setGameFilter
} from './Actions/Actions';

import './App.css';

class App extends Component {

  render() {

    let store = createStore(gaymerBearsApp);
    // Log the initial state
    console.log('store',store.getState());

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    let unsubscribe = store.subscribe(() =>
      console.log('unsubscribe',store.getState())
    );

    store.dispatch(addGaymer('mockGaymerId', 'Twitch'));
    store.dispatch(getAllGames());
    store.dispatch(getLiveGames());

    unsubscribe();

    return (
      <div className="App">

        <header className="App-header">
          <h2>Welcome to React</h2>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

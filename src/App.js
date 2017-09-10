import React, { Component } from 'react';
import './App.css';

/*
 * Views
 */
import AppHeader from './Views/AppHeader';
import AddGaymerForm from './Views/AddGaymerForm';
import GamesList from './Views/GamesList';

/*
 * Redux
 */
import { createStore } from 'redux';
import {
  addGaymer,
  getAllGames,
  getLiveGames,
  getGaymersForGame,
  setSelectedGame,
  setGameFilter
} from './Actions/Actions';
import GaymerBearsAppReducer from './Reducers/Reducers';


class App extends Component {

  render() {

    let store = createStore(GaymerBearsAppReducer);
    // Log the initial state
    console.log('store',store.getState());

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    let unsubscribe = store.subscribe(() =>
      console.log('unsubscribe',store.getState())
    );
    //
    // store.dispatch(addGaymer('mockGaymerId', 'Twitch'));
    // store.dispatch(getAllGames());
    // store.dispatch(getLiveGames());

    // unsubscribe();

    return (
      <div className="App">

        <AppHeader></AppHeader>

        <AddGaymerForm/>

        <GamesList/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

/*
 * Views
 */
import AppHeader from './Views/AppHeader';
import AddGaymerForm from './Views/AddGaymerForm';
import GamesList from './Views/GamesList';
import Gaymers from './Views/Gaymers';

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

/*
 * Utils
 */
import DebugLog from './Utils/DebugLog';
import FirebaseUtil from './Utils/InitializeFirebase';

class App extends Component {
  constructor(){
    super();
    this.onAddGaymerFormSubmit = this.onAddGaymerFormSubmit.bind(this);
  }

  componentDidMount(){

    FirebaseUtil.init();

    // FirebaseUtil.getFirebase().database().ref('fakeData').once('value').then((snap) => {
    //   DebugLog('snap', snap);
    // });

    this.store = createStore(GaymerBearsAppReducer);
    // Log the initial state
    console.log('store',this.store.getState());

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    this.unsubscribe = this.store.subscribe(() =>
      //FIXME: remove this on

      DebugLog('unsubscribe', this.store.getState())
    );
    //
    // store.dispatch(addGaymer('mockGaymerId', 'Twitch'));
    // store.dispatch(getAllGames());
    // store.dispatch(getLiveGames());

    // unsubscribe();
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  onAddGaymerFormSubmit(formData){
    DebugLog('onAddGaymerFormSubmit',formData);

    this.store.dispatch(addGaymer(formData.gaymerId, formData.streamPlatform || 'Twitch'));
  }

  render() {


    return (
      <div className="App">

        <AppHeader></AppHeader>

        <AddGaymerForm onAddGaymerFormSubmit={this.onAddGaymerFormSubmit}/>

        <GamesList/>

        <Gaymers/>
      </div>
    );
  }
}

export default App;

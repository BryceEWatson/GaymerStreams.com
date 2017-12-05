import React from 'react';
import './App.css';

/*
 * Views
 */
import AppHeader from './Components/AppHeader';
import GamesListContainer from './Components/Containers/GamesListContainer';
import LiveStreamsContainer from './Components/Containers/LiveStreamsContainer';
import GaymersContainer from './Components/Containers/GaymersContainer';
import AppFooter from './Components/AppFooter';


const App = () => (
  <div className="App">

    <AppHeader></AppHeader>

    <GamesListContainer/>

    <LiveStreamsContainer/>

    <GaymersContainer/>

    <AppFooter/>
  </div>
)

export default App;

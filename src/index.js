import React from 'react';
import ReactDOM from 'react-dom';

// REDUX
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import GaymerBearsAppReducer from './Reducers/Reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { fetchGaymers } from './Actions/Actions';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import FirebaseUtil from './Utils/InitializeFirebase';

let store = createStore(
  GaymerBearsAppReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    createLogger() // neat middleware that logs actions
  )
);

// .then(()=> store.dispatch(fetchTwitchLiveStreams());

FirebaseUtil.init();

store.dispatch(fetchGaymers());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

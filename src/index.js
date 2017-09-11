import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import GaymerBearsAppReducer from './Reducers/Reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import FirebaseUtil from './Utils/InitializeFirebase';

let store = createStore(
  GaymerBearsAppReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    createLogger() // neat middleware that logs actions
  )
);

FirebaseUtil.init();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

import fetch from 'isomorphic-fetch'
import { combineReducers } from 'redux';

import {
  ADD_GAYMER_REQUEST,
  ADD_GAYMER_FAILURE,
  ADD_GAYMER_SUCCESS,
  GET_ALL_GAMES,
  GET_LIVE_GAMES,
  GET_GAYMERS_FOR_GAME,
  SET_SELECTED_GAME,
  SET_GAME_FILTER,
  GameFilters } from '../Actions/Actions';

/*
 * define initial state
 */
const initialState = {
  gaymersForSelectedGame: [],
  selectedGame: 'Overwatch',
  allGamesList: [],
  liveGamesList: [],
  gameFilter: GameFilters.SORT_BY_MOST_VIEWERS
}

/*
 * reduces gaymersForSelectedGame
 */
export function addGaymer(state = '', action){
  console.log('addGaymer GOT HERE');
  // TODO: Implement
  // For now, don't handle any actions and just return the state given to us.

  //translate userName to Id
  var twitchName = action.gaymerId;

  fetch(`https://api.twitch.tv/kraken/users?login=${twitchName}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '4ab0ef4dut3ngrm4ercp9ue54k58d5'
      }
    })
    .then(
      response => response.json(),
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing an loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => console.log('An error occured.', error)
    )
    .then(json =>
      // We can dispatch many times!
      // Here, we update the app state with the results of the API call.

      console.log('RESPONSE', json)
      // dispatch(receivePosts(subreddit, json))
    );
  return state;
}


/*
 * reduces gaymersForSelectedGame
 */
export function gaymersForSelectedGame(state = [], action){
  // TODO: Implement
  // For now, don't handle any actions and just return the state given to us.
  return state;
}

/*
 * reduces selectedGame
 */
export function selectedGame(state = 'Overwatch', action){
  // console.log('selectedGame reducer state:', state);
  // console.log('selectedGame reducer action:', action);
  // TODO: Implement
  // For now, don't handle any actions and just return the state given to us.
  return state;
}

/*
 * reduces allGamesList
 */
export function allGamesList(state = [], action){
  // console.log('allGamesList reducer state:', state);
  // console.log('allGamesList reducer action:', action);

  switch (action.type){
    case GET_ALL_GAMES:
      return ['game1', 'game2']; //FIXME: MOCK, call API
    default:
      return state;
  }
}

/*
 * reduces liveGamesList
 */
export function liveGamesList(state = [], action){
  switch (action.type){
    case GET_LIVE_GAMES:
      return ['liveGame1', 'liveGame2']; //FIXME: MOCK
    default:
      return state;
  }
}

/*
 * reduces gameFilter
 */
export function gameFilter(state = GameFilters.SORT_BY_MOST_VIEWERS, action){
  switch (action.type){
    case SET_GAME_FILTER:
      return action.filter;
    default:
      return state;
  }
}

/*
 * root reducer
 */
const GaymerBearsAppReducer = combineReducers({
  addGaymer,
  gaymersForSelectedGame,
  selectedGame,
  allGamesList,
  liveGamesList,
  gameFilter
});

export default GaymerBearsAppReducer;

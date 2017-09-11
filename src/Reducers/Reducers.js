import { combineReducers } from 'redux';

import {
  ADD_GAYMER,
  ADD_GAYMER_REQUEST,
  ADD_GAYMER_FAILURE,
  ADD_GAYMER_SUCCESS,
  GET_ALL_GAMES,
  GET_LIVE_GAMES,
  // GET_GAYMERS_FOR_GAME,
  // SET_SELECTED_GAME,
  SET_GAME_FILTER,
  GameFilters } from '../Actions/Actions';

/*
 * define initial state
 */
// const initialState = {
//   addGaymer: {
//     isFetching: false,
//     isSuccess: false,
//     status: undefined,
//     gaymerName: undefined,
//     gaymerId: undefined,
//     streamPlatform: 'Twitch'
//   },
//
//   gaymersForSelectedGame: [],
//   selectedGame: 'Overwatch',
//   allGamesList: [],
//   liveGamesList: [],
//   gameFilter: GameFilters.SORT_BY_MOST_VIEWERS
// }

/*
 * reduces gaymersForSelectedGame
 */
export function addGaymer(state = {
  isFetching: false,
  status: undefined,
  isSuccess: false,
  streamPlatform: 'Twitch',
  gaymerName: undefined,
  gaymerId: undefined
   }, action){
  switch(action.type){
    case ADD_GAYMER:
    case ADD_GAYMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName
      });
    case ADD_GAYMER_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName,
      });
    case ADD_GAYMER_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName,
        gaymerId: action.gaymerId
      });
    default:
      return state;
  }
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

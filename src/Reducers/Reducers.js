import { combineReducers } from 'redux';

import {
  ADD_GAYMER, ADD_GAYMER_REQUEST, ADD_GAYMER_FAILURE, ADD_GAYMER_SUCCESS,

  GET_GAYMERS, GET_GAYMERS_REQUEST, GET_GAYMERS_FAILURE, GET_GAYMERS_SUCCESS, GET_GAYMERS_EMPTY,

  SET_GAMES, SET_GAMES_REQUEST, SET_GAMES_FAILURE, SET_GAMES_SUCCESS,

  GET_GAMES, GET_GAMES_REQUEST, GET_GAMES_FAILURE, GET_GAMES_SUCCESS, GET_GAMES_EMPTY,

  TOGGLE_SELECTED_GAME,

  GET_ALL_GAMES,

  GET_TWITCH_LIVE_STREAMS, GET_TWITCH_LIVE_STREAMS_REQUEST, GET_TWITCH_LIVE_STREAMS_FAILURE, GET_TWITCH_LIVE_STREAMS_SUCCESS,

  UPDATE_GAYMER_ONLINE_STATUS_REQUEST, UPDATE_GAYMER_ONLINE_STATUS_COMPLETE,

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
//   getGaymers: {
//     isFetching: false,
//     isSuccess: false,
//     status: undefined,
//     gaymers: []
//   }
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
  isSuccess: false,
  hasError: false,
  status: undefined,
  streamPlatform: 'Twitch',
  gaymerName: undefined,
  gaymerId: undefined
   }, action){
  switch(action.type){
    case ADD_GAYMER:
    case ADD_GAYMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isSuccess: false,
        hasError: false,
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName
      });
    case ADD_GAYMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: false,
        hasError: true,
        status: action.status,
        streamPlatform: action.streamPlatform,
        gaymerName: action.gaymerName,
      });
    case ADD_GAYMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
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
 * reduces getGaymersRequest
 */
export function getGaymers(state = {
  isFetching: false,
  isSuccess: false,
  hasError: false,
  status: undefined,
  gaymers: []
   }, action){

  switch(action.type){
    case GET_GAYMERS:
    case GET_GAYMERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isSuccess: false,
        hasError: false,
        status: action.status
      });
    case GET_GAYMERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: false,
        hasError: true,
        status: action.status
      });
    case GET_GAYMERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status,
        gaymers: action.gaymers
      });
    case GET_GAYMERS_EMPTY:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status
      });
    case UPDATE_GAYMER_ONLINE_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status
      });
    case UPDATE_GAYMER_ONLINE_STATUS_COMPLETE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        hasError: false,
        status: action.status,
        gaymers: action.gaymers
      });
    default:
      return state;
  }
}

/*
 * reduces getGames
 */
export function getGames(state = {
  isFetching: false,
  status: undefined,
  isSuccess: false,
  games: []
  }, action){

  switch(action.type){
    case GET_GAMES:
    case GET_GAMES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        status: action.status
      });
    case GET_GAMES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status
      });
    case GET_GAMES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status,
        games: setSelectedGame("All Games", action.games)
      });
    case GET_GAMES_EMPTY:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status
      });
    case TOGGLE_SELECTED_GAME:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        isSuccess: true,
        games: setSelectedGame(action.game, action.games)
      });
    default:
      return state;
  }
}



function setSelectedGame(game, games){
  let arr = [];
  for (let k = 0; k < games.length; k+=1){
    let g = games[k];
    if (game && game === g['name']){
      g['selected'] = true;
    } else {
      g['selected'] = false;
    }
    arr.push(g);
  }
  return arr;
}

/*
 * reduces setGames
 */
export function setGames(state = {
  isFetching: false,
  status: undefined,
  isSuccess: false,
  games: []
   }, action){

  switch(action.type){
    case SET_GAMES:
    case SET_GAMES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        status: action.status
      });
    case SET_GAMES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status
      });
    case SET_GAMES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        status: action.status,
        games: action.games
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
 * reduces twitchLiveStreamsList
 */
export function twitchLiveStreamsList(state = {
    isFetching: false,
    status: undefined,
    isSuccess: false,
    liveStreams: [],
    game: undefined
  }, action){
  switch (action.type){
    case GET_TWITCH_LIVE_STREAMS:
    case GET_TWITCH_LIVE_STREAMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        status: action.status,
        game: action.game
      });
    case GET_TWITCH_LIVE_STREAMS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        game: action.game
      });
    case GET_TWITCH_LIVE_STREAMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        isSuccess: true,
        liveStreams: action.liveStreams,
        game: action.game
      });
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
  getGaymers,
  getGames,
  gaymersForSelectedGame,
  selectedGame,
  allGamesList,
  twitchLiveStreamsList,
  gameFilter
});

export default GaymerBearsAppReducer;

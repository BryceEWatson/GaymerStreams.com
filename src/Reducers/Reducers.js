import { combineReducers } from 'redux';

import {
  ADD_GAYMER,
  GET_ALL_GAMES,
  GET_ALL_LIVE_GAMES,
  GET_ALL_GAYMERS_FOR_GAME,
  SET_GAME_FILTER,
  GameFilters } from '../Actions/Actions';

/*
 * define initial state
 */
const initialState = {
  allGamesList: []
  liveGamesList: [],
  gameFilter: GameFilters.SORT_BY_MOST_VIEWERS
}

/*
 * reduces allGamesList
 */
function allGamesList(state = [], action){
  // TODO: Implement
  // For now, don't handle any actions and just return the state given to us.
  return state;
}

/*
 * reduces liveGamesList
 */
function liveGamesList(state = [], action){
  // TODO: Implement
  // For now, don't handle any actions and just return the state given to us.
  return state;
}

/*
 * reduces gameFilter
 */
function gameFilter(state = GameFilters.SORT_BY_MOST_VIEWERS, action){
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
const gaymerBearsAppReducer = combineReducers({
  allGamesList,
  liveGamesList,
  gameFilter
});

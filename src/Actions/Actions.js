/**
 * action types
 */
export const ADD_GAYMER = 'ADD_GAYMER';
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_LIVE_GAMES = 'GET_LIVE_GAMES';
export const GET_GAYMERS_FOR_GAME = 'GET_GAYMERS_FOR_GAME';
export const SET_SELECTED_GAME = 'SET_SELECTED_GAME';
export const SET_GAME_FILTER = 'SET_GAME_FILTER';

/*
 * other constants
 */
export const GameFilters = {
  SORT_BY_FEWEST_VIEWERS: 'SORT_BY_FEWEST_VIEWERS',
  SORT_BY_MOST_VIEWERS: 'SORT_BY_MOST_VIEWERS'
}

/*
 * action creators
 */

/*
 * generates the ADD_GAYMER action
 */
export function addGaymer(gaymerId, streamPlatform){
  return {
    type: ADD_GAYMER,
    gaymerId,
    streamPlatform
  }
}

/*
 * generates the GET_ALL_GAMES action
 */
export function getAllGames(){
  return {
    type: GET_ALL_GAMES
  }
}

/*
 * generates the GET_LIVE_GAMES action
 */
export function getLiveGames(){
  return {
    type: GET_LIVE_GAMES
  }
}

/*
 * generates the GET_GAYMERS_FOR_GAME action
 */
export function getGaymersForGame(game){
  return {
    type: GET_GAYMERS_FOR_GAME,
    game
  }
}

/*
 * generates the SET_SELECTED_GAME action
 */
export function setSelectedGame(game){
  return {
    type: SET_SELECTED_GAME,
    game
  }
}

/*
 * generates the SET_GAME_FILTER action
 */
export function setGameFilter(filter){
  return {
    type: SET_GAME_FILTER,
    filter
  }
}

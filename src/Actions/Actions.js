/**
 * action types
 */
export const ADD_GAYMER = 'ADD_TODO';
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_ALL_LIVE_GAMES = 'GET_ALL_LIVE_GAMES';
export const GET_ALL_GAYMERS_FOR_GAME = 'GET_ALL_GAYMERS_FOR_GAME';
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
function addGaymer(gaymerId, streamPlatform){
  return {
    type: ADD_GAYMER,
    gaymerId
    streamPlatform
  }
}

/*
 * generates the GET_ALL_GAMES action
 */
function getAllGames(){
  return {
    type: GET_ALL_GAMES
  }
}

/*
 * generates the GET_ALL_LIVE_GAMES action
 */
function getAllLiveGames(){
  return {
    type: GET_ALL_LIVE_GAMES
  }
}

/*
 * generates the GET_ALL_GAYMERS_FOR_GAME action
 */
function getAllGaymersForGame(game){
  return {
    type: GET_ALL_LIVE_GAMES,
    game
  }
}

/*
 * generates the SET_GAME_FILTER action
 */
function setGameFilter(filter){
  return {
    type: SET_GAME_FILTER,
    filter
  }
}

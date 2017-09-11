import FirebaseUtil from '../Utils/InitializeFirebase';
import DebugLog from '../Utils/DebugLog';


var twitchApiGetOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': '4ab0ef4dut3ngrm4ercp9ue54k58d5'
  }
};

/**
 * action types
 */

export const INIT_FIREBASE = 'INIT_FIREBASE';

export const ADD_GAYMER = 'ADD_GAYMER'; //from UI event
export const ADD_GAYMER_REQUEST = 'ADD_GAYMER_REQUEST';
export const ADD_GAYMER_FAILURE = 'ADD_GAYMER_FAILURE';
export const ADD_GAYMER_SUCCESS = 'ADD_GAYMER_SUCCESS';

export const GET_GAYMERS = 'GET_GAYMERS';
export const GET_GAYMERS_REQUEST = 'GET_GAYMERS_REQUEST';
export const GET_GAYMERS_FAILURE = 'GET_GAYMERS_FAILURE';
export const GET_GAYMERS_SUCCESS = 'GET_GAYMERS_SUCCESS';

export const GET_TWITCH_LIVE_STREAMS = 'GET_TWITCH_LIVE_STREAMS';
export const GET_TWITCH_LIVE_STREAMS_REQUEST = 'GET_TWITCH_LIVE_STREAMS_REQUEST';
export const GET_TWITCH_LIVE_STREAMS_FAILURE = 'GET_TWITCH_LIVE_STREAMS_FAILURE';
export const GET_TWITCH_LIVE_STREAMS_SUCCESS = 'GET_TWITCH_LIVE_STREAMS_SUCCESS';


export const GET_ALL_GAMES = 'GET_ALL_GAMES';
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

 //THUNK

/*
 * translate twitch name to twich id
 */
 export function fetchTwitchIdFromName(twitchName) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(addGaymerRequest(twitchName))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`https://api.twitch.tv/kraken/users?login=${twitchName}`, twitchApiGetOptions)
      .then(response => response.json(),
        // Do not use catch, because that will also catch any errors in the dispatch and resulting render, causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        (error) => {
            console.log('An error occured.', error);
            dispatch(addGaymerFailure(twitchName, 'Twitch', error))
          }
      )
      .then((json) => {
          DebugLog('fetchTwitchIdFromName RESPONSE', json);

          let gaymer = {
            streamPlatform: 'Twitch',
            channelId: json.users[0]._id,
            gaymerName: twitchName
          }

          //check if gaymer already exists before writing
          FirebaseUtil.getFirebase().database().ref('gaymers/'+ twitchName + json.users[0]._id).once('value').then(function(gaymerSnap){
            if(gaymerSnap.val()){
              dispatch(addGaymerFailure(twitchName, 'Twitch', 'Gaymer already added'));
            } else {
              FirebaseUtil.getFirebase().database().ref('gaymers/'+ twitchName + json.users[0]._id).set(gaymer, function(pushErr){
                if (pushErr){
                  dispatch(addGaymerFailure(twitchName, 'Twitch', pushErr))
                } else {
                  dispatch(addGaymerSuccess(twitchName, 'Twitch', json.users[0]._id))
                }
              });
            }
          }).catch(function(err){
            dispatch(addGaymerFailure(twitchName, 'Twitch', err));
          });
        }
      );
  }
}

/*
 * fetch gaymers
 */
export function fetchGaymers() {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(getGaymersRequest())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    FirebaseUtil.getFirebase().database().ref('gaymers').on('value', function(gaymersSnap){
      console.log('gaymersSnap', gaymersSnap);
    });
  }
}

/*
 * request live streams given channel ids and game.
 * If no games is specified, then live streams are retrieved based on channelIds
 */
export function fetchTwitchLiveStreams(game, channelIds) {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(getTwitchLiveStreamsRequest(game, channelIds))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    let url = 'https://api.twitch.tv/kraken/streams/?';
    if (game) { // get live streams for a particular game only
      url += 'game=' + game;
      if (channelIds) { // should be defined if game is defined
        url += 'channel=' + channelIds;
      }
    } else if (channelIds){ //get live streams for gaymers on file, any games
      url += 'channel=' + channelIds;
    }

    DebugLog('URL', url);

    return fetch(url, twitchApiGetOptions)
      .then(response => response.json(),
        // Do not use catch, because that will also catch any errors in the dispatch and resulting render, causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        (error) => {
            console.log('An error occured.', error);
            dispatch(getTwitchLiveStreamsFailure(game, channelIds, error));
          }
      )
      .then((json) => {
          DebugLog('fetchTwitchLiveStreams RESPONSE', json);
          dispatch(getTwitchLiveStreamsSuccess(game, channelIds, json));
        }
      );
  }
}

/*
 * generates the ADD_GAYMER action
 */
export function addGaymer(gaymerName, streamPlatform){
 return {
   type: ADD_GAYMER,
   gaymerName,
   streamPlatform
 }
}

/*
 * generates the ADD_GAYMER_REQUEST action
 */
export function addGaymerRequest(gaymerName, streamPlatform){
  return {
    type: ADD_GAYMER_REQUEST,
    status: 'Adding Gaymer...',
    gaymerName,
    streamPlatform,
  }
}

/*
 * generates the ADD_GAYMER_FAILURE action
 */
export function addGaymerFailure(gaymerName, streamPlatform, error){
  return {
    type: ADD_GAYMER_FAILURE,
    status: error,
    streamPlatform,
    gaymerName
  }
}

/*
 * generates the ADD_GAYMER_SUCCESS action
 */
export function addGaymerSuccess(gaymerName, gaymerId, streamPlatform){
  return {
    type: ADD_GAYMER_SUCCESS,
    status: 'Gaymer added successfully',
    streamPlatform,
    gaymerName,
    gaymerId
  }
}

/*
 * generates the GET_GAYMERS action
 */
export function getGaymers(){
   return {
     type: GET_GAYMERS,
     status: 'Retrieving gaymers...'
   }
}


/*
 * generates the GET_GAYMERS_REQUEST action
 */
export function getGaymersRequest(){
   return {
     type: GET_GAYMERS_REQUEST,
     status: 'Retrieving gaymers...'
   }
}

/*
 * generates the GET_GAYMERS_FAILURE action
 */
export function getGaymersFailure(error){
   return {
     type: GET_GAYMERS_FAILURE,
     status: error
   }
}

/*
 * generates the GET_GAYMERS_SUCCESS action
 */
export function getGaymersSuccess(){
   return {
     type: GET_GAYMERS_SUCCESS,
     status: 'Gaymers retrieved successfully.'
   }
}


/*
 * generates the GET_LIVE_STREAMS action
 */
export function getTwitchLiveStreams(game, channelIds){
  return {
    type: GET_TWITCH_LIVE_STREAMS,
    status: 'Retrieving live Twitch streams... ',
    game,
    channelIds
  }
}

/*
 * generates the GET_TWITCH_LIVE_STREAMS_REQUEST action
 */
export function getTwitchLiveStreamsRequest(game, channelIds){
  return {
    type: GET_TWITCH_LIVE_STREAMS_REQUEST,
    status: 'Retrieving live Twitch streams... ',
    game,
    channelIds
  }
}

/*
 * generates the GET_TWITCH_LIVE_STREAMS_FAILURE action
 */
export function getTwitchLiveStreamsFailure(game, channelIds, error){
  return {
    type: GET_TWITCH_LIVE_STREAMS_FAILURE,
    status: error,
    game,
    channelIds
  }
}

/*
 * generates the GET_TWITCH_LIVE_STREAMS_SUCCESS action
 */
export function getTwitchLiveStreamsSuccess(game, channelIds, liveStreams){
  return {
    type: GET_TWITCH_LIVE_STREAMS_SUCCESS,
    status: 'Successfully retrieved live streams.',
    liveStreams,
    game,
    channelIds
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


/*
 * generates the GET_ALL_GAMES action
 */
export function getAllGames(){
  return {
    type: GET_ALL_GAMES
  }
}

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
export const GET_GAYMERS_EMPTY = 'GET_GAYMERS_EMPTY';

export const GET_TWITCH_LIVE_STREAMS = 'GET_TWITCH_LIVE_STREAMS';
export const GET_TWITCH_LIVE_STREAMS_REQUEST = 'GET_TWITCH_LIVE_STREAMS_REQUEST';
export const GET_TWITCH_LIVE_STREAMS_FAILURE = 'GET_TWITCH_LIVE_STREAMS_FAILURE';
export const GET_TWITCH_LIVE_STREAMS_SUCCESS = 'GET_TWITCH_LIVE_STREAMS_SUCCESS';

export const UPDATE_GAYMER_ONLINE_STATUS_REQUEST = 'UPDATE_GAYMER_ONLINE_STATUS_REQUEST';
export const UPDATE_GAYMER_ONLINE_STATUS_COMPLETE = 'UPDATE_GAYMER_ONLINE_STATUS_COMPLETE';

export const SET_GAMES = 'SET_GAMES';
export const SET_GAMES_REQUEST = 'SET_GAMES_REQUEST';
export const SET_GAMES_FAILURE = 'SET_GAMES_FAILURE';
export const SET_GAMES_SUCCESS = 'SET_GAMES_SUCCESS';

export const GET_GAMES = 'GET_GAMES';
export const GET_GAMES_REQUEST = 'GET_GAMES_REQUEST';
export const GET_GAMES_FAILURE = 'GET_GAMES_FAILURE';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const GET_GAMES_EMPTY = 'GET_GAMES_EMPTY';

export const FILTER_TWITCH_STREAMS = 'FILTER_TWITCH_STREAMS';
export const FILTER_TWITCH_STREAMS_REQUEST = 'FILTER_TWITCH_STREAMS_REQUEST';
export const FILTER_TWITCH_STREAMS_FAILURE = 'FILTER_TWITCH_STREAMS_FAILURE';
export const FILTER_TWITCH_STREAMS_SUCCESS = 'FILTER_TWITCH_STREAMS_SUCCESS';
export const FILTER_TWITCH_STREAMS_EMPTY = 'FILTER_TWITCH_STREAMS_EMPTY';

export const TOGGLE_SELECTED_GAME = 'TOGGLE_SELECTED_GAME';

export const COMPUTE_STREAM_COUNTS = 'COMPUTE_STREAM_COUNTS';

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

    dispatch(addGaymerRequest(twitchName));

    if (!twitchName) {
      return setTimeout(function(){
        dispatch(addGaymerFailure(undefined, 'Twitch', 'You must enter a Twitch name'));
      }, 300);
    }

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
          // DebugLog('fetchTwitchIdFromName RESPONSE', json);

          if (!json || !json.users || !json.users[0] || !json.users[0]._id){
            return dispatch(addGaymerFailure(twitchName, 'Twitch', 'Twitch user ' + twitchName + ' does not exist'));
          }

          let gaymer = {
            streamPlatform: 'Twitch',
            channelId: json.users[0]._id,
            gaymerName: twitchName
          }

          //check if gaymer already exists before writing
          FirebaseUtil.getFirebase().database().ref('gaymers/'+ twitchName.toLowerCase() + json.users[0]._id).once('value').then(function(gaymerSnap){
            if(gaymerSnap.val()){
              dispatch(addGaymerFailure(twitchName, 'Twitch', 'Gaymer already added'));
            } else {
              FirebaseUtil.getFirebase().database().ref('gaymers/'+ twitchName.toLowerCase() + json.users[0]._id).set(gaymer, function(pushErr){
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

    dispatch(getGaymersRequest());

    return FirebaseUtil.getFirebase().database().ref('gaymers').on('value', (gaymersSnap) => {
      let gaymersSnapshot = gaymersSnap.val();
      // DebugLog('fetchGaymers', gaymersSnapshot);

      if (gaymersSnapshot){
        var arr = Object.values(gaymersSnapshot);
        arr.sort(function(a,b){
          return a['gaymerName'].toLowerCase().localeCompare(b['gaymerName'].toLowerCase());
        });
        dispatch(getGaymersSuccess(Object.values(gaymersSnapshot)));
        dispatch(fetchTwitchLiveStreams(undefined, extractChannelIdsFromObjectAsString(gaymersSnapshot)));
      } else {
        dispatch(getGaymersEmpty());
      }
    }, (err) => {
      dispatch(getGaymersFailure(err));
    });
  }
}

/*
 * fetch games
 */
export function fetchGames() {
  return function (dispatch, getState) {
    dispatch(getGamesRequest());
    return FirebaseUtil.getFirebase().database().ref('games').on('value', (gamesSnap) => {
        let gamesSnapshot = gamesSnap.val();
        // DebugLog('gamesSnapshot', gamesSnapshot);
        if (gamesSnapshot){

          // sort games
          let arr = Object.values(gamesSnapshot);

          // DebugLog('before sort', arr);
          arr.sort(function(a,b){
            return a['name'].toLowerCase().localeCompare(b['name'].toLowerCase());
          });
          // DebugLog('after sort', arr);

          // move "All Games" to the top of the list
          // DebugLog('before move', arr);
          promote('All Games', arr);
          // DebugLog('moved all games to front of list',arr);

          dispatch(getGamesSuccess(arr));
        } else {
          dispatch(getGamesEmpty());
        }
      }, (err) => {
      dispatch(getGamesFailure(err));
    });
  }
}

export function computeStreamCounts(liveStreams, games){
  return {
    type: COMPUTE_STREAM_COUNTS,
    status: 'Computing stream counts...',
    games,
    liveStreams
  }
}

// foo is the target value of foo you are looking for
// arr is your array of items
// NOTE: this is mutating. Your array will be changed (unless the item isn't found)
export function promote(target, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]['name'] === target) {
      let a = arr.splice(i,1);   // removes the item
      arr.unshift(a[0]);         // adds it back to the beginning
      break;
    }
  }
  return arr;
}

/*
 * request live streams given channel ids and game.
 * If no games is specified, then live streams are retrieved based on channelIds
 */
export function fetchTwitchLiveStreams(game, channelIds) {
  return function (dispatch, getState) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(getTwitchLiveStreamsRequest(game, channelIds))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    let url = 'https://api.twitch.tv/kraken/streams/?';
    game = game === 'All Games' ? undefined : game;
    if (game) { // get live streams for a particular game only
      url += 'game=' + game;
      if (channelIds) { // should be defined if game is defined
        url += '&channel=' + channelIds;
      }
    } else if (channelIds){ //get live streams for gaymers on file, any games
      url += 'channel=' + channelIds;
    }

    // DebugLog('URL', url);

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
          dispatch(getTwitchLiveStreamsSuccess(game, channelIds, json.streams));

          //cross reference channelIds with streamers and update gaymers list
          const { getGaymers, getGames, twitchLiveStreamsList } = getState();
          // DebugLog('fetchTwitchLiveStreams json.streams', json.streams);
          // DebugLog('fetchTwitchLiveStreams getGaymers', getGaymers.gaymers);
          dispatch(updateGaymerOnlineStatusRequest());
          let gaymers = setGaymersOnlineStatus(getGaymers.gaymers, json.streams);
          dispatch(updateGaymerOnlineStatusComplete(gaymers));

          dispatch(computeStreamCounts(twitchLiveStreamsList.liveStreams, getGames.games));

          let liveGamesSet = extractUniqueGamesFromTwitchStreams(json.streams);

          if (liveGamesSet){
            dispatch(storeGames(liveGamesSet));
          }
        }
      );
  }
}

function setGaymersOnlineStatus(gaymers, streams){
  if (gaymers === undefined || gaymers === null || gaymers.length === 0) return;
  if (streams === undefined || streams === null) return;

  // DebugLog('BEFORE gaymers', gaymers);
  // DebugLog('BEFORE streams', streams);

  for (let i=0; i<gaymers.length; i+=1){
    for (let j=0; j<streams.length; j+=1){
      // DebugLog(gaymers[i]['channelId'], streams[j].channel._id);
      if (gaymers[i]['channelId'] == streams[j].channel._id){
        gaymers[i]['status'] = 'Online';
      }
    }
  }

  // DebugLog('AFTER gaymers', gaymers);
  return gaymers;
}

export function updateGaymerOnlineStatusRequest(){
  return {
    type: UPDATE_GAYMER_ONLINE_STATUS_REQUEST,
    status: 'Updating gaymers\' online status.'
  }
}

export function updateGaymerOnlineStatusComplete(gaymers){
  return {
    type: UPDATE_GAYMER_ONLINE_STATUS_COMPLETE,
    status: 'All gaymers\' status updated.',
    gaymers
  }
}

/*
 * Set games in database.
 */
export function storeGames(liveGames) {
  return function(dispatch) {
    dispatch(setGamesRequest());
    // DebugLog('liveGames', liveGames);
    if (liveGames) { //if there are any live games to record in database
      let gamesRef = FirebaseUtil.getFirebase().database().ref('games');

      gamesRef.once('value').then((gamesSnap)=>{
        let existingGames = gamesSnap.val();
        // DebugLog('existingGames', existingGames);

        let updates = {}
        if (existingGames) {
          for (let k = 0; k < liveGames.length; k += 1) {
            //only write if liveGames[k] key not in existingGames
            if (!(liveGames[k].replace('/','-') in existingGames)){
              // DebugLog('key ' + liveGames[k].replace('/','-') + ' not in, therefore, write');
              updates['/' + liveGames[k].replace('/','-')] = { name: liveGames[k] };
            }
          }
        } else { //no games yet in database
          // DebugLog('no games yet, adding');
          for (let k = 0; k < liveGames.length; k+=1){
            updates['/' + liveGames[k].replace('/','-')] = { name: liveGames[k] };
          }
        }

        //batch update
        if (Object.keys(updates).length !== 0){
          gamesRef.update(updates).then(() => {
            dispatch(setGamesSuccess('storeGames: Game updates complete.'));
          }).catch((err) => {
            dispatch(setGamesFailure(err));
          });
        } else {
          dispatch(setGamesSuccess('storeGames: All games in, updates not needed'));
        }

      });
    }
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
export function getGaymersSuccess(gaymers){
   return {
     type: GET_GAYMERS_SUCCESS,
     status: 'Gaymers retrieved successfully.',
     gaymers
   }
}

/*
 * generates the GET_GAYMERS_EMPTY action
 */
export function getGaymersEmpty(){
   return {
     type: GET_GAYMERS_EMPTY,
     status: 'No gaymers online.'
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
 * generates the SET_GAMES action
 */
export function setGames(){
  return {
    type: SET_GAMES,
    status: 'Recording games in database... '
  }
}

/*
 * generates the SET_GAMES_REQUEST action
 */
export function setGamesRequest(){
  return {
    type: SET_GAMES_REQUEST,
    status: 'Recording games in database... '
  }
}

/*
 * generates the SET_GAMES_FAILURE action
 */
export function setGamesFailure(error){
  return {
    type: SET_GAMES_FAILURE,
    status: error
  }
}

/*
 * generates the SET_GAMES_SUCCESS action
 */
export function setGamesSuccess(status){
  return {
    type: SET_GAMES_SUCCESS,
    status
  }
}

/*
 * generates the GET_GAMES action
 */
export function getGames(){
  return {
    type: GET_GAMES,
    status: 'Retrieving games... '
  }
}

/*
 * generates the GET_GAMES_REQUEST action
 */
export function getGamesRequest(){
  return {
    type: GET_GAMES_REQUEST,
    status: 'Retrieving games... '
  }
}

/*
 * generates the GET_GAMES_FAILURE action
 */
export function getGamesFailure(error){
  return {
    type: GET_GAMES_FAILURE,
    status: error
  }
}

/*
 * generates the GET_GAMES_SUCCESS action
 */
export function getGamesSuccess(games){
  return {
    type: GET_GAMES_SUCCESS,
    status: 'Successfully retrieved games.',
    games
  }
}

/*
 * generates the GET_GAMES_EMPTY action
 */
export function getGamesEmpty(){
  return {
    type: GET_GAMES,
    status: 'No games.'
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


export function filterTwitchStreamsByGame(game){
  return (dispatch, getState) => {
    const { twitchLiveStreamsList, getGaymers, getGames } = getState();

    // DebugLog('getState',getState());
    // DebugLog('twitchLiveStreamsList',twitchLiveStreamsList);
    // DebugLog('getGaymers',getGaymers);
    // DebugLog('getGames',getGames);

    //update filter ui
    dispatch(toggleSelectedGame(game, getGames.games));

    let channels = extractChannelIdsFromArrayAsString(getGaymers.gaymers);
    DebugLog('channels',channels);

    dispatch(fetchTwitchLiveStreams(game, extractChannelIdsFromArrayAsString(getGaymers.gaymers)));

  }
}

export function toggleSelectedGame(game, games){
  return {
    type: TOGGLE_SELECTED_GAME,
    status: 'Internal: Successfully toggled game filter UI',
    game,
    games
  }
}

/*
 * generates the FILTER_TWITCH_STREAMS action
 */
export function filterTwitchStreams(){
  return {
    type: FILTER_TWITCH_STREAMS
  }
}

/*
 * generates the FILTER_TWITCH_REQUEST action
 */
export function filterTwitchStreamsRequest(){
  return {
    type: FILTER_TWITCH_STREAMS_REQUEST
  }
}

/*
 * generates the FILTER_TWITCH_FAILURE action
 */
export function filterTwitchStreamsFailure(){
  return {
    type: FILTER_TWITCH_STREAMS_FAILURE
  }
}


/*
 * generates the FILTER_TWITCH_SUCCESS action
 */
export function filterTwitchStreamsSuccess(){
  return {
    type: FILTER_TWITCH_STREAMS_SUCCESS
  }
}

/*
 * generates the FILTER_TWITCH_EMPTY action
 */
export function filterTwitchStreamsEmpty(){
  return {
    type: FILTER_TWITCH_STREAMS_EMPTY
  }
}


/*
 * Utils
 */
function extractChannelIdsFromObjectAsString(gaymersObj){
  if (gaymersObj === undefined || gaymersObj === null){
    return '';
  };

  var arr = [];
  for (let k in gaymersObj){
    if (gaymersObj.hasOwnProperty(k)){
      let gaymer = gaymersObj[k];
      if (gaymer.hasOwnProperty('channelId')){
        arr.push(gaymer['channelId']);
      }
    }
  }
  return arr.join();
}

function extractChannelIdsFromArrayAsString(gaymersArr){
  if (gaymersArr === undefined || gaymersArr === null){
    return '';
  }

  var arr = [];

  for (let k = 0; k < gaymersArr.length; k+=1){
    arr.push(gaymersArr[k]['channelId']);
  }
  return arr.join();
}

function extractUniqueGamesFromTwitchStreams(streams){
  if (streams === undefined || streams === null){
    return [];
  }

  var set = new Set();
  for (let k = 0; k < streams.length; k+=1){
    set.add(streams[k].game);
  }
  return Array.from(set);
}

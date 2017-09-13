import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// REDUX
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import GaymerBearsAppReducer from './Reducers/Reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


/*
 * REACT DOM TESTS
 */

let store = createStore(
 GaymerBearsAppReducer,
 applyMiddleware(
   thunkMiddleware, // lets us dispatch() functions
   createLogger() // neat middleware that logs actions
 )
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div);
});

/*
 * REDUX UNIT TESTS
 */

/*
 * To properly set up unit testing for Redux methods, follow the steps below:
 * 1. Create a .babelrc as follows (see .babelrc)
   {
     "env": {
      "test": {
        "presets":[
          ["es2015", { "modules": false }],
          "react",
          "stage-0"
        ],
        "plugins": [
          "transform-es2015-modules-commonjs",
          "dynamic-import-node"
        ]
      }
     }
    }
 * 2. Run npm install --save-dev babel-jest
 * 3. Run npm install --save-dev babel-cli babel-preset-env
 * 4. Run npm install --save babel-preset-es2015
 * 5. Run npm install --save-dev babel-preset-stage-0
 * 6. In package.json, change the "test" under scripts to:
      "test": "jest",
      "test:watch": "npm test -- --watch"
 **/

 import * as Actions from './Actions/Actions';

/*
 * TEST REDUX ACTIONS
 */

 describe('Actions: ADD_GAYMER', () => {
  it('should create an action to add a gaymer', () => {
    const gaymerName = 'mockGaymerName';
    const streamPlatform = 'mockStreamPlatform';
    const expectedAction = {
      type: Actions.ADD_GAYMER,
      gaymerName,
      streamPlatform
    }
    expect(Actions.addGaymer(gaymerName, streamPlatform)).toEqual(expectedAction)
  })
})

describe('Actions: ADD_GAYMER_REQUEST', () => {
 it('should create an action to add a gaymer via network request', () => {
   const status = 'Adding Gaymer...';
   const gaymerName = 'mockGaymerName';
   const streamPlatform = 'mockStreamPlatform';
   const expectedAction = {
     type: Actions.ADD_GAYMER_REQUEST,
     status,
     gaymerName,
     streamPlatform
   }
   expect(Actions.addGaymerRequest(gaymerName, streamPlatform)).toEqual(expectedAction)
 })
})

describe('Actions: ADD_GAYMER_SUCCESS', () => {
 it('should create an action to signify success in addition of gaymer', () => {
   const status = 'Gaymer added successfully';
   const gaymerName = 'mockGaymerName';
   const streamPlatform = 'mockStreamPlatform';
   const gaymerId = 'mockGaymerId';
   const expectedAction = {
     type: Actions.ADD_GAYMER_SUCCESS,
     status,
     streamPlatform,
     gaymerName,
     gaymerId
   }
   expect(Actions.addGaymerSuccess(gaymerName, gaymerId, streamPlatform)).toEqual(expectedAction)
 })
})

describe('Actions', () => {
 it('should create an action to get all games', () => {
   const expectedAction = {
     type: Actions.GET_ALL_GAMES
   }
   expect(Actions.getAllGames()).toEqual(expectedAction)
 })
})


describe('Actions GET_TWITCH_LIVE_STREAMS', () => {
 it('should create an action to get live games', () => {
   const status = 'Retrieving live Twitch streams... ';
   const game = 'Overwatch';
   const channelIds = 'mockChannelId1,mockChannelId2';
   const expectedAction =  {
     type: Actions.GET_TWITCH_LIVE_STREAMS,
     status,
     game,
     channelIds
   }
   expect(Actions.getTwitchLiveStreams(game, channelIds)).toEqual(expectedAction)
 })
})

describe('Actions GET_TWITCH_LIVE_STREAMS_REQUEST', () => {
  it('should create an action to get live streams', () => {
    const status = 'Retrieving live Twitch streams... ';
    const game = 'Overwatch';
    const channelIds = 'mockChannelId1,mockChannelId2';
    const expectedAction =  {
      type: Actions.GET_TWITCH_LIVE_STREAMS_REQUEST,
      status,
      game,
      channelIds
    }
    expect(Actions.getTwitchLiveStreamsRequest(game, channelIds)).toEqual(expectedAction)
  })
})

describe('Actions', () => {
 it('should create an action to get gaymers for a game', () => {
   const game = 'Overwatch';
   const expectedAction = {
     type: Actions.GET_GAYMERS_FOR_GAME,
     game
   }
   expect(Actions.getGaymersForGame(game)).toEqual(expectedAction)
 })
})

describe('Actions', () => {
 it('should create an action to set the selected game', () => {
   const game = 'Overwatch';
   const expectedAction = {
     type: Actions.SET_SELECTED_GAME,
     game
   }
   expect(Actions.setSelectedGame(game)).toEqual(expectedAction)
 })
})

/*
 * TEST REDUX REDUCERS
 */
import * as AppReducer from './Reducers/Reducers';

 describe('Reducer', () => {
  it('should return the initial state', () => {
    //  console.log('AppReducer.gaymersForSelectedGame', AppReducer.gaymersForSelectedGame(undefined, Actions.GET_GAYMERS_FOR_GAME));
    expect(AppReducer.gaymersForSelectedGame(undefined, Actions.GET_GAYMERS_FOR_GAME)).toEqual(
      []
    )
  })
})

describe('Reducer', () => {
 it('should return the initial state', () => {
   expect(AppReducer.selectedGame(undefined, Actions.GET_GAYMERS_FOR_GAME)).toEqual(
     'Overwatch'
   )
 })
})

describe('Reducer', () => {
 it('should return the initial state', () => {
   expect(AppReducer.selectedGame(undefined, Actions.GET_GAYMERS_FOR_GAME)).toEqual(
     'Overwatch'
   )
 })
})

describe('Reducer allGamesList', () => {
 it('should return the initial state', () => {
   const action = {
     type: undefined
   }
   expect(AppReducer.allGamesList(undefined, action)).toEqual(
     []
   )
 })

 it('should return a new state', () => {
   const action = {
     type: Actions.GET_ALL_GAMES
   }
   expect(AppReducer.allGamesList(undefined, action)).toEqual(
     ['game1', 'game2']
   )
 })
})


describe('Reducer GET_TWITCH_LIVE_STREAMS', () => {
  it('should return a new state', () => {
    const status = 'Retrieving live Twitch streams... ';
    const game = 'Overwatch';
    const channelIds = 'mock1,mock2';
    const action = {
      type: Actions.GET_TWITCH_LIVE_STREAMS,
      status,
      game,
      channelIds
    };
    expect(AppReducer.twitchLiveStreamsList(undefined, action)).toEqual(
      {
        isFetching: true,
        status,
        isSuccess: false,
        liveStreams: [],
        game
      }
    )
  })
})

describe('Reducer GET_TWITCH_LIVE_STREAMS_REQUEST', () => {
  it('should return a new state', () => {
    const status = 'Retrieving live Twitch streams... ';
    const game = 'Overwatch';
    const channelIds = 'mock1,mock2';
    const action = {
      type: Actions.GET_TWITCH_LIVE_STREAMS_REQUEST,
      status,
      game,
      channelIds
    };
    expect(AppReducer.twitchLiveStreamsList(undefined, action)).toEqual(
      {
        isFetching: true,
        status,
        isSuccess: false,
        liveStreams: [],
        game
      }
    )
  })
})

describe('Reducer GET_TWITCH_LIVE_STREAMS_FAILURE', () => {
  it('should return a new state', () => {
    const status = 'Error getting Twitch live streams... ';
    const game = 'Overwatch';
    const channelIds = 'mock1,mock2';
    const action = {
      type: Actions.GET_TWITCH_LIVE_STREAMS_FAILURE,
      status,
      game,
      channelIds
    };
    expect(AppReducer.twitchLiveStreamsList(undefined, action)).toEqual(
      {
        isFetching: false,
        status,
        isSuccess: false,
        liveStreams: [],
        game
      }
    )
  })
})


describe('Reducer GET_TWITCH_LIVE_STREAMS_SUCCESS', () => {
  it('should return a new state', () => {
    const status = 'Successfully retrieved live streams.';
    const game = 'Overwatch';
    const channelIds = 'mock1,mock2';
    const liveStreams = ['liveStream1', 'liveStream2'];
    const action = {
      type: Actions.GET_TWITCH_LIVE_STREAMS_SUCCESS,
      status: 'Successfully retrieved live streams.',
      liveStreams,
      game,
      channelIds
    };
    expect(AppReducer.twitchLiveStreamsList(undefined, action)).toEqual(
      {
        isFetching: false,
        status,
        isSuccess: true,
        liveStreams,
        game
      }
    )
  })
})



describe('Reducer gameFilters', () => {
 it('should return the initial state', () => {
   const action = {
     type: undefined
   }
   expect(AppReducer.gameFilter(undefined, action)).toEqual(
     'SORT_BY_MOST_VIEWERS'
   )
 })

 it('should return a new state', () => {
   const action = {
     type: Actions.SET_GAME_FILTER,
     filter: Actions.GameFilters.SORT_BY_FEWEST_VIEWERS
   }
   expect(AppReducer.gameFilter(undefined, action)).toEqual(
     'SORT_BY_FEWEST_VIEWERS'
   )
 })
})

/*
 * Test Utility Methods
 */

 describe('promote', () => {
  it('should return promoted array', () => {
    let arr = [
      {
        name: 'Abc Game'
      },
      {
        name: 'All Games'
      }
    ];

    expect(Actions.promote('All Games', arr)).toEqual(
      [
        {
          name: 'All Games'
        },
        {
          name: 'Abc Game'
        }
      ]
    )
  })

  it('should return a new state', () => {
    const action = {
      type: Actions.SET_GAME_FILTER,
      filter: Actions.GameFilters.SORT_BY_FEWEST_VIEWERS
    }
    expect(AppReducer.gameFilter(undefined, action)).toEqual(
      'SORT_BY_FEWEST_VIEWERS'
    )
  })
 })

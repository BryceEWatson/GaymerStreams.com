import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*
 * REACT DOM TESTS
 */
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
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

 describe('Actions: ADD_GAYMER_REQUEST', () => {
  it('should create an action to add a gaymer', () => {
    const gaymerId = 'mockGaymerId';
    const streamPlatform = 'mockStreamPlatform';
    const expectedAction = {
      type: Actions.ADD_GAYMER_REQUEST,
      gaymerId,
      streamPlatform
    }
    expect(Actions.addGaymerRequest(gaymerId, streamPlatform)).toEqual(expectedAction)
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


describe('Actions', () => {
 it('should create an action to get live games', () => {
   const expectedAction = {
     type: Actions.GET_LIVE_GAMES
   }
   expect(Actions.getLiveGames()).toEqual(expectedAction)
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

 const mockInitialState = {
   gaymersForSelectedGame: [],
   selectedGame: 'Overwatch',
   allGamesList: [],
   liveGamesList: [],
   gameFilter: Actions.GameFilters.SORT_BY_MOST_VIEWERS
 }

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

describe('Reducer liveGamesList', () => {
 it('should return the initial state', () => {
   const action = {
     type: undefined
   }
   expect(AppReducer.liveGamesList(undefined, action)).toEqual(
     []
   )
 })

 it('should return a new state', () => {
   const action = {
     type: Actions.GET_LIVE_GAMES
   }
   expect(AppReducer.liveGamesList(undefined, action)).toEqual(
     ['liveGame1', 'liveGame2']
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

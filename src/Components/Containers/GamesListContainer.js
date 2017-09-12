import { connect } from 'react-redux';
import GamesList from '../GamesList';
import { filterTwitchStreamsByGame } from '../../Actions/Actions';

const mapStateToProps = (state) => {
  return {
    status: state.getGames.status,
    games: state.getGames.games
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     onClickGame: (game) => {
      //  dispatch(fetch(gaymerName, streamPlatform))
      console.log('clicked',game);
      dispatch(filterTwitchStreamsByGame(game));
    }
  }
}

const GamesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesList)

export default GamesListContainer;

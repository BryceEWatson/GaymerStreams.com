import { connect } from 'react-redux';
import GamesList from '../GamesList';

const mapStateToProps = (state) => {
  console.log('wtf',state);
  return {
    status: state.getGames.status,
    games: state.getGames.games
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // onFormSubmit: (gaymerName, streamPlatform) => {
//     //   dispatch(fetchTwitchIdFromName(gaymerName, streamPlatform))
//     }
//   }
// }

const GamesListContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(GamesList)

export default GamesListContainer;

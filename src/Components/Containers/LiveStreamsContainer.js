import { connect } from 'react-redux';
import LiveStreams from '../LiveStreams';

const mapStateToProps = (state) => {
  let isFilterByGame = Boolean(state.twitchLiveStreamsList.game);
  let liveStreams; // NOT to be confused with the state's liveStreams. This is the props for the UI.
  if (isFilterByGame){ // show streams for
    liveStreams = state.twitchLiveStreamsList.liveStreamsForGame;
  } else { // show streams for all games
    liveStreams = state.twitchLiveStreamsList.liveStreams;
  }

  return {
    isFetching: state.twitchLiveStreamsList.isFetching,
    status: state.twitchLiveStreamsList.status,
    liveStreams: liveStreams,
    game: state.twitchLiveStreamsList.game
  }
}

const LiveStreamsContainer = connect(
  mapStateToProps
)(LiveStreams)

export default LiveStreamsContainer;

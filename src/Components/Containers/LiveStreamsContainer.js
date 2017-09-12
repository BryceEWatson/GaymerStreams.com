import { connect } from 'react-redux';
import LiveStreams from '../LiveStreams';

const mapStateToProps = (state) => {
  return {
    isFetching: state.twitchLiveStreamsList.isFetching,
    status: state.twitchLiveStreamsList.status,
    liveStreams: state.twitchLiveStreamsList.liveStreams,
    game: state.twitchLiveStreamsList.game
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // onFormSubmit: (gaymerName, streamPlatform) => {
//     //   dispatch(fetchTwitchIdFromName(gaymerName, streamPlatform))
//     }
//   }
// }

const LiveStreamsContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(LiveStreams)

export default LiveStreamsContainer;

import { connect } from 'react-redux';
import Gaymers from '../Gaymers';

const mapStateToProps = (state) => {
  return {
    status: state.getGaymers.status,
    gaymers: state.getGaymers.gaymers
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // onFormSubmit: (gaymerName, streamPlatform) => {
//     //   dispatch(fetchTwitchIdFromName(gaymerName, streamPlatform))
//     }
//   }
// }

const GaymersContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Gaymers)

export default GaymersContainer;

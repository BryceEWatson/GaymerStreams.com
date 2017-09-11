import { connect } from 'react-redux';
import AddGaymerForm from '../AddGaymerForm';
import { fetchTwitchIdFromName } from '../../Actions/Actions';

const mapStateToProps = (state) => {
  return {
    status: state.addGaymer.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (gaymerName, streamPlatform) => {

      dispatch(fetchTwitchIdFromName(gaymerName, streamPlatform))
    }
  }
}

const StatusAddGaymerForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGaymerForm)

export default StatusAddGaymerForm;

import { connect } from 'react-redux';
import AddGaymerForm from '../AddGaymerForm';
import { fetchTwitchIdFromName } from '../../Actions/Actions';

const mapStateToProps = (state) => {
  return {
    isFetching: state.addGaymer.isFetching,
    isSuccess: state.addGaymer.isSuccess,
    hasError: state.addGaymer.hasError,
    status: state.addGaymer.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (gaymerName, streamPlatform) => {
      dispatch(fetchTwitchIdFromName(gaymerName, streamPlatform));
    }
  }
}

const AddGaymerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGaymerForm)

export default AddGaymerFormContainer;

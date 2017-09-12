import React from 'react';
import DebugLog from '../Utils/DebugLog';
import './AddGaymerForm.css';

const AddGaymerForm = ({ isFetching, isSuccess, hasError, status, onFormSubmit }) => {

  let gaymerName, streamPlatform;
  let toastVisibility = 'toast-hidden';

  return (
    <section className="AddGaymerFormSection">
      <div className="form-horizontal input-group input-inline AddGaymerFormContainer">
          <div className="form-group">
            <label className="twitch-gaymer-input-label input-group-addon" htmlFor="gaymerName">Add Twitch Gaymer</label>
            <input className="form-input input-group-addon twitch-gaymer-input" id="gaymerName" type="text" placeholder="Enter Twitch UserName"
              ref={node => {
                gaymerName = node
              }}

              onKeyPress={(e) => {
                if(e.which === 13){
                  onFormSubmit(gaymerName.value, streamPlatform);
                }
              }} required/>
              <button
                className={`btn input-group-btn ${isFetching ? 'loading' : ''}`}
                onClick={(e) => {
                  onFormSubmit(gaymerName.value, streamPlatform);
                }}
                >Submit</button>

          </div>

          {/*<div className="form-group">
            <label className="form-radio" htmlFor="streamPlatformTwitch">
              <input id="streamPlatformTwitch" type="radio" name="streamPlatform" value="Twitch"
                onChange={(e) => streamPlatform = e.target.value} required/>
              <i class="form-icon"></i> Twitch
            </label>

            <label className="form-radio" htmlFor="streamPlatformXBOX">
              <input id="streamPlatformXBOX" type="radio" name="streamPlatform" value="XBOX"
                onChange={(e) => streamPlatform = e.target.value}/>
              <i class="form-icon"></i> XBOX
            </label>
          </div>*/}

          {/*}<div className="form-group">
            <label className="form-label">Platform</label>
            <label className="form-radio">
              <input type="radio" name="gender" checked/>
              <i className="form-icon"></i> Male
            </label>
            <label className="form-radio">
              <input type="radio" name="gender"/>
              <i className="form-icon"></i> Female
            </label>
          </div>
          */}
      </div>


      <div className={`toast toast-override AddGaymerFormStatus ${isSuccess ? 'toast-success' : hasError ? 'toast-warning': 'toast-hidden' }`}>
        {status}
      </div>
    </section>
  )
}

// class AddGaymerForm extends Component {
//
//   constructor(props){
//     super(props);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleStreamPlatformChange = this.handleStreamPlatformChange.bind(this);
//
//     this.state = {
//       selectedStreamPlatform: 'Twitch'
//     }
//   }
//
//   handleStreamPlatformChange(e){
//     this.setState({
//       selectedStreamPlatform: e.target.value
//     });
//   }
//
//   handleSubmit(e){
//     e.preventDefault();
//     var streamPlatform = this.state.selectedStreamPlatform
//     var formData = {
//       gaymerName: this.gaymerName.value,
//       streamPlatform: streamPlatform,
//     };
//     this.props.onAddGaymerFormSubmit(formData);
//   }
//
//   render(){
//     return (
//       <section className="AddGaymerForm">
//         <form onSubmit={this.handleSubmit}>
//           <fieldset>
//             <legend>Add a Gaymer Bear Streamer</legend>
//
//             <label htmlFor="gaymerName">Tag/Username</label>
//             <input id="gaymerName" type="text" ref={(gaymerName) => this.gaymerName = gaymerName} required/>
//
//             <input id="streamPlatformTwitch" type="radio" name="streamPlatform" value="Twitch"
//               onChange={this.handleStreamPlatformChange} required/>
//             <label htmlFor="streamPlatformTwitch">Twitch</label>
//
//             <input id="streamPlatformXBOX" type="radio" name="streamPlatform" value="XBOX"
//               onChange={this.handleStreamPlatformChange}/>
//             <label htmlFor="streamPlatformXBOX">XBOX</label>
//
//             <input type="submit" value="Submit"/>
//           </fieldset>
//         </form>
//
//         <div className="AddFormResult">
//           Status: {this.props.status}
//         </div>
//       </section>
//     )
//   }
// }

export default AddGaymerForm;

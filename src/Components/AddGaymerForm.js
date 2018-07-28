import React from 'react';
import './AddGaymerForm.css';

const AddGaymerForm = ({ isFetching, isSuccess, hasError, status, onFormSubmit }) => {

  let gaymerName;
  let streamPlatform = 'Twitch';

  return (
    <section className="AddGaymerFormSection">
      <div className="form-horizontal input-group input-inline AddGaymerFormContainer">
          <div className="form-group">
            <label className="twitch-gaymer-input-label input-group-addon tooltip tooltip-bottom"
              data-tooltip="Know of a LGBT streamer? Are you a Twitch gaymer?"
              htmlFor="gaymerName">Add Twitch Gaymer</label>
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
                className={`btn btn-primary input-group-btn ${isFetching ? 'loading' : ''}`}
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


export default AddGaymerForm;

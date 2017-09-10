import React, { Component } from 'react';

class AddGaymerForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    console.log('handleSubmit', this.streamPlatform);
    e.preventDefault();
    var formData = {
      gaymerName: this.gaymerName.value,
      streamPlatform: this.streamPlatform.value,
    };
    this.props.onAddGaymerFormSubmit(formData);
  }

  render(){

    let addFormResult;
    if (this.props.hasError){
      addFormResult = <p>Sorry, there was an error</p>;
    } else if (this.props.isFetching){
      addFormResult = <p>Processing...</p>;
    } else if (this.props.isSuccess) {
      addFormResult = <p>{this.gaymerName} successfully added</p>;
    } else {
      addFormResult = '';
    }

    return (
      <section className="AddGaymerForm">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add a Gaymer Bear Streamer</legend>

            <label htmlFor="gaymerName">Tag/Username</label>
            <input id="gaymerName" type="text" ref={(gaymerName) => this.gaymerName = gaymerName} required/>

            <input id="streamPlatformTwitch" type="radio" name="streamPlatform" value="Twitch" ref={(twitch) =>
                {
                  console.log(twitch);
                  this.streamPlatform = twitch
                }
              } required/>
            <label htmlFor="streamPlatformTwitch">Twitch</label>

            <input id="streamPlatformXBOX" type="radio" name="streamPlatform" value="XBOX" ref={(xbox) =>
              {
                console.log(xbox);
                this.streamPlatform = xbox
              }}/>
            <label htmlFor="streamPlatformXBOX">XBOX</label>

            <input type="submit" value="Submit"/>
          </fieldset>
        </form>

        <div className="AddFormResult">
          {addFormResult}
        </div>
      </section>
    )
  }
}

export default AddGaymerForm;

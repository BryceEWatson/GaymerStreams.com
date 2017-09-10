import React, { Component } from 'react';

class AddGaymerForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var formData = {
      gaymerId: this.gaymerId.value,
      streamPlatform: this.streamPlatform.value,
    };
    this.props.onAddGaymerFormSubmit(formData);
  }

  render(){
    return (
      <section className="AddGaymerForm">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add a Gaymer Bear Streamer</legend>

            <label htmlFor="gaymerId">Tag/Username</label>
            <input id="gaymerId" type="text" ref={(gaymerId) => this.gaymerId = gaymerId} required/>

            <input id="streamPlatformTwitch" type="radio" name="streamPlatform" value="Twitch" ref={(streamPlatform) => this.streamPlatform = streamPlatform} required/>
            <label htmlFor="streamPlatformTwitch">Twitch</label>

            <input id="streamPlatformXBOX" type="radio" name="streamPlatform" value="XBOX" ref={(streamPlatform) => this.streamPlatform = streamPlatform}/>
            <label htmlFor="streamPlatformXBOX">XBOX</label>

            <input type="submit" value="Submit"/>
          </fieldset>
        </form>

        <div className="AddFormResult">this.props.addGaymerFormResult</div>
      </section>
    )
  }
}

export default AddGaymerForm;

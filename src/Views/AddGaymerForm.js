import React, { Component } from 'react';

class AddGaymerForm extends Component {
  render(){
    return (
      <section className="AddForm">
        <form>
          <fieldset>
            <legend>Add a Gaymer Bear Streamer</legend>
            <label htmlFor="gaymerId">Tag/Username</label>
            <input id="gaymerId" type="text" required/>
            <input id="streamPlatformTwitch" type="radio" name="streamPlatform" value="Twitch" required/>
              <label htmlFor="streamPlatformTwitch">Twitch</label>
              <input id="streamPlatformXBOX" type="radio" name="streamPlatform" value="XBOX"/>
                <label htmlFor="streamPlatformXBOX">XBOX</label>
            <input type="submit" />
          </fieldset>
        </form>

        <div className="AddFormResult"></div>
      </section>
    )
  }
}

export default AddGaymerForm;

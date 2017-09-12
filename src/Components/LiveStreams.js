import React from 'react';
import DebugLog from '../Utils/DebugLog';

const LiveStreams = ({ isFetching, status, liveStreams }) => {

  return (
    <section className="LiveStreamsSection">

      <h2>Live Streams</h2>

      <div className={`LiveStreamsStatus ${isFetching ? 'loading loading-lg' : ''}`}></div>

      <div className="LiveStreams container">
        <div className="columns">

        {liveStreams.map(stream => (


            <div className="column col-3 col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <img className="img-responsive" src={stream.preview.medium}/>
              Game: {stream.game} <br/>
              Name: {stream.channel.display_name} <br/>
              Stream title: {stream.channel.status}<br/>
            </div>

        ))}
        </div>
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

export default LiveStreams;

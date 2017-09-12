import React from 'react';
import DebugLog from '../Utils/DebugLog';
import './LiveStreams.css'

const LiveStreams = ({ isFetching, status, liveStreams, game }) => {

  return (
    <section className="LiveStreamsSection">

      <h3 className="LiveStreamsPadding">Live Streams</h3>

      <div className={`LiveStreamsStatus ${isFetching ? 'loading loading-lg' : ''}`}></div>

      <div className="container LiveStreamsContainer">
        <div className="columns">

          {liveStreams && liveStreams.length == 0 &&
            <div className="empty column col-12">
              <div className="empty-icon">
                <i className="icon icon-refresh"></i>
              </div>
              <p className="empty-title h5">No streams live {game ? 'for ' + game  : '' } at the moment.</p>
              <p className="empty-subtitle">Please check back later.</p>
              <div className="empty-action">
                <a href="/" className="btn btn-primary">Refresh</a>
              </div>
            </div>
          }

          {liveStreams && liveStreams.length > 0 &&  liveStreams.map(stream => (
            <div key={stream.channel.url} className="LiveStreams-link-override column col-3 col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
              <div className="card LiveStreamCard">
                <a href={stream.channel.url} target="_blank" className="card-image">
                  <img className="img-responsive" src={stream.preview.medium}/>
                </a>
                <div className="card-header">
                  <a href={stream.channel.url} target="_blank" className="btn btn-secondary float-right">
                    <i className="icon icon-share"></i>
                  </a>
                  <div className="card-title h5">{stream.channel.display_name} </div>
                  <div className="card-subtitle text-gray">Streaming: {stream.game}</div>
                </div>
                <div className="card-body">
                  Stream title: {stream.channel.status}<br/>
                </div>
              </div>
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

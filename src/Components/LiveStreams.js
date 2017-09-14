import React from 'react';
import './LiveStreams.css'

const LiveStreams = ({ isFetching, status, liveStreams, game }) => {

  return (
    <section className="LiveStreamsSection">

      <h3 className="LiveStreamsPadding">Live Streams</h3>

      <div className={`LiveStreamsStatus ${isFetching ? 'loading loading-lg' : ''}`}></div>

      <div className="container LiveStreamsContainer">
        <div className="columns">

          {liveStreams && liveStreams.length === 0 &&
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
                  <img className="img-responsive livestreams-img-responsive-override" src={stream.preview.medium}
                    alt="Stream channel preview"/>
                </a>
                <div className="card-header">
                  <a href={stream.channel.url} target="_blank" className="btn btn-secondary float-right">
                    <i className="icon icon-share"></i>
                  </a>
                  <div className="card-title h6 livestreams-display-name">{stream.channel.display_name} </div>
                  <div className="livestreams-game-name"><span className="livestreams-game-name-streaming">Streaming</span> {stream.game}</div>
                  <div className="card-subtitle text-gray livestreams-viewers">{stream.viewers} viewers</div>
                </div>
                <div className="card-body">
                  <div className="livestreams-blockquote">"{stream.channel.status}"</div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default LiveStreams;

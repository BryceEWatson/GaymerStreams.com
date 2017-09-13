import React from 'react';
import PropTypes from 'prop-types';
import './Gaymers.css';

const Gaymers = ({ status, gaymers }) => (

  <section className="GaymersSection">

    <details className="accordion">
      <summary className="accordion-header">
        <i className="icon icon-arrow-right mr-1"></i>
          <span className="GaymersTitle">Gaymers</span>
      </summary>
      <div className="accordion-body gaymers-accordion-body-override">
        <ul className="Gaymers menu menu-nav">
          {gaymers && gaymers.map(gaymer => (
            <li key={gaymer.channelId} className="menu-item">
              <a target="_blank" href={`https://www.twitch.tv/${gaymer.gaymerName}`}>
                {gaymer.status && gaymer.status === 'Online' ?
                  ( <div className="status-circle online-circle"></div> ) : ( <div className="status-circle offline-circle"></div> )
                } {gaymer.gaymerName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>



    {/*<div className="GaymersStatus">
      Status: {status}
    </div>*/}
  </section>
)

Gaymers.propTypes = {
  gaymers: PropTypes.array
}

export default Gaymers;

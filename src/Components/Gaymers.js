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
        <div className="container">
          <div className="columns col-gapless">

            {gaymers && gaymers.map(gaymer => (

              <div key={gaymer.gaymerName} className="column col-2 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-xs-6">
                <div className={`status-circle ${gaymer.status && gaymer.status === 'Online' ? 'online-circle' : 'offline-circle'}`}></div>

                <a className="" target="_blank" href={`https://www.twitch.tv/${gaymer.gaymerName}`}>
                  {gaymer.gaymerName}
                </a>
              </div>
            ))}

         </div>
        </div>
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

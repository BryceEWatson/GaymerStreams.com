import React from 'react';
import PropTypes from 'prop-types';

const Gaymers = ({ status, gaymers }) => (

  <section className="GaymersSection">

    <h2>Gaymers</h2>

    <ul className="Gaymers">
      {gaymers.map(gaymer => (
        <li>
          Gaymer Name: {gaymer.gaymerName}<br/>
        </li>
      ))}
    </ul>

    <div className="GaymersStatus">
      Status: {status}
    </div>
  </section>
)

Gaymers.propTypes = {
  gaymers: PropTypes.array
}

export default Gaymers;

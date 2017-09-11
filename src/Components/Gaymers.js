import React from 'react';
import PropTypes from 'prop-types';

const Gaymers = ({gaymers}) => (
  <section className="Gaymers">
    <h2>Gaymers</h2>
    Gaymers Goes Here
  </section>
)

Gaymers.propTypes = {
  gaymers: PropTypes.array
}

export default Gaymers;

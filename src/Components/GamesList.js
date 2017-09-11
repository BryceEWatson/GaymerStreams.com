import React from 'react';
import PropTypes from 'prop-types';

const GamesList = ({gamesList}) => (
  <section className="GamesList">
    <h2>Games</h2>
    Games List Goes Here
  </section>
)

GamesList.propTypes = {
  gamesList: PropTypes.array
}

export default GamesList;

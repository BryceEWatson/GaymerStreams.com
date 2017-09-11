import React from 'react';
import PropTypes from 'prop-types';

const GamesList = ({ status, games }) => (

  <section className="Games">
    <h2>Games</h2>

    <ul>
      {games.map(game => (
        <li>
          {game}
        </li>
      ))}
    </ul>

    <div class="GamesStatus">Status: {status}</div>
  </section>
)

GamesList.propTypes = {
  games: PropTypes.array
}

export default GamesList;

import React from 'react';
import PropTypes from 'prop-types';

const GamesList = ({ status, games, onClickGame }) => (

  <section className="Games">
    <h2>Games</h2>

    <ul>
      <li>
        <button onClick={() => onClickGame(undefined)}>All Games</button>
      </li>
      {games.map(game => (
        <li>
          <button onClick={() => onClickGame(game.name)}>{game.name}</button>
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

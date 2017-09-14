import React from 'react';
import PropTypes from 'prop-types';
import './GamesList.css'

const GamesList = ({ status, games, onClickGame }) => (

  <section className="GamesListSection">
    <h3>Games</h3>

    <div className="GamesListContainer filter">
      {games && games.map(game => (
        <input
          key={game.name}
          type="radio" id={`tag-${game.name.replace(/\s/g,'')}`} className="filter-tag" name="filter-radio" hidden />
      ))}

      <div className="filter-nav">
        {games && games.map(game => (
          <label key={game.name} className={`chip ${game.selected ? 'chip-selected' : ''}`}
          htmlFor={`tag-${game.name.replace(/\s/g,'')}`}
          onClick={(e) => onClickGame(game.name, e)}>
          {game.name}</label>
        ))}
      </div>
    </div>

  </section>
)

GamesList.propTypes = {
  games: PropTypes.array
}

export default GamesList;

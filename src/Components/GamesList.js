import React from 'react';
import PropTypes from 'prop-types';
import './GamesList.css'

const GamesList = ({ status, games, onClickGame }) => (

  <section className="Games">
    <h3>Games</h3>

    <div className="filter">
      <input type="radio" id="tag-all" className="filter-tag" name="filter-radio" hidden checked />
      {games.map(game => (
        <input type="radio" id={`tag-${game.name.replace(/\s/g,'')}`} className="filter-tag" name="filter-radio" hidden />
      ))}

      <div className="filter-nav">
        <label className="chip chip-selected"
          htmlFor="tag-all"
          onClick={() => onClickGame(undefined, this)}>
          All Games</label>
        {games.map(game => (
          <label className="chip"
          htmlFor={`tag-${game.name.replace(/\s/g,'')}`}
          onClick={(e) => onClickGame(game.name, e)}>
          {game.name}</label>
        ))}
      </div>
    </div>

    <div class="GamesStatus">Status: {status}</div>
  </section>
)

GamesList.propTypes = {
  games: PropTypes.array
}

export default GamesList;

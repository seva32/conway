import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '../components';

function Game({ location, match }) {
  const [paused, setPaused] = React.useState(true);
  const user = match.params.id ? match.params.id : 'User';
  const row = location.search
    ? Number(location.search.split('=')[1].split('&')[0])
    : 3;
  const col = location.search ? Number(location.search.split('=')[2]) : 3;

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-full min-h-screen">
        <h1>{user}</h1>
        <button onClick={() => setPaused(!paused)} type="button">
          {paused ? 'paused' : 'playing'}
        </button>
        <Grid row={row} col={col} paused={paused} />
      </div>
    </div>
  );
}

Game.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Game;

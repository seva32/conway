/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '../components';

function Game({ location, match }) {
  const [paused, setPaused] = React.useState(true);
  const user = match.params.id ? match.params.id : 'User';
  const row = location.search
    ? Number(location.search.split('=')[1].split('&')[0])
    : 4;
  const col = location.search
    ? Number(location.search.split('=')[2].split('&')[0])
    : 4;
  const load = location.search && location.search.split('&')[2];

  const [count, setCount] = React.useState(0);
  const [step, setStep] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const [intervalValue, setIntervalValue] = React.useState(300);
  const [showModal, setShowModal] = React.useState(false);
  const matrixRef = React.createRef(null);
  const [loadSavedMatrix, setLoadSavedMatrix] = React.useState(false);

  React.useEffect(() => {
    if (reset) {
      setCount(0);
      setReset(false);
    }
  }, [reset]);

  React.useEffect(() => {
    if (load) {
      const savedUserData = JSON.parse(localStorage.getItem('user')) || {};
      if (savedUserData && savedUserData.generation) {
        setCount(Number(savedUserData.generation));
      }
      if (savedUserData && savedUserData.interval) {
        setIntervalValue(savedUserData.interval);
      }
      setLoadSavedMatrix(true);
    }
  }, [load]);

  const saveGame = () => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        user,
        row,
        col,
        matrix: matrixRef.current,
        interval: intervalValue,
        generation: count,
        savedAt: Date.now(),
      }),
    );
  };

  return (
    <div className="z-0 relative">
      <div
        className={`fixed ${
          showModal ? 'block' : 'hidden'
        } bg-united h-12 w-12 top-0 z-20`}
      >
        Modal
        <label htmlFor="interval">
          <input
            value={intervalValue}
            onChange={(e) =>
              setIntervalValue(parseInt(e.target.value, 10) || 300)
            }
            type="number"
            id="interval"
            name="interval"
            pattern="\d*"
          />
        </label>
        <button type="button" onClick={() => setShowModal(false)}>
          submit
        </button>
      </div>
      <div
        className={`fixed ${
          showModal ? 'block' : 'hidden'
        } bg-honeydew opacity-75 w-screen h-screen inset-0 z-10`}
      />
      <div className="flex flex-col justify-center items-center w-full h-full min-h-screen">
        <h1>{user}</h1>
        <button onClick={() => setPaused(!paused)} type="button">
          {paused ? 'paused' : 'playing'}
        </button>
        <button onClick={() => setReset(true)} type="button">
          reset
        </button>
        <button onClick={() => setShowModal(true)} type="button">
          Change default interval: {intervalValue}
        </button>
        <button type="button" onClick={() => setStep(!step)}>
          Manual step
        </button>
        {step && (
          <button type="button" onClick={() => setCount(count + 1)}>
            +
          </button>
        )}
        <button type="button" onClick={saveGame}>
          Save game
        </button>
        <Grid
          row={row}
          col={col}
          paused={paused || step}
          count={count}
          setCount={setCount}
          interval={intervalValue}
          step={step}
          ref={matrixRef}
          loadSavedMatrix={loadSavedMatrix}
        />
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

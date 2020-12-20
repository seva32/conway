/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button } from '../components';

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
    <div className="w-4/5 page-min-h mx-auto flex flex-col justify-center items-center overflow-hidden">
      {/* modal & backdrop */}
      <div
        className={`fixed ${
          showModal ? 'block' : 'hidden'
        } bg-white h-12 w-12 top-0 z-20`}
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

      {/* buttons */}
      <div className="w-full h-1/5 text-white flex flex-col justify-center items-center">
        <div className="w-full h-1/2 flex justify-center items-center">
          <h2 className="uppercase">{user}</h2>
        </div>

        <div className="w-full h-1/2 min-h-4rem flex justify-between items-center flex-1">
          <div className="w-1/5 h-full p-4 flex justify-center items-center">
            <Button onClick={() => setShowModal(true)}>
              Change interval:&nbsp;
              {intervalValue}
            </Button>
          </div>
          <div className="w-1/5 h-full p-4 flex justify-center items-center">
            <Button onClick={() => setReset(true)}>reset</Button>
          </div>
          <div className="w-1/5 h-full p-4 flex justify-center items-center">
            <Button onClick={() => setPaused(!paused)}>
              <font size="+2">{paused ? 'play!' : 'pause'}</font>
            </Button>
          </div>
          <div className="w-1/5 h-full p-4 flex flex-row flex-nowrap justify-center items-center">
            <div
              className={`${
                step ? 'w-4/5 mr-2' : 'w-full'
              } h-full flex justify-center items-center`}
            >
              <Button onClick={() => setStep(!step)}>Manual step</Button>
            </div>
            <div
              className={`${
                step
                  ? 'flex justify-center items-center w-1/5 h-full'
                  : 'hidden'
              }`}
            >
              <Button onClick={() => setCount(count + 1)} disabled={!step}>
                <font size="+2">+</font>
              </Button>
            </div>
          </div>
          <div className="w-1/5 h-full p-4 flex justify-center items-center">
            <Button type="button" onClick={saveGame}>
              Save game
            </Button>
          </div>
        </div>
      </div>

      {/* grid and generation count */}
      <div className="h-4/5 w-full flex flex-nowrap justify-center items-center flex-1 mb-8 text-white">
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

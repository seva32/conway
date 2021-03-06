/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button } from '../components';

// este componente corresponde a la vista del juego
// tiene los botones para cambiar intervalo, resetear generacion, play/pause,
// step mode (avance manual) y guardar jugada

function Game({ location, match }) {
  // tomar parametros/query string
  const user = match.params.id ? match.params.id : 'User';
  const row = location.search
    ? Number(location.search.split('=')[1].split('&')[0])
    : 4;
  const col = location.search
    ? Number(location.search.split('=')[2].split('&')[0])
    : 4;
  const load =
    location.search &&
    location.search.split('&')[2] &&
    location.search.split('&')[2].includes('load');
  const pattern =
    location.search &&
    location.search.split('&')[2] &&
    location.search.split('&')[2].includes('pattern') &&
    location.search.split('&')[2].split('=')[1];

  // maneja el estado play/pause
  const [paused, setPaused] = React.useState(true);
  // contador de generaciones
  const [count, setCount] = React.useState(0);
  // manejo del estado del modo manual paso a paso
  const [step, setStep] = React.useState(false);
  // reset de generaciones
  const [reset, setReset] = React.useState(false);
  // customizacion del intervalo entre generaciones
  const [intervalValue, setIntervalValue] = React.useState(300);
  // estado del boton de seteo de intervalo
  const [showInterval, setShowInterval] = React.useState(false);
  // referencia a la matriz en componente hijo Grid con el estado de cada celula
  const matrixRef = React.createRef(null);
  // maneja el estado de cargar jugada guardada
  const [loadSavedMatrix, setLoadSavedMatrix] = React.useState(false);

  React.useEffect(() => {
    if (reset) {
      setCount(0);
      setReset(false);
    }
  }, [reset]);

  // cargar jugada guardada en el estado actual
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

  // guardar jugada en localstorage
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
    <div className="w-4/5 mx-auto block relative min-h-screen">
      {/* buttons interval, reset, play/pause, step mode, save */}
      <div className="w-full relative h-48 text-white block">
        <div className="w-full h-24 flex justify-center items-center">
          <h2 className="uppercase relative">{user}</h2>
        </div>

        <div className="w-full h-24 min-h-4rem flex justify-between items-center flex-1">
          {/* change interval value */}
          <div className="w-1/5 h-full p-4 flex flex-row flex-nowrap justify-center items-center">
            <div
              className={`${
                showInterval ? 'w-3/4 mr-6 relative' : 'w-full'
              } h-full flex justify-center items-center`}
            >
              <Button onClick={() => setShowInterval(!showInterval)}>
                {!showInterval && (
                  <span>
                    Change interval:&nbsp;
                    {intervalValue}
                  </span>
                )}
                {showInterval && <span>New interval:&nbsp;</span>}
              </Button>
            </div>
            <div
              className={`${
                showInterval
                  ? 'flex justify-center items-center w-1/4 h-full'
                  : 'hidden'
              }`}
            >
              <input
                value={intervalValue}
                onChange={(e) =>
                  setIntervalValue(parseInt(e.target.value, 10) || 300)
                }
                type="number"
                id="interval"
                name="interval"
                pattern="\d*"
                className="w-full h-full pl-2 rounded-lg bg-pink bg-opacity-60"
                onKeyUp={(e) => {
                  if (e.code === 'Enter' || e.code === 'Escape') {
                    setShowInterval(false);
                  }
                }}
              />
            </div>
          </div>

          {/* reset */}
          <div className="w-1/5 h-full p-4 flex justify-center items-center">
            <Button onClick={() => setReset(true)}>reset</Button>
          </div>

          {/* play - pause */}
          <div className="w-1/5 h-full p-4 flex justify-center items-center">
            <Button onClick={() => setPaused(!paused)} disabled={step}>
              <font size="+1.3">{paused ? 'play!' : 'pause'}</font>
            </Button>
          </div>

          {/* step mode */}
          <div className="w-1/5 h-full p-4 flex flex-row flex-nowrap justify-center items-center">
            <div
              className={`${
                step ? 'w-4/5 mr-6 relative' : 'w-full'
              } h-full flex justify-center items-center`}
            >
              <Button onClick={() => setStep(!step)}>Step mode</Button>
            </div>
            <div
              className={`${
                step
                  ? 'flex justify-center items-center w-1/5 h-full'
                  : 'hidden'
              }`}
            >
              <Button onClick={() => setCount(count + 1)} disabled={!step}>
                <font size="+1">+</font>
              </Button>
            </div>
          </div>

          {/* save */}
          <div className="w-1/5 h-full p-4 flex justify-center items-center">
            <Button type="button" onClick={saveGame}>
              Save game
            </Button>
          </div>
        </div>
      </div>

      {/* grid and generation count */}
      <div
        className={`relative block text-white mx-auto pb-32 w-${
          col < 10 ? `${(col - 1) * 10}vw` : 'w-80vw'
        }`}
      >
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
          pattern={pattern || ''}
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

/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import anime from 'animejs';
import isEmpty from 'lodash.isempty';

import { Card, Label } from '../components';

// componente de pantalla inicial

function Home({ history }) {
  // estado para customizar jugada : nombre
  const [user, setUser] = React.useState('');
  // estado para customizar jugada : filas
  const [row, setRow] = React.useState(null);
  // estado para customizar jugada : columnas
  const [col, setCol] = React.useState(null);
  // maneja del estado del boton para cargar jugada guardada
  const [savedGame, setSavedGame] = React.useState({});
  // maneja el estado para animacion mostrar form para jugada customizada
  const [showForm, setShowForm] = React.useState(false);
  const [submitForm, setSubmitForm] = React.useState(false);
  // maneja el estado del boton para mostrar los datos de la jugada guardada
  const [showSavedGame, setShowSavedGame] = React.useState(false);
  const [submitSavedGame, setSubmitSavedGame] = React.useState(false);
  // mantener referencia de la animacion
  const animationRef = React.useRef(null);

  // animacion para mostrar form
  React.useEffect(() => {
    if (showForm) {
      animationRef.current = anime.timeline({
        duration: 2000,
        easing: 'easeInQuart',
      });

      animationRef.current
        .add({
          targets: '#cards',
          translateX: '110vw',
        })
        .add(
          {
            targets: '#game-form',
            translateX: ['-110vw', '0vw'],
            zIndex: [{ value: 10, duration: 1 }],
          },
          '-=1500',
        );
    }
  }, [showForm]);

  // animacion para regresar css props al valor original
  // y push al juego
  React.useEffect(() => {
    if (submitForm) {
      anime({
        targets: '#cards',
        translateX: '0vw',
        duration: 1,
      });
      anime({
        targets: '#game-form',
        zIndex: -1,
        duration: 1,
      });
      setShowForm(false);
      history.push(
        `/game/${user || 'user'}?row=${row > 4 ? row : 4}&col=${
          col > 4 ? col : 4
        }`,
      );
    }
  }, [setShowForm, col, history, row, submitForm, user]);

  // animacion para mostrar jugada guardada
  React.useEffect(() => {
    if (showSavedGame) {
      const savedUserData = JSON.parse(localStorage.getItem('user')) || {};
      if (savedUserData && savedUserData.savedAt) {
        //  savedUserData: user, row, col, matrix, interval, savedAt
        setSavedGame(savedUserData);
        animationRef.current = anime.timeline({
          duration: 2000,
          easing: 'easeInQuart',
        });

        animationRef.current
          .add({
            targets: '#cards',
            translateX: '110vw',
          })
          .add(
            {
              targets: '#saved-game',
              translateX: ['-110vw', '0vw'],
              zIndex: [{ value: 10, duration: 1 }],
            },
            '-=1500',
          );
      } else {
        // nasty alert :(
        alert('No saved game available');
      }
    }
  }, [showSavedGame]);

  // volver props css al valor original y push al juego
  React.useEffect(() => {
    if (submitSavedGame) {
      anime({
        targets: '#cards',
        translateX: '0vw',
        duration: 1,
      });
      anime({
        targets: '#saved-game',
        zIndex: -1,
        duration: 1,
      });
      setShowSavedGame(false);
      history.push(
        `/game/${savedGame.user || 'user'}?row=${
          savedGame.row > 4 ? savedGame.row : 4
        }&col=${savedGame.col > 4 ? savedGame.col : 4}&load=`,
      );
    }
  }, [history, savedGame.col, savedGame.row, savedGame.user, submitSavedGame]);

  return (
    <div className="w-4/5 min-h-screen mx-auto flex flex-col justify-center items-center -mt-24">
      <div className="w-full mt-24 h-80">
        <h1 className="text-white w-full h-3/5 flex justify-center items-center">
          <span className="uppercase">welcome to&nbsp;</span>
          <span className="font-logo">Game of Life</span>
        </h1>
        <h2 className="text-white w-full h-2/5 flex justify-center items-start">
          Find more INFO about this game
          <span>
            <Link to="/rules">&nbsp;HERE</Link>
          </span>
        </h2>
      </div>
      <div
        className="h-80 w-full flex flex-nowrap justify-center items-center flex-1 pb-16 will-change"
        id="cards"
      >
        <Card
          onClick={() =>
            history.push(
              `/game/${user || 'user'}?row=${row > 4 ? row : 4}&col=${
                col > 4 ? col : 4
              }`,
            )
          }
        >
          <h2 className="uppercase text-white">start new game</h2>
        </Card>
        <Card onClick={() => setShowForm(true)}>
          <h2 className="uppercase text-white">
            <font size="+3" className="block">
              custom
            </font>
            new game
          </h2>
        </Card>
        <Card
          onClick={() =>
            history.push('/game/glider?row=8&col=8&pattern=glider')
          }
        >
          <h2 className="uppercase text-white">load pattern</h2>
        </Card>
        <Card onClick={() => setShowSavedGame(true)}>
          <h2 className="uppercase text-white">load saved game</h2>
        </Card>
      </div>

      {/* form fields */}
      <div
        id="game-form"
        className="h-96 w-3/5 absolute bottom-40 z-negative flex flex-col flex-1 card-inset py-14 will-change"
      >
        <Label textColor="white" htmlFor="user">
          <span className="w-1/2 text-right">Username:&nbsp;</span>
          <input
            className="w-1/2 mr-40 rounded-md px-4 text-black"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Conway"
          />
        </Label>
        <Label textColor="white" htmlFor="row">
          <span className="w-1/2 text-right">Number of rows:&nbsp;</span>
          <input
            className="w-1/2 mr-40 rounded-md px-4 text-black"
            id="row"
            value={!isEmpty(row) ? row : ''}
            onChange={(e) => setRow(e.target.value)}
            placeholder="min 4"
          />
        </Label>
        <Label textColor="white" htmlFor="col">
          <span className="w-1/2 text-right">Number of columns:&nbsp;</span>
          <input
            className="w-1/2 mr-40 rounded-md px-4 text-black"
            id="col"
            value={!isEmpty(col) ? col : ''}
            onChange={(e) => setCol(e.target.value)}
            placeholder="min 4"
          />
        </Label>
        <button
          type="button"
          onClick={() => setSubmitForm(true)}
          className="flex-grow font-button text-white flex flex-row flex-nowrap justify-center items-center w-1/3 final-text-name mx-auto hover:text-black"
        >
          <font size="+2">play</font>
        </button>
      </div>

      {/* saved game info & submit */}
      <div
        id="saved-game"
        className="h-96 w-2/5 absolute bottom-40 z-negative flex flex-col flex-1 card-inset py-14"
      >
        <Label htmlFor="user-saved" textColor="white">
          <span className="w-1/2 text-right">Username:&nbsp;</span>
          <input
            className="w-1/2 mr-40 rounded-md px-4 text-black"
            id="user-saved"
            value={!isEmpty(savedGame) ? savedGame.user : ''}
            readOnly
          />
        </Label>
        <Label htmlFor="date-saved" textColor="white">
          <span className="w-1/2 text-right">Saved at:&nbsp;</span>
          <input
            className="w-1/2 mr-40 rounded-md px-4 text-black"
            id="date-saved"
            value={
              !isEmpty(savedGame)
                ? dayjs(savedGame.savedAt).format('DD-MM-YYYY HH:mm:ss')
                : ''
            }
            readOnly
          />
        </Label>
        <Label htmlFor="matrix-saved" textColor="white">
          <span className="w-1/2 text-right">Matrix size:&nbsp;</span>
          <input
            className="w-1/2 mr-40 rounded-md px-4 text-black"
            id="matrix-saved"
            value={
              !isEmpty(savedGame)
                ? `Rows: ${savedGame.row} - Columns: ${savedGame.col}`
                : ''
            }
            readOnly
          />
        </Label>
        <Label htmlFor="generation-saved" textColor="white">
          <span className="w-1/2 text-right">Generation:&nbsp;</span>
          <input
            className="w-1/2 mr-40 rounded-md px-4 text-black"
            id="generation-saved"
            value={!isEmpty(savedGame) ? savedGame.generation : ''}
            readOnly
          />
        </Label>
        <button
          type="button"
          onClick={() => setSubmitSavedGame(true)}
          className="flex-grow font-button text-white flex flex-row flex-nowrap justify-center items-center w-1/3 final-text-name mx-auto hover:text-black"
        >
          <font size="+2">play</font>
        </button>
      </div>
    </div>
  );
}

Home.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Home;

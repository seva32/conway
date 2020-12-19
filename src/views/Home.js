import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function Home() {
  const [user, setUser] = React.useState('');
  const [row, setRow] = React.useState(0);
  const [col, setCol] = React.useState(0);
  const [savedGame, setSavedGame] = React.useState(null);

  const showSavedGame = () => {
    const savedUserData = JSON.parse(localStorage.getItem('user')) || {};
    if (savedUserData && savedUserData.savedAt) {
      //  savedUserData: user, row, col, matrix, interval, savedAt
      setSavedGame(savedUserData);
    } else {
      alert('No saved games available');
    }
  };

  return (
    <>
      <label htmlFor="user" className="font-subtitle">
        Username:
        <input
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
      <label htmlFor="row">
        Row:
        <input id="row" value={row} onChange={(e) => setRow(e.target.value)} />
      </label>
      <label htmlFor="col">
        Col:
        <input id="col" value={col} onChange={(e) => setCol(e.target.value)} />
      </label>
      <Link
        to={`/game/${user || 'user'}?row=${row > 4 ? row : 4}&col=${
          col > 4 ? col : 4
        }`}
      >
        <button type="button">link al juego</button>
      </Link>
      <button type="button" onClick={showSavedGame}>
        Show saved game
      </button>
      {savedGame && (
        <div className="block">
          <Link
            to={`/game/${savedGame.user || 'user'}?row=${
              savedGame.row > 4 ? savedGame.row : 4
            }&col=${savedGame.col > 4 ? savedGame.col : 4}&load=`}
          >
            <button type="button">
              {savedGame.user} -{' '}
              {dayjs(savedGame.savedAt).format('DD-MM-YYYY HH:mm:ss')}
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;

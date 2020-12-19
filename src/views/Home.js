import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [user, setUser] = React.useState('');
  const [row, setRow] = React.useState(0);
  const [col, setCol] = React.useState(0);

  return (
    <>
      <h1>El home</h1>
      <label htmlFor="user">
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
        to={`/game/${user || 'user'}?row=${row > 0 ? row : 3}&col=${
          col > 0 ? col : 3
        }`}
      >
        <button type="button">link al juego</button>
      </Link>
    </>
  );
}

export default Home;

/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';

import randomKey from '../utils/randomKey';
import nextTick from './Grid.NextTick';
import useInterval from '../utils/useInterval';

function Grid({ row, col }) {
  const [matrix, setMatrix] = React.useState(
    Array.from({ length: row }, () => Array.from({ length: col }, () => false)),
  );

  const [count, setCount] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  React.useEffect(() => {
    if (reset) {
      setCount(0);
      setReset(false);
    }
  }, [reset]);

  // esta funcion escucha eventos sobre cada celula
  const handleChange = (rowIdx, columnIdx) => {
    const copy = [...matrix];
    copy[rowIdx][columnIdx] = !copy[rowIdx][columnIdx];
    setMatrix(copy);
  };

  // esta funcion va a determinar el proximo estado de cada celula
  // segun la vitalidad de cada celula vecina
  const nextGen = () => {
    setMatrix(nextTick(matrix, row, col));
  };

  const intervalRef = useInterval(
    () => {
      if (count < 10) {
        setCount(count + 1);
        nextGen();
      } else {
        window.clearInterval(intervalRef.current);
      }
    },
    paused ? null : 2000,
  );

  return (
    <div>
      <button onClick={() => setPaused(!paused)} type="button">
        pause
      </button>
      <button onClick={() => setReset(true)} type="button">
        reset
      </button>
      <table>
        <tbody>
          {matrix.map((rowMatrix, rowIndex) => (
            <tr key={randomKey()}>
              {rowMatrix.map((_column, columnIndex) => (
                <td key={randomKey()}>
                  <button
                    type="button"
                    onClick={() => handleChange(rowIndex, columnIndex)}
                    className={`${
                      matrix[rowIndex][columnIndex] ? 'bg-lime' : 'bg-united'
                    }`}
                  >
                    {matrix[rowIndex][columnIndex] ? 'true' : 'false'}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Grid.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default Grid;

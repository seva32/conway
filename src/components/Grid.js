/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';

import randomKey from '../utils/randomKey';
import nextTick from './Grid.NextTick';
import useInterval from '../utils/useInterval';
import Cell from './Cell';
import Neon from './Neon';

const Grid = React.forwardRef(
  (
    { row, col, paused, count, setCount, interval, step, loadSavedMatrix },
    ref,
  ) => {
    const [matrix, setMatrix] = React.useState(
      Array.from({ length: row }, () =>
        Array.from({ length: col }, () => false),
      ),
    );

    React.useEffect(() => {
      // eslint-disable-next-line no-param-reassign
      ref.current = matrix;
    }, [ref, matrix]);

    React.useEffect(() => {
      if (loadSavedMatrix) {
        const savedUserData = JSON.parse(localStorage.getItem('user')) || {};
        if (savedUserData && savedUserData.matrix) {
          setMatrix(savedUserData.matrix);
        }
      }
    }, [loadSavedMatrix]);

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
        if (step) {
          nextGen();
        } else if (count < 100000) {
          setCount(count + 1);
          nextGen();
        } else {
          window.clearInterval(intervalRef.current);
        }
      },
      paused ? null : interval,
    );

    const width = 'w-2/5';

    return (
      <div className="w-full max-w-full max-h-full flex justify-center items-center relative mt-16">
        <div className="absolute top-3remneg font-button text-white">
          Generation:&nbsp;
          <font size="+2">{count}</font>
        </div>
        <table className={`table-fixed ${width}`} role="grid">
          <tbody>
            {matrix.map((rowMatrix, rowIndex) => (
              <tr key={randomKey()}>
                {rowMatrix.map((_column, columnIndex) => (
                  <td key={randomKey()} className="relative" roll="gridcell">
                    <div className="relative square-ratio">
                      <Cell
                        onClick={() => handleChange(rowIndex, columnIndex)}
                        life={matrix[rowIndex][columnIndex]}
                      >
                        {matrix[rowIndex][columnIndex] && <Neon />}
                      </Cell>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

Grid.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  paused: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
  step: PropTypes.bool.isRequired,
  loadSavedMatrix: PropTypes.bool.isRequired,
};

export default Grid;

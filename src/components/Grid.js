/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

import randomKey from '../utils/randomKey';
import nextTick from './Grid.NextTick';
import useInterval from '../utils/useInterval';
import Cell from './Cell';
import Neon from './Neon';

const Grid = React.forwardRef(
  (
    {
      row,
      col,
      paused,
      count,
      setCount,
      interval,
      step,
      loadSavedMatrix,
      pattern,
    },
    ref,
  ) => {
    const [matrix, setMatrix] = React.useState(
      Array.from({ length: row }, () =>
        Array.from({ length: col }, () => false),
      ),
    );

    // esta funcion va a determinar el proximo estado de cada celula
    // segun la vitalidad de cada celula vecina
    const nextGen = () => {
      setMatrix(nextTick(matrix, row, col));
    };

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

    React.useEffect(() => {
      if (step && count) {
        nextGen();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, count]);

    React.useEffect(() => {
      if (!isEmpty(pattern)) {
        const copy = [...matrix];
        copy[1][0] = true;
        copy[2][1] = true;
        copy[2][2] = true;
        copy[1][2] = true;
        copy[0][2] = true;
        setMatrix(copy);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // esta funcion escucha eventos sobre cada celula
    const handleChange = (rowIdx, columnIdx) => {
      const copy = [...matrix];
      copy[rowIdx][columnIdx] = !copy[rowIdx][columnIdx];
      setMatrix(copy);
    };

    const intervalRef = useInterval(
      () => {
        if (count < 100000) {
          setCount(count + 1);
          nextGen();
        } else {
          window.clearInterval(intervalRef.current);
        }
      },
      paused ? null : interval,
    );

    const width = 'w-full';

    return (
      <div className="w-full max-w-full flex justify-center items-start pt-20">
        <div className="absolute top-8 font-button text-white">
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
  pattern: PropTypes.string.isRequired,
};

export default Grid;

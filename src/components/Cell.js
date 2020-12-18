import React from 'react';
import PropTypes from 'prop-types';

function Cell({ life }) {
  return (
    <button
      className={`inline ${life ? 'text-united' : 'text-space'} bg-lime`}
      type="button"
    >
      Im a cell
    </button>
  );
}

Cell.propTypes = {
  life: PropTypes.bool,
};

Cell.defaultProps = {
  life: false,
};

export default Cell;

import React from 'react';
import PropTypes from 'prop-types';

function Cell({ life, onClick, children }) {
  return (
    <button
      className={`min-w-20px min-h-20px w-5 h-5 m-1 rounded-md flex justify-center items-center ${
        life ? 'bg-black m-0 scale-150' : 'bg-grey scale-100'
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Cell.propTypes = {
  life: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Cell.defaultProps = {
  life: false,
  onClick: () => {},
};

export default Cell;

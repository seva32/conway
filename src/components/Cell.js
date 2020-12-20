import React from 'react';
import PropTypes from 'prop-types';

function Cell({ life, onClick, children }) {
  return (
    <button
      className={`rounded-full flex justify-center items-center ${
        life ? 'bg-black m-0' : 'bg-grey scale-100'
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

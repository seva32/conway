import React from 'react';
import PropTypes from 'prop-types';

function Cell({ life, onClick, children }) {
  return (
    <button
      className={`inline ${life ? 'text-united' : 'text-space'} bg-lime`}
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

import React from 'react';
import PropTypes from 'prop-types';

function Card({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full h-32 md:h-80 m-8"
    >
      <div className="w-full h-full bg-black bg-opacity-60 absolute inset-0 rounded-lg flex justify-center items-center p-4 card-inset">
        {children}
      </div>
    </button>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;

import React from 'react';
import PropTypes from 'prop-types';

function Label({ children, textColor, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex-grow font-subtitle text-${textColor} flex flex-row flex-nowrap justify-center items-center`}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  textColor: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

export default Label;

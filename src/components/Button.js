import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, submit, onClick, disabled }) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      className="w-full h-16 button-inset flex justify-center items-center font-button glowing-box-smaller"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  submit: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  submit: false,
  onClick: () => {},
  disabled: false,
};

export default Button;

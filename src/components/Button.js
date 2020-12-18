import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, submit }) {
  return (
    <div>
      <button type={submit ? 'submit' : 'button'}>{children}</button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  submit: PropTypes.bool,
};

Button.defaultProps = {
  submit: false,
};

export default Button;

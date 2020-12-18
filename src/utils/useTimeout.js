import React from 'react';

function useTimeout(callback, delay) {
  const timeoutRef = React.useRef();
  const callbackRef = React.useRef(callback);

  // Remember the latest callback:
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the timeout:
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (typeof delay === 'number' && process.env.WEBPACK) {
      timeoutRef.current = window.setTimeout(
        () => callbackRef.current(),
        delay,
      );

      // Clear timeout if the components is unmounted or the delay changes:
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  // In case you want to manually clear the timeout from the consuming component...:
  return timeoutRef;
}

export default useTimeout;

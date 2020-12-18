import React from 'react';

function useInterval(callback, delay) {
  const intervalRef = React.useRef();
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(
        () => callbackRef.current(),
        delay,
      );

      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
}

export default useInterval;

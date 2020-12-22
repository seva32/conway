import React from 'react';
import { useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <div className="w-4/5 mx-auto block relative min-h-screen -mb-24">
      <div className="w-full h-60">
        <h1 className="text-white w-full h-3/5 flex justify-center items-center">
          <span className="font-logo">Game of Life</span>
        </h1>
        <h2 className="text-white w-full h-2/5 flex justify-center items-start">
          No match for <code>{location.pathname}</code>
        </h2>
      </div>
    </div>
  );
}

export default NotFound;

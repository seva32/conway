import React from 'react';

import Neon from '../components/Neon';

function About() {
  return (
    <div className="w-4/5 mx-auto block relative min-h-screen -mb-24">
      <div className="w-full h-60">
        <h1 className="text-white w-full h-3/5 flex justify-center items-center">
          <span className="font-logo">Game of Life</span>
        </h1>
        <h2 className="text-white w-full h-2/5 flex justify-center items-start mb-8">
          Resources
        </h2>
      </div>
      <div className="max-w-full h-72 relative flex flex-col justify-between items-center text-white font-body font-2rem">
        <div className="w-full h-1/3 text-center">
          <a
            href="https://github.com/seva32/conway"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <div className="w-full h-1/3 text-center">
          <a href="https://www.figma.com" rel="noreferrer" target="_blank">
            Figma
          </a>
        </div>
        <div className="w-1/5 h-20 relative">
          <div className="absolute square-ratio w-full">
            <Neon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

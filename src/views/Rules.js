import React from 'react';

function Rules() {
  return (
    <div className="w-4/5 mx-auto flex flex-col justify-between flex-1 relative h-screen -mb-24">
      <div className="w-full h-60">
        <h1 className="text-white w-full h-3/5 flex justify-center items-center">
          <span className="font-logo">Game of Life</span>
        </h1>
        <h2 className="text-white w-full h-2/5 flex justify-center items-start">
          Learn about the rules in this game
        </h2>
      </div>
      <div className="text-white font-body-big sm:font-body md:font-body-big  flex-grow flex flex-col justify-start mx-auto whitespace-pre-line w-full break-words tracking-wider leading-relaxed">
        <p className="pb-5 sm:pb-2 md:pb-4 lg:pb-6">
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, live or dead, (or populated and unpopulated,
          respectively).
        </p>
        <p className="pb-5 sm:pb-2 md:pb-4 lg:pb-6">
          Every cell interacts with its eight neighbours, which are the cells
          that are horizontally, vertically, or diagonally adjacent. At each
          step in time, the following transitions occur:
        </p>
        <div>
          <span className="text-pink inline">&rsaquo;&rsaquo;</span> Any live
          cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </div>
        <br />
        <div>
          <span className="text-pink inline">&rsaquo;&rsaquo;</span> Any live
          cell with two or three live neighbours lives on to the next
          generation.
        </div>
        <br />
        <div>
          <span className="text-pink inline">&rsaquo;&rsaquo;</span> Any live
          cell with more than three live neighbours dies, as if by
          overpopulation.
        </div>
        <br />
        <div>
          <span className="text-pink inline">&rsaquo;&rsaquo;</span> Any dead
          cell with exactly three live neighbours becomes a live cell, as if by
        </div>
        reproduction.
        <br />
        <p className="pt-5 sm:pt-2 md:pt-4 lg:pt-6">
          These rules, which compare the behavior of the automaton to real life,
          can be condensed into the following:
        </p>
        <br />
        <div>
          <span className="text-pink inline">&rsaquo;&rsaquo;</span> Any live
          cell with two or three live neighbours survives.
        </div>
        <br />
        <div>
          <span className="text-pink inline">&rsaquo;&rsaquo;</span> Any dead
          cell with three live neighbours becomes a live cell.
        </div>
        <br />
        <div>
          <span className="text-pink inline">&rsaquo;&rsaquo;</span> All other
          live cells die in the next generation.
        </div>
        <br />
        <p className="pt-5 sm:pt-2 md:pt-4 lg:pt-6">
          Similarly, all other dead cells stay dead. The initial pattern
          constitutes the seed of the system.
        </p>
      </div>
    </div>
  );
}

export default Rules;

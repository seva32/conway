import React from 'react';

function Rules() {
  return (
    <div className="w-4/5 mx-auto block relative min-h-screen -mb-24">
      <div className="w-full h-60">
        <h1 className="text-white w-full h-3/5 flex justify-center items-center">
          <span className="font-logo">Game of Life</span>
        </h1>
        <h2 className="text-white w-full h-2/5 flex justify-center items-start">
          Learn about the rules in this game
        </h2>
      </div>
      <div className="text-pink font-body block mx-auto whitespace-pre-line w-3/5 break-words h-full tracking-wider leading-9">
        The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, live or dead, (or populated and unpopulated, respectively).
        <br />
        Every cell interacts with its eight neighbours, which are the cells that
        are horizontally, vertically, or diagonally adjacent. At each step in
        time, the following transitions occur:
        <br />
        * Any live cell with fewer than two live neighbours dies, as if by
        underpopulation.
        <br />
        * Any live cell with two or three live neighbours lives on to the next
        generation.
        <br />
        * Any live cell with more than three live neighbours dies, as if by
        overpopulation.
        <br />
        * Any dead cell with exactly three live neighbours becomes a live cell,
        as if by reproduction.
        <br />
        These rules, which compare the behavior of the automaton to real life,
        can be condensed into the following:
        <br />
        * Any live cell with two or three live neighbours survives.
        <br />
        * Any dead cell with three live neighbours becomes a live cell.
        <br />
        * All other live cells die in the next generation.
        <br />
        Similarly, all other dead cells stay dead. The initial pattern
        constitutes the seed of the system.
      </div>
    </div>
  );
}

export default Rules;

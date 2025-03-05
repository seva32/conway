/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React from 'react';
import anime from 'animejs';

function Neon() {
  React.useEffect(() => {
    const pathEls = document.querySelectorAll(
      '.neon-wrapper .neon svg path:last-child',
    );

    for (let i = 0; i < pathEls.length; i++) {
      const pathEl = pathEls[i];
      const offset = anime.setDashoffset(pathEl);
      pathEl.setAttribute('stroke-dashoffset', offset);
      anime({
        targets: pathEl,
        strokeDashoffset: [offset, 100],
        duration: anime.random(3000, 6000),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: true,
      });
    }
  }, []);

  return (
    <div className="neon-wrapper w-full relative">
      <div className="neon relative square-ratio">
        <svg
          version="1.1"
          height="400"
          width="400"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="circlefilter">
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="10"
                result="desenfoque"
              />
              <feFlood floodColor="#2df5ff" />
              <feComposite in2="desenfoque" operator="in" />
              <feOffset dx="0" dy="0" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            className="st0 letter"
            d="M 120 120 A 50 50 0 1 1 280 280 A 50 50 0 1 1 115 126 L 133 143 A 50 50 0 1 0 262 261 A 50 50 0 1 0 139 139 Z"
          />
          <path
            className="st1"
            d="M 120 120 A 50 50 0 1 1 280 280 A 50 50 0 1 1 115 126 L 133 143 A 50 50 0 1 0 262 261 A 50 50 0 1 0 139 139 Z"
          />
        </svg>
      </div>
    </div>
  );
}

Neon.propTypes = {};

export default Neon;

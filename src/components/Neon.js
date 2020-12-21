/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import './Neon.css';

function Neon(props) {
  React.useEffect(() => {
    const pathEls = document.querySelectorAll(
      '.neon-wrapper .neon svg g g path',
    );
    for (let i = 0; i < pathEls.length; i++) {
      const pathEl = pathEls[i];
      const offset = anime.setDashoffset(pathEl);
      pathEl.setAttribute('stroke-dashoffset', offset);
      anime({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: anime.random(1000, 3000),
        delay: anime.random(0, 0),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: true,
      });
    }

    const letterEls = document.querySelectorAll('.letter');
    for (let i = 0; i < letterEls.length; i++) {
      const letterEl = letterEls[i];
      const offset = anime.setDashoffset(letterEl);
      letterEl.setAttribute('stroke-dashoffset', offset);
      anime({
        targets: letterEl,
        duration: anime.random(0, 1000),
        delay: anime.random(0, 300),
        opacity: [{ value: 0, duration: anime.random(0, 300) }],
        loop: true,
      });
    }
  }, []);
  return (
    <div>
      <div className="neon-wrapper">
        <div className="neon">
          <svg version="1.1" id="BG" x="0px" y="0px" viewBox="0 0 400 400">
            <g>
              <g>
                <path
                  className="st0 letter will-change"
                  id="N"
                  d="M 120 120 A 50 50 0 1 1 280 280 A 50 50 0 1 1 115 126 L 133 143 A 50 50 0 1 0 262 261 A 50 50 0 1 0 139 139 Z"
                />
              </g>
              <g>
                <path
                  className="st1"
                  d="M 120 120 A 50 50 0 1 1 280 280 A 50 50 0 1 1 115 126 L 133 143 A 50 50 0 1 0 262 261 A 50 50 0 1 0 139 139 Z"
                />
              </g>
              <g>
                <path
                  className="st2"
                  d="M 20 20 L 380 20 L 380 380 L 20 380 L 20 60 L 60 60 L 60 340 L 340 340 L 340 60 L 20 60 Z"
                />
              </g>
              <g>
                <path
                  className="st3"
                  d="M 20 20 L 380 20 L 380 380 L 20 380 L 20 60 L 60 60 L 60 340 L 340 340 L 340 60 L 20 60 Z"
                />
              </g>
              <g>
                <path
                  className="st4"
                  d="M 20 20 L 380 20 L 380 380 L 20 380 L 20 60 L 60 60 L 60 340 L 340 340 L 340 60 L 20 60 Z"
                />
              </g>
              <g>
                <path
                  className="st5"
                  d="M 20 20 L 380 20 L 380 380 L 20 380 L 20 60 L 60 60 L 60 340 L 340 340 L 340 60 L 20 60 Z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

Neon.propTypes = {};

export default Neon;

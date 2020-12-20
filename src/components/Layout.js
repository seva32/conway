import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import anime from 'animejs';

function Layout({ children }) {
  const animationRef = React.useRef(null);
  const [hideHero, setHideHero] = React.useState(false);

  React.useEffect(() => {
    const textWrapper = document.querySelector(
      '.hero-style .hero-container .hero-text',
    );
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<div class='hero-letter font-20rem flex justify-center items-center'>$&</div>",
    );

    animationRef.current = anime.timeline({
      duration: 2000,
    });

    animationRef.current
      .add({
        targets: '.hero-style .hero-container .hero-text .hero-letter',
        scale: [
          { value: 0.001, duration: 1 },
          { value: 1, duration: 300 },
        ],
        opacity: [
          { value: 0, duration: 1 },
          { value: 1, duration: 300 },
          { value: 0, duration: 50 },
        ],
        easing: 'easeOutExpo',
        delay: (el, i) => 200 * i,
      })
      .add(
        {
          targets: '.hero-style .hero-container .final-text',
          scale: [0.005, 4],
          opacity: [0, 1],
          translateY: '-1vw',
          rotateZ: '-5deg',
          complete(_anim) {
            anime({
              targets: '.hero-style',
              translateY: '-100vh',
              translateZ: 0,
              duration: 2500,
              zIndex: -1,
              delay: 1000,
              easing: 'easeInCubic',
              complete(_ani) {
                setHideHero(true);
              },
            });
          },
        },
        '-=100',
      );
  }, []);

  const hero = () => (
    <div className={`hero-style ${hideHero ? 'hidden' : 'flex'} w-full`}>
      <div className="hero-container">
        <div className="hero-circle" />
        <div className="hero-frame" />
        <div className="hero-text">Game of Life</div>
        <div className="final-text final-text-name font-logo">Game of Life</div>
      </div>
    </div>
  );

  return (
    <>
      {hero()}
      <div className="layout-container bg-black" id="layout">
        <nav className="w-4/5 h-24 mx-auto flex justify-between items-center">
          <ul className="w-1/3 flex flex-nowrap justify-between items-center text-white font-link uppercase">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rules">Rules</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <div className="font-logo font-2rem text-white final-text-name">
            Game of Life
          </div>
        </nav>
        <hr className="text-white" />
        {children}
        <footer className="layout-footer h-16 flex justify-center items-center border-white border-t font-body text-white">
          sebastianfantini.com - 2020
        </footer>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;

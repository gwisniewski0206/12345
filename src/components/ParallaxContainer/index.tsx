import React from 'react';
import useParallaxEffect from '../../hooks/useParallaxEffect';
import './index.css';

const ParallaxContainer: React.FC = () => {
  // Activate the parallax effect when the component mounts
  useParallaxEffect();

  return (
    <div className="parallax-container">
      <div className="logo">
        <img
          src="https://t2consult.de/wp-content/uploads/2024/08/t2consult-vector-neu-blauer-rand.png"
          alt="T2Consult Logo"
        />
      </div>
      <div className="triangle triangle1" />
      <div className="triangle triangle2" />
      <div className="triangle triangle3" />
      <div className="triangle triangle4" />
      <div className="triangle triangle5" />
      <div className="triangle triangle6" />
    </div>
  );
};

export default ParallaxContainer;

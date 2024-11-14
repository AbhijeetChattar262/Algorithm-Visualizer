import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Searching.css';

const Visualization = ({ algorithm }) => {
  const size = 20;
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(200);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const generateArray = () => {
    const newArray = Array.from({ length: size }, (_, idx) => ({
      value: Math.floor(Math.random() * 100) + 1,
      id: idx,
    }));
    setArray(newArray);
    setAnimations([]);
    setIsSearching(false);
    setCurrentIndex(-1);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const animate = async () => {
    for (let i = 0; i < animations.length; i++) {
      const { index, type } = animations[i];
      setCurrentIndex(index);

      if (type === 'search') {
        await delay(animationSpeed);
      }
    }

    setIsSearching(false);
  };

  const handleSearch = () => {
    setIsSearching(true);
    const searchAlgorithm = algorithms[algorithm];
    const moves = searchAlgorithm(array);
    setAnimations(moves);
  };

  useEffect(() => {
    if (isSearching && animations.length > 0) {
      animate();
    }
  }, [animations, isSearching]);

  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  };

  const getBarColor = (idx) => {
    if (idx === currentIndex) return 'blue'; // Current index being compared
    return 'turquoise';
  };

  return (
    <div className="visualization">
      <div className="array-container">
        {array.map((item, idx) => (
          <motion.div
            className="array-bar"
            key={item.id}
            layout
            transition={spring}
            style={{
              height: `${item.value}%`,
              backgroundColor: getBarColor(idx),
            }}
          ></motion.div>
        ))}
      </div>
      <div className="controls">
        <button onClick={generateArray} disabled={isSearching}>
          Generate New Array
        </button>
        <button onClick={handleSearch} disabled={isSearching}>
          Start Search
        </button>
        <div className="speed-control">
          <label>Speed:</label>
          <span>Slow</span>
          <input
            type="range"
            min="150"
            max="1500"
            step="50"
            value={1500 - animationSpeed}
            onChange={(e) => setAnimationSpeed(1500 - Number(e.target.value))}
            disabled={isSearching}
          />
          <span>Fast</span>
        </div>
      </div>
    </div>
  );
};

export default Visualization;

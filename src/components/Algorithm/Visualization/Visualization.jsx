import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Visualization.css';
import algorithms from '../../../algorithms/sorting';

const Visualization = ({ algorithm }) => {
  const size = 20;
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(200);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);

  const generateArray = () => {
    const newArray = Array.from({ length: size }, (_, idx) => ({
      value: Math.floor(Math.random() * 100) + 1,
      id: idx
    }));
    setArray(newArray);
    setAnimations([]);
    setIsSorting(false);
    setComparing([]);
    setSwapping([]);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const animate = async () => {
    const newArray = [...array];
    
    for (let i = 0; i < animations.length; i++) {
      const { indices, type } = animations[i];
      
      if (type === 'compare') {
        setComparing(indices);
        await delay(animationSpeed);
      } else if (type === 'swap') {
        setSwapping(indices);
        [newArray[indices[0]], newArray[indices[1]]] =
        [newArray[indices[1]], newArray[indices[0]]];
        setArray([...newArray]);
        await delay(animationSpeed);
        setSwapping([]);
      }
      setComparing([]);
    }
    setIsSorting(false);
  };

  const handleSort = () => {
    setIsSorting(true);
    const sortingAlgorithm = algorithms[algorithm];
    const moves = sortingAlgorithm(array);
    setAnimations(moves);
  };

  useEffect(() => {
    if (isSorting && animations.length > 0) {
      animate();
    }
  }, [animations, isSorting]);

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
  };

  const getBarClassName = (idx) => {
    const baseClass = 'array-bar';
    if (comparing.includes(idx)) return `${baseClass} comparing`;
    if (swapping.includes(idx)) return `${baseClass} swapping`;
    return baseClass;
  };

  return (
    <div className="visualization-container">
      <div className="array-container">
        {array.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            transition={spring}
            className={getBarClassName(idx)}
            style={{ height: `${item.value}%` }}
          >
            {/* Separate div for the label */}
            <div className="bar-label">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="controls">
        <button
          onClick={generateArray}
          disabled={isSorting}
          className="button generate"
        >
          Generate New Array
        </button>
        <button
          onClick={handleSort}
          disabled={isSorting}
          className="button sort"
        >
          Start Sort
        </button>
      </div>
      
      <div className="speed-control">
        <span>Speed:</span>
        <span>Slow</span>
        <input
          type="range"
          min="0"
          max="1400"
          value={1500 - animationSpeed}
          onChange={(e) => setAnimationSpeed(1500 - Number(e.target.value))}
          disabled={isSorting}
          className="speed-slider"
        />
        <span>Fast</span>
      </div>
    </div>
  );
};

export default Visualization;
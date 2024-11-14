import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Visualization.css';
import algorithms from '../../../algorithms/sorting';

const Visualization = ({ algorithm }) => {
  const size = 20;
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(200);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  
  // Use refs to maintain latest state in async functions
  const isPausedRef = useRef(isPaused);
  const currentStepRef = useRef(currentStep);
  const arrayRef = useRef(array);

  // Keep refs in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
    currentStepRef.current = currentStep;
    arrayRef.current = array;
  }, [isPaused, currentStep, array]);

  const generateArray = () => {
    const newArray = Array.from({ length: size }, (_, idx) => ({
      value: Math.floor(Math.random() * 100) + 1,
      id: idx,
    }));
    setArray(newArray);
    setAnimations([]);
    setIsSorting(false);
    setIsPaused(false);
    setComparing([]);
    setSwapping([]);
    setCurrentStep(0);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const animate = async () => {
    if (currentStepRef.current >= animations.length) {
      setIsSorting(false);
      return;
    }

    while (currentStepRef.current < animations.length && !isPausedRef.current) {
      const { indices, type } = animations[currentStepRef.current];
      const newArray = [...arrayRef.current];

      if (type === 'compare') {
        setComparing(indices);
        await delay(animationSpeed);
      } else if (type === 'swap') {
        setSwapping(indices);
        [newArray[indices[0]], newArray[indices[1]]] = [
          newArray[indices[1]],
          newArray[indices[0]],
        ];
        setArray(newArray);
        await delay(animationSpeed);
        setSwapping([]);
      }
      setComparing([]);
      setCurrentStep(prev => prev + 1);
    }

    if (currentStepRef.current >= animations.length) {
      setIsSorting(false);
    }
  };

  const handleSort = () => {
    setIsSorting(true);
    setIsPaused(false);
    setCurrentStep(0);
    const sortingAlgorithm = algorithms[algorithm];
    const moves = sortingAlgorithm(array);
    setAnimations(moves);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    // Clear all states
    setIsSorting(false);
    setIsPaused(false);
    setComparing([]);
    setSwapping([]);
    setCurrentStep(0);
    setAnimations([]); // Clear existing animations
    generateArray();
  };

  const handleStep = async () => {
    if (currentStep < animations.length) {
      const { indices, type } = animations[currentStep];
      const newArray = [...array];

      if (type === 'compare') {
        setComparing(indices);
        await delay(animationSpeed);
        setComparing([]);
      } else if (type === 'swap') {
        setSwapping(indices);
        [newArray[indices[0]], newArray[indices[1]]] = [
          newArray[indices[1]],
          newArray[indices[0]],
        ];
        setArray(newArray);
        await delay(animationSpeed);
        setSwapping([]);
      }

      setCurrentStep(prev => prev + 1);
      if (currentStep + 1 >= animations.length) {
        setIsSorting(false);
      }
    }
  };

  // Single useEffect to handle animation state
  useEffect(() => {
    if (isSorting && !isPaused) {
      animate();
    }
  }, [isSorting, isPaused, animations]);

  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 300,
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
            <div className="bar-label">{item.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="controls">
        <button 
          onClick={generateArray} 
          disabled={isSorting && !isPaused} 
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
        <button 
          onClick={handlePause} 
          disabled={!isSorting || isPaused} 
          className="button pause"
        >
          Pause
        </button>
        <button 
          onClick={handleResume} 
          disabled={!isSorting || !isPaused} 
          className="button resume"
        >
          Resume
        </button>
        <button 
          onClick={handleReset} 
          disabled={isSorting && !isPaused}
          className="button reset"
        >
          Reset
        </button>
        <button
          onClick={handleStep}
          disabled={isSorting && !isPaused || currentStep >= animations.length}
          className="button step"
        >
          Step
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
          disabled={isSorting && !isPaused}
          className="speed-slider"
        />
        <span>Fast</span>
      </div>
    </div>
  );
};

export default Visualization;
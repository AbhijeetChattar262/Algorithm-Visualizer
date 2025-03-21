import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import styles from "./Visualization.module.css";
import algorithms from "../../../algorithms/sorting";
import SpeedControl from "../../UI/SpeedControl/SpeedControl";
import VisualizationContainer from "../../UI/VisualizationContainer/VisualizationContainer";

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
  const [messageLog, setMessageLog] = useState([]);
  const [pivot, setPivot] = useState([]); // Add new state for pivot
  const [sorted, setSorted] = useState([]); // New state
  const [subarray, setSubarray] = useState([]); // New state
  const [partition, setPartition] = useState([]); // New state
  const messageLogRef = useRef(null);

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
    setMessageLog([]);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const scrollToBottom = () => {
    if (messageLogRef.current) {
      messageLogRef.current.scrollTo({
        top: messageLogRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const animate = async () => {
    if (currentStepRef.current >= animations.length) {
      setIsSorting(false);
      return;
    }

    while (currentStepRef.current < animations.length && !isPausedRef.current) {
      const { indices, type, message } = animations[currentStepRef.current];
      const newArray = [...arrayRef.current];

      setMessageLog((prevLog) => {
        const newLog = [...prevLog, message];
        return newLog;
      });

      if (type === "pivot") {
        setPivot(indices);
        await delay(animationSpeed);
      } else if (type === "compare") {
        setPivot([]);
        setComparing(indices);
        await delay(animationSpeed);
        setComparing([]);
      } else if (type === "swap") {
        setPivot([]);
        setSwapping(indices);
        [newArray[indices[0]], newArray[indices[1]]] = [
          newArray[indices[1]],
          newArray[indices[0]],
        ];
        setArray(newArray);
        await delay(animationSpeed);
        setSwapping([]);
      } else if (type === "sorted") {
        setSorted(indices);
        await delay(animationSpeed);
        setSorted([]);
      } else if (type === "subarray") {
        setSubarray(indices);
        await delay(animationSpeed);
        setSubarray([]);
      } else if (type === "partition") {
        setPartition(indices);
        await delay(animationSpeed);
        setPartition([]);
      }
      setCurrentStep((prev) => prev + 1);
      currentStepRef.current += 1; // Ensure the ref is updated
      scrollToBottom();
    }

    if (currentStepRef.current >= animations.length) {
      setIsSorting(false);
      setMessageLog((prevLog) => {
        const newLog = [...prevLog, "✅ Sorting completed!"];
        return newLog;
      });
      toast.success(
        "Sorting completed! Please generate new array to begin visualization",
        {
          position: "top-right",
          autoClose: 5000,
          style: { backgroundColor: "black" },
        }
      );
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
    setAnimations([]);
    generateArray();
    setMessageLog([]);
    setPivot([]); // Clear pivot state
  };

  const handleStep = async () => {
    if (currentStep < animations.length) {
      const { indices, type, message } = animations[currentStep];
      const newArray = [...array];

      // Reset all visual states at the start of each step
      setPivot([]);
      setComparing([]);
      setSwapping([]);
      setSorted([]);
      setSubarray([]);
      setPartition([]);

      if (type === "pivot") {
        setPivot(indices);
        await delay(animationSpeed);
      } else if (type === "compare") {
        setComparing(indices);
        await delay(animationSpeed);
      } else if (type === "swap") {
        setSwapping(indices);
        [newArray[indices[0]], newArray[indices[1]]] = [
          newArray[indices[1]],
          newArray[indices[0]],
        ];
        setArray(newArray);
        await delay(animationSpeed);
      } else if (type === "sorted") {
        setSorted(indices);
        await delay(animationSpeed);
      } else if (type === "subarray") {
        setSubarray(indices);
        await delay(animationSpeed);
      } else if (type === "partition") {
        setPartition(indices);
        await delay(animationSpeed);
      }

      setMessageLog((prevLog) => {
        const newLog = [...prevLog, message];
        return newLog;
      });
      setCurrentStep((prev) => prev + 1);

      if (currentStep + 1 >= animations.length) {
        setIsSorting(false);
        setMessageLog((prevLog) => [...prevLog, "✅ Sorting completed!"]);
      }
      scrollToBottom();
    }
  };

  // Single useEffect to handle animation state
  useEffect(() => {
    if (isSorting && !isPaused) {
      animate();
    }
  }, [isSorting, isPaused, animations]);

  useEffect(() => {
    scrollToBottom();
  }, [messageLog]);

  useEffect(() => {
    handleReset();
  }, [algorithm]);

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
  };

  const getBarClassName = (idx) => {
    const baseClass = styles.arrayBar;
    if (comparing.includes(idx)) return `${baseClass} ${styles.comparing}`;
    if (swapping.includes(idx)) return `${baseClass} ${styles.swapping}`;
    if (pivot.includes(idx)) return `${baseClass} ${styles.pivot}`;
    if (sorted.includes(idx)) return `${baseClass} ${styles.sorted}`;
    if (subarray.includes(idx)) return `${baseClass} ${styles.subarray}`;
    if (partition.includes(idx)) return `${baseClass} ${styles.partition}`;
    return baseClass;
  };

  return (
    <VisualizationContainer title="Sorting Visualization">
      <motion.div
        className={styles.visualizationContainer}
        layout
        transition={spring}
      >
        <div className={styles.visualizationContent}>
          <motion.div
            className={styles.arrayContainer}
            layout
            transition={spring}
          >
            {array.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                transition={spring}
                className={getBarClassName(idx)}
                style={{ height: `${item.value}%` }}
              >
                <div className={styles.barLabel}>{item.value}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.messageLogContainer}
            layout
            transition={spring}
          >
            <h4 className={styles.messageLogHeader}>Algorithm Steps</h4>
            <div className={styles.messageLog} ref={messageLogRef}>
              {messageLog.map((msg, index) => (
                <div key={index} className={styles.logEntry}>
                  Step {index + 1} : {msg}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Controls moved below the visualization content */}
        <motion.div className={styles.controls} layout transition={spring}>
          <button
            onClick={generateArray}
            disabled={isSorting && !isPaused}
            className={`${styles.button} ${styles.generate}`}
          >
            Generate New Array
          </button>
          <button
            onClick={handleSort}
            disabled={isSorting}
            className={`${styles.button} ${styles.sort}`}
          >
            Start Sort
          </button>
          <button
            onClick={handlePause}
            disabled={!isSorting || isPaused}
            className={`${styles.button} ${styles.pause}`}
          >
            Pause
          </button>
          <button
            onClick={handleResume}
            disabled={!isSorting || !isPaused}
            className={`${styles.button} ${styles.resume}`}
          >
            Resume
          </button>
          <button
            onClick={handleReset}
            disabled={isSorting && !isPaused}
            className={`${styles.button} ${styles.reset}`}
          >
            Reset
          </button>
          <button
            onClick={handleStep}
            disabled={
              (isSorting && !isPaused) || currentStep >= animations.length
            }
            className={`${styles.button} ${styles.step}`}
          >
            Step
          </button>
        </motion.div>

        <SpeedControl
          value={1500 - animationSpeed}
          onChange={(value) => setAnimationSpeed(1500 - value)}
          min={0}
          max={1400}
          disabled={isSorting && !isPaused}
          isReversed={false}
          className={styles.speedControlWrapper}
        />

        <ToastContainer />
      </motion.div>
    </VisualizationContainer>
  );
};

export default Visualization;

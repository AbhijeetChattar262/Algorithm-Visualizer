import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SearchingVisualizer.module.css";
import SpeedControl from "../UI/SpeedControl/SpeedControl";
import MessageLog from "../UI/MessageLog/MessageLog";
import VisualizationContainer from "../UI/VisualizationContainer/VisualizationContainer";

const SearchingVisualizer = ({ algorithm }) => {
  const [array, setArray] = useState([]);
  const [targetValue, setTargetValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [speed, setSpeed] = useState(500);
  const [messages, setMessages] = useState([]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  const messageLogRef = useRef(null);
  const isPausedRef = useRef(isPaused);

  // Keep ref in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    generateNewArray();
  }, [algorithm]);

  const generateNewArray = () => {
    // For binary search, create a sorted array
    if (algorithm === "binary_search") {
      const newArray = Array.from(
        { length: 15 },
        (_, i) => i * 5 + Math.floor(Math.random() * 5)
      ).sort((a, b) => a - b);
      setArray(newArray);
    } else {
      // For linear search, create a random array
      const newArray = Array.from({ length: 15 }, () =>
        Math.floor(Math.random() * 100)
      );
      setArray(newArray);
    }

    // Reset state
    setTargetValue("");
    setIsSearching(false);
    setIsPaused(false);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setMessages([]);
    setHighlightedIndices([]);
  };

  const scrollToBottom = () => {
    if (messageLogRef.current) {
      messageLogRef.current.scrollTo({
        top: messageLogRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const linearSearch = async () => {
    setIsSearching(true);
    setFoundIndex(-1);
    setMessages([`Starting Linear Search for value: ${targetValue}`]);

    for (let i = 0; i < array.length; i++) {
      // Check if search is paused
      while (isPausedRef.current) {
        await delay(100);
      }

      setCurrentIndex(i);
      setMessages((prev) => [
        ...prev,
        `Checking element at index ${i}: ${array[i]}`,
      ]);

      await delay(speed);

      if (array[i] === parseInt(targetValue)) {
        setFoundIndex(i);
        setMessages((prev) => [...prev, `Found ${targetValue} at index ${i}!`]);
        toast.success(`Found ${targetValue} at index ${i}!`, {
          position: "top-right",
          autoClose: 5000,
          style: { backgroundColor: "black" },
        });
        setIsSearching(false);
        return;
      }
    }

    setMessages((prev) => [...prev, `${targetValue} not found in the array`]);
    toast.error(`${targetValue} not found in the array`, {
      position: "top-right",
      autoClose: 5000,
      style: { backgroundColor: "black" },
    });
    setIsSearching(false);
  };

  const binarySearch = async () => {
    setIsSearching(true);
    setFoundIndex(-1); // Reset found index
    setMessages([`Starting Binary Search for value: ${targetValue}`]);

    let left = 0;
    let right = array.length - 1;

    // Create an array to track visited indices
    const visitedIndices = [];

    while (left <= right) {
      // Check if search is paused
      while (isPausedRef.current) {
        await delay(100);
      }

      const mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      visitedIndices.push(mid);

      // Update state to show which indices have been visited
      setHighlightedIndices([...visitedIndices]);

      setMessages((prev) => [...prev, `Calculating mid point: ${mid}`]);
      setMessages((prev) => [
        ...prev,
        `Comparing ${array[mid]} with target ${targetValue}`,
      ]);

      await delay(speed);

      if (array[mid] === parseInt(targetValue)) {
        setCurrentIndex(-1); // Clear current index highlight
        setFoundIndex(mid); // Set the found index explicitly
        setMessages((prev) => [
          ...prev,
          `Found ${targetValue} at index ${mid}!`,
        ]);
        toast.success(`Found ${targetValue} at index ${mid}!`, {
          position: "top-right",
          autoClose: 5000,
          style: { backgroundColor: "black" },
        });

        // Make sure we're still in searching state when we display the found element
        await delay(speed * 2);
        setIsSearching(false);
        return;
      }

      if (array[mid] > parseInt(targetValue)) {
        setMessages((prev) => [
          ...prev,
          `${array[mid]} > ${targetValue}, searching left half`,
        ]);
        right = mid - 1;
      } else {
        setMessages((prev) => [
          ...prev,
          `${array[mid]} < ${targetValue}, searching right half`,
        ]);
        left = mid + 1;
      }

      setMessages((prev) => [...prev, `New search range: [${left}, ${right}]`]);
    }

    setMessages((prev) => [...prev, `${targetValue} not found in the array`]);
    toast.error(`${targetValue} not found in the array`, {
      position: "top-right",
      autoClose: 5000,
      style: { backgroundColor: "black" },
    });
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (isSearching || !targetValue.trim()) return;

    const value = parseInt(targetValue);
    if (isNaN(value)) {
      toast.error("Please enter a valid number", {
        style: { backgroundColor: "black" },
      });
      return;
    }

    // Reset states for new search
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setMessages([]);

    if (algorithm === "binary_search") {
      binarySearch();
    } else {
      linearSearch();
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  return (
    <VisualizationContainer title="Searching Visualization">
      <div className={styles.searchingVisualizer}>
        <div className={styles.controls}>
          <input
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            placeholder="Enter a number to search"
            disabled={isSearching}
            className={styles.searchInput}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching && !isPaused}
            className={`${styles.button} ${styles.search}`}
          >
            Search
          </button>
          <button
            onClick={generateNewArray}
            disabled={isSearching && !isPaused}
            className={`${styles.button} ${styles.generate}`}
          >
            Generate New Array
          </button>
          {isSearching && (
            <>
              {isPaused ? (
                <button
                  onClick={handleResume}
                  className={`${styles.button} ${styles.resume}`}
                >
                  Resume
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className={`${styles.button} ${styles.pause}`}
                >
                  Pause
                </button>
              )}
            </>
          )}

          <SpeedControl
            value={1100 - speed}
            onChange={(value) => setSpeed(1100 - value)}
            min={100}
            max={1000}
            disabled={isSearching && !isPaused}
            isReversed={false}
            className={styles.speedControlWrapper}
          />
        </div>

        {/* Visualization area now contains only the array display */}
        <div className={styles.visualizationArea}>
          <div className={styles.arrayContainer}>
            {array.map((value, idx) => (
              <motion.div
                key={idx}
                className={`${styles.arrayElement} ${
                  idx === foundIndex
                    ? styles.found
                    : idx === currentIndex
                    ? styles.current
                    : highlightedIndices.includes(idx)
                    ? styles.checked
                    : currentIndex > idx && algorithm === "linear_search"
                    ? styles.checked
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div className={styles.arrayValue}>{value}</div>
                <div className={styles.arrayIndex}>{idx}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Message log now appears below the visualization */}
        <MessageLog
          messages={messages}
          title="Search Steps"
          className={styles.messageLog}
        />

        <ToastContainer />
      </div>
    </VisualizationContainer>
  );
};

export default SearchingVisualizer;

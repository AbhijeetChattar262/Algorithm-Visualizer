import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SearchingVisualizer.css";

const SearchingVisualizer = ({ algorithm }) => {
  const [array, setArray] = useState([]);
  const [targetValue, setTargetValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [speed, setSpeed] = useState(500);
  const [messages, setMessages] = useState([]);

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
    setFoundIndex(-1);
    setMessages([`Starting Binary Search for value: ${targetValue}`]);

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      // Check if search is paused
      while (isPausedRef.current) {
        await delay(100);
      }

      const mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      setMessages((prev) => [...prev, `Calculating mid point: ${mid}`]);
      setMessages((prev) => [
        ...prev,
        `Comparing ${array[mid]} with target ${targetValue}`,
      ]);

      await delay(speed);

      if (array[mid] === parseInt(targetValue)) {
        setFoundIndex(mid);
        setMessages((prev) => [
          ...prev,
          `Found ${targetValue} at index ${mid}!`,
        ]);
        toast.success(`Found ${targetValue} at index ${mid}!`, {
          position: "top-right",
          autoClose: 5000,
          style: { backgroundColor: "black" },
        });
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
    <div className="searching-visualizer">
      <div className="controls">
        <input
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          placeholder="Enter a number to search"
          disabled={isSearching}
          className="search-input"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching && !isPaused}
          className="button search"
        >
          Search
        </button>
        <button
          onClick={generateNewArray}
          disabled={isSearching && !isPaused}
          className="button generate"
        >
          Generate New Array
        </button>
        {isSearching && (
          <>
            {isPaused ? (
              <button onClick={handleResume} className="button resume">
                Resume
              </button>
            ) : (
              <button onClick={handlePause} className="button pause">
                Pause
              </button>
            )}
          </>
        )}
        <div className="speed-control">
          <span>Speed:</span>
          <input
            type="range"
            min="100"
            max="1000"
            value={1100 - speed}
            onChange={(e) => setSpeed(1100 - parseInt(e.target.value))}
            disabled={isSearching && !isPaused}
          />
          <span>Fast</span>
        </div>
      </div>

      <div className="visualization-area">
        <div className="array-container">
          {array.map((value, idx) => (
            <motion.div
              key={idx}
              className={`array-element ${
                idx === currentIndex
                  ? "current"
                  : idx === foundIndex
                  ? "found"
                  : currentIndex > idx && algorithm === "linear_search"
                  ? "checked"
                  : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className="array-value">{value}</div>
              <div className="array-index">{idx}</div>
            </motion.div>
          ))}
        </div>

        <div className="message-log-container">
          <h4>Search Steps</h4>
          <div className="message-log" ref={messageLogRef}>
            {messages.map((message, idx) => (
              <div key={idx} className="log-entry">
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchingVisualizer;

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataStructures from "../../algorithms/dataStructures";
import "./DataStructuresVisualizer.css";
import VisualizationContainer from "../UI/VisualizationContainer/VisualizationContainer";

// Import icons
import {
  FaRedo,
  FaPause,
  FaPlay,
  FaRandom,
  FaPlus,
  FaMinus,
  FaSearch,
  FaEdit,
  FaRegLightbulb,
  FaHistory,
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";

const DataStructuresVisualizer = ({ algorithm, prevAlgorithm }) => {
  const [elements, setElements] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [currentAnimation, setCurrentAnimation] = useState(null);

  const messageLogRef = useRef(null);
  const isPausedRef = useRef(isPaused);
  const animatingRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Parse algorithm name to get data structure type
  const dataStructureType = algorithm.toLowerCase();

  // Create an ID per element with the algorithm type for stable keys
  const getElementKey = (index, extraId = "") =>
    `${algorithm}-${extraId}-${index}`;

  // Get display names for the data structures
  const getDisplayName = () => {
    switch (dataStructureType) {
      case "array":
        return "Array";
      case "linked_list":
        return "Linked List";
      case "stack":
        return "Stack";
      case "queue":
        return "Queue";
      default:
        return "Data Structure";
    }
  };

  useEffect(() => {
    generateNewStructure();
  }, [algorithm]);

  const generateNewStructure = () => {
    let initialElements = [];
    // Generate different initial values based on data structure type
    switch (dataStructureType) {
      case "array":
        initialElements = Array.from(
          { length: 8 },
          () => Math.floor(Math.random() * 50) + 1
        );
        break;
      case "linked_list":
        initialElements = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 50) + 1
        );
        break;
      case "stack":
        initialElements = Array.from(
          { length: 3 },
          () => Math.floor(Math.random() * 50) + 1
        );
        break;
      case "queue":
        initialElements = Array.from(
          { length: 4 },
          () => Math.floor(Math.random() * 50) + 1
        );
        break;
      default:
        initialElements = [];
    }
    setElements(initialElements);
    setMessages([]);
    setAnimations([]);
    setCurrentStep(0);
    setHighlightedIndices([]);
    setInputValue("");
    setInputIndex("");
    setCurrentAnimation(null);
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

  // Fixed animate function to properly handle animations
  const animate = async () => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    try {
      let step = currentStep;

      while (step < animations.length && !isPausedRef.current) {
        const animation = animations[step];
        setCurrentAnimation(animation);
        setMessages((prev) => [...prev, animation.message]);

        // Process different animation types
        switch (animation.type) {
          case "highlight":
            setHighlightedIndices(animation.indices || [animation.index]);
            break;
          case "insert":
          case "shift":
          case "update":
            setHighlightedIndices(animation.indices || [animation.index]);
            break;
          case "compare":
            setHighlightedIndices(animation.indices || [animation.index]);
            break;
          case "found":
            setHighlightedIndices([animation.index]);
            toast.success(`Found element at index ${animation.index}`, {
              style: { backgroundColor: "black" },
              icon: <FaRegLightbulb />,
            });
            break;
          case "not-found":
            toast.error(animation.message, {
              style: { backgroundColor: "black" },
              icon: <FaExclamationTriangle />,
            });
            break;
          case "create-node":
            // Visualization for creating a new node
            break;
          case "update-head":
          case "update-next":
            setHighlightedIndices([animation.index]);
            break;
          case "push":
          case "pop":
          case "peek":
          case "enqueue":
          case "dequeue":
          case "front":
            if (animation.index !== undefined) {
              setHighlightedIndices([animation.index]);
            }
            break;
          case "final":
            if (animation.array) setElements(animation.array);
            if (animation.list) setElements(animation.list);
            if (animation.stack) setElements(animation.stack);
            if (animation.queue) setElements(animation.queue);
            setHighlightedIndices([]);
            break;
          case "error":
            toast.error(animation.message, {
              style: { backgroundColor: "black" },
              icon: <FaExclamationTriangle />,
            });
            break;
          default:
            break;
        }

        // Update the current step and wait for the animation delay
        step++;
        setCurrentStep(step);
        await delay(speed);
      }

      // Animation complete
      if (step >= animations.length) {
        setIsVisualizing(false);
        setCurrentAnimation(null);
        toast.success("Operation completed successfully!", {
          style: { backgroundColor: "black" },
        });
      }
    } catch (error) {
      console.error("Animation error:", error);
      toast.error("An error occurred during animation", {
        style: { backgroundColor: "black" },
      });
    } finally {
      animatingRef.current = false;
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    toast.info("Animation paused", {
      autoClose: 2000,
      style: { backgroundColor: "black" },
    });
  };

  const handleResume = () => {
    setIsPaused(false);
    toast.info("Animation resumed", {
      autoClose: 2000,
      style: { backgroundColor: "black" },
    });
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep(0);
    setAnimations([]);
    setIsVisualizing(false);
    setIsPaused(false);
    setHighlightedIndices([]);
    setCurrentAnimation(null);
    generateNewStructure();
    toast.info("Reset complete", {
      autoClose: 2000,
      style: { backgroundColor: "black" },
    });
  };

  const handleOperation = (operationType) => {
    if (isVisualizing) return;

    // Input validation for operations
    if (
      (operationType === "insert" || operationType === "update") &&
      (inputValue === "" || inputIndex === "")
    ) {
      toast.error(
        `Please provide both value and ${
          dataStructureType === "linked_list" ? "position" : "index"
        }`,
        {
          style: { backgroundColor: "black" },
        }
      );
      return;
    }

    if (operationType === "remove" && inputIndex === "") {
      toast.error(
        `Please provide ${
          dataStructureType === "linked_list" ? "a position" : "an index"
        }`,
        {
          style: { backgroundColor: "black" },
        }
      );
      return;
    }

    if (
      (operationType === "search" ||
        operationType === "push" ||
        operationType === "enqueue") &&
      inputValue === ""
    ) {
      toast.error(`Please provide a value`, {
        style: { backgroundColor: "black" },
      });
      return;
    }

    const value = inputValue !== "" ? parseInt(inputValue) : null;
    const indexPos = inputIndex !== "" ? parseInt(inputIndex) : null;

    // Number validation
    if (
      (operationType === "insert" || operationType === "update") &&
      (isNaN(indexPos) || isNaN(value))
    ) {
      toast.error(
        `${
          dataStructureType === "linked_list" ? "Position" : "Index"
        } and value must be numbers`,
        {
          style: { backgroundColor: "black" },
        }
      );
      return;
    }

    if (operationType === "remove" && isNaN(indexPos)) {
      toast.error(
        `${
          dataStructureType === "linked_list" ? "Position" : "Index"
        } must be a number`,
        {
          style: { backgroundColor: "black" },
        }
      );
      return;
    }

    if (
      (operationType === "search" ||
        operationType === "push" ||
        operationType === "enqueue") &&
      isNaN(value)
    ) {
      toast.error(`Value must be a number`, {
        style: { backgroundColor: "black" },
      });
      return;
    }

    // Range validation for operations with indexes
    if (
      operationType === "insert" &&
      (indexPos < 0 || indexPos > elements.length)
    ) {
      toast.error(
        `${
          dataStructureType === "linked_list" ? "Position" : "Index"
        } must be between 0 and ${elements.length}`,
        {
          style: { backgroundColor: "black" },
        }
      );
      return;
    }

    if (
      (operationType === "update" || operationType === "remove") &&
      (indexPos < 0 || indexPos >= elements.length)
    ) {
      toast.error(
        `${
          dataStructureType === "linked_list" ? "Position" : "Index"
        } must be between 0 and ${elements.length - 1}`,
        {
          style: { backgroundColor: "black" },
        }
      );
      return;
    }

    // Special validations for stack and queue operations
    if (
      (operationType === "pop" ||
        operationType === "peek" ||
        operationType === "dequeue" ||
        operationType === "front") &&
      elements.length === 0
    ) {
      toast.error(
        `Cannot perform ${operationType} on an empty ${dataStructureType}`,
        {
          style: { backgroundColor: "black" },
        }
      );
      return;
    }

    // All validations passed, prepare for visualization
    setIsVisualizing(true);
    setIsPaused(false);
    setCurrentStep(0);
    setMessages([]);
    setCurrentAnimation(null);

    // Get the proper operation function based on the data structure and operation type
    const dsOperations = dataStructures[dataStructureType](elements);
    let operationFunction;

    switch (operationType) {
      case "insert":
        operationFunction = () => dsOperations.insert(indexPos, value);
        break;
      case "remove":
        operationFunction = () => dsOperations.remove(indexPos);
        break;
      case "search":
        operationFunction = () => dsOperations.search(value);
        break;
      case "update":
        operationFunction = () => dsOperations.update(indexPos, value);
        break;
      case "push":
        operationFunction = () => dsOperations.push(value);
        break;
      case "pop":
        operationFunction = () => dsOperations.pop();
        break;
      case "peek":
        operationFunction = () => dsOperations.peek();
        break;
      case "enqueue":
        operationFunction = () => dsOperations.enqueue(value);
        break;
      case "dequeue":
        operationFunction = () => dsOperations.dequeue();
        break;
      case "front":
        operationFunction = () => dsOperations.front();
        break;
      default:
        return;
    }

    // Execute the operation and set animations
    operationFunction();
    setAnimations(dsOperations.animations);
  };

  // Fixed useEffect for controlling animation
  useEffect(() => {
    if (
      isVisualizing &&
      !isPaused &&
      animations.length > 0 &&
      !animatingRef.current
    ) {
      animate();
    }
  }, [isVisualizing, isPaused, animations]);

  // ... rest of your code including renderDataStructureControls, renderElementsVisualization, etc.

  // Rest of the component remains unchanged

  const renderDataStructureControls = () => {
    switch (dataStructureType) {
      case "array":
        return (
          <div className="data-structure-controls">
            <div className="control-header">
              <h3>Array Operations</h3>
            </div>
            <div className="input-group">
              <div className="input-wrapper">
                <label htmlFor="array-value">Value</label>
                <input
                  id="array-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  disabled={isVisualizing}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="array-index">Index</label>
                <input
                  id="array-index"
                  type="number"
                  value={inputIndex}
                  onChange={(e) => setInputIndex(e.target.value)}
                  placeholder="Enter index"
                  disabled={isVisualizing}
                />
              </div>
            </div>
            <div className="button-group">
              <button
                className="button-insert"
                onClick={() => handleOperation("insert")}
                disabled={isVisualizing && !isPaused}
              >
                <FaPlus /> Insert
              </button>
              <button
                className="button-remove"
                onClick={() => handleOperation("remove")}
                disabled={isVisualizing && !isPaused}
              >
                <FaMinus /> Remove
              </button>
              <button
                className="button-search"
                onClick={() => handleOperation("search")}
                disabled={isVisualizing && !isPaused}
              >
                <FaSearch /> Search
              </button>
              <button
                className="button-update"
                onClick={() => handleOperation("update")}
                disabled={isVisualizing && !isPaused}
              >
                <FaEdit /> Update
              </button>
            </div>
          </div>
        );
      // ... other cases for linked_list, stack, queue
      case "linked_list":
        return (
          <div className="data-structure-controls">
            <div className="control-header">
              <h3>Linked List Operations</h3>
            </div>
            <div className="input-group">
              <div className="input-wrapper">
                <label htmlFor="list-value">Value</label>
                <input
                  id="list-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  disabled={isVisualizing}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="list-position">Position</label>
                <input
                  id="list-position"
                  type="number"
                  value={inputIndex}
                  onChange={(e) => setInputIndex(e.target.value)}
                  placeholder="Enter position"
                  disabled={isVisualizing}
                />
              </div>
            </div>
            <div className="button-group">
              <button
                className="button-insert"
                onClick={() => handleOperation("insert")}
                disabled={isVisualizing && !isPaused}
              >
                <FaPlus /> Insert
              </button>
              <button
                className="button-remove"
                onClick={() => handleOperation("remove")}
                disabled={isVisualizing && !isPaused}
              >
                <FaMinus /> Remove
              </button>
              <button
                className="button-search"
                onClick={() => handleOperation("search")}
                disabled={isVisualizing && !isPaused}
              >
                <FaSearch /> Search
              </button>
            </div>
          </div>
        );
      case "stack":
        return (
          <div className="data-structure-controls">
            <div className="control-header">
              <h3>Stack Operations</h3>
            </div>
            <div className="input-group">
              <div className="input-wrapper">
                <label htmlFor="stack-value">Value</label>
                <input
                  id="stack-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  disabled={isVisualizing}
                />
              </div>
            </div>
            <div className="button-group">
              <button
                className="button-push"
                onClick={() => handleOperation("push")}
                disabled={isVisualizing && !isPaused}
              >
                <FaArrowUp /> Push
              </button>
              <button
                className="button-pop"
                onClick={() => handleOperation("pop")}
                disabled={isVisualizing && !isPaused}
              >
                <FaArrowDown /> Pop
              </button>
              <button
                className="button-peek"
                onClick={() => handleOperation("peek")}
                disabled={isVisualizing && !isPaused}
              >
                <FaRegLightbulb /> Peek
              </button>
            </div>
          </div>
        );
      case "queue":
        return (
          <div className="data-structure-controls">
            <div className="control-header">
              <h3>Queue Operations</h3>
            </div>
            <div className="input-group">
              <div className="input-wrapper">
                <label htmlFor="queue-value">Value</label>
                <input
                  id="queue-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  disabled={isVisualizing}
                />
              </div>
            </div>
            <div className="button-group">
              <button
                className="button-enqueue"
                onClick={() => handleOperation("enqueue")}
                disabled={isVisualizing && !isPaused}
              >
                <FaArrowRight /> Enqueue
              </button>
              <button
                className="button-dequeue"
                onClick={() => handleOperation("dequeue")}
                disabled={isVisualizing && !isPaused}
              >
                <FaArrowLeft /> Dequeue
              </button>
              <button
                className="button-front"
                onClick={() => handleOperation("front")}
                disabled={isVisualizing && !isPaused}
              >
                <FaRegLightbulb /> Front
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderElementsVisualization = () => {
    switch (dataStructureType) {
      case "array":
        return (
          <motion.div
            key="array-vis"
            layout
            className="array-visualization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
          >
            <AnimatePresence mode="wait">
              {elements.length > 0 ? (
                <motion.div
                  key="array-elements"
                  className="array-elements-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {elements.map((element, index) => (
                    <motion.div
                      key={getElementKey(index, "array")}
                      className={`array-element ${
                        highlightedIndices.includes(index) ? "highlighted" : ""
                      }`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        ...spring,
                        delay: index * 0.03,
                      }}
                    >
                      <div className="array-value">{element}</div>
                      <div className="array-index">{index}</div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-array"
                  className="empty-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Array is empty
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      case "linked_list":
        return (
          <motion.div
            key="linked-list-vis"
            layout
            className="linked-list-visualization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
          >
            <AnimatePresence mode="wait">
              {elements.length > 0 ? (
                <motion.div
                  key="linked-list-elements"
                  className="linked-list-elements-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {elements.map((element, index) => (
                    <motion.div
                      key={getElementKey(index, "list")}
                      className="linked-list-node-container"
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        ...spring,
                        delay: index * 0.05,
                      }}
                    >
                      <div
                        className={`linked-list-node ${
                          highlightedIndices.includes(index)
                            ? "highlighted"
                            : ""
                        }`}
                        data-position={index}
                      >
                        <div className="node-value">{element}</div>
                      </div>
                      {index < elements.length - 1 && (
                        <div className="node-pointer"></div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-list"
                  className="empty-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Linked List is empty
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      case "stack":
        return (
          <div className="stack-visualization">
            <div className="stack-container">
              {elements.length > 0 ? (
                [...elements].reverse().map((element, reverseIndex) => {
                  const index = elements.length - 1 - reverseIndex;
                  return (
                    <motion.div
                      key={getElementKey(index, "stack")}
                      className={`stack-element ${
                        highlightedIndices.includes(index) ? "highlighted" : ""
                      }`}
                      data-index={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        ...spring,
                        delay: reverseIndex * 0.05,
                      }}
                    >
                      {element}
                    </motion.div>
                  );
                })
              ) : (
                <div className="stack-empty-message">Stack is empty</div>
              )}
              <div className="stack-base">Stack Base</div>
            </div>

            {/* Only show Top indicator when stack has elements */}
            {elements.length > 0 && (
              <div className="stack-top-indicator">
                <span className="indicator-arrow">←</span> Top
              </div>
            )}
          </div>
        );
      case "queue":
        return (
          <div className="queue-visualization">
            <div className="queue-container">
              {/* Only show indicators when queue has elements */}
              {elements.length > 0 && (
                <>
                  <div className="queue-front-indicator">
                    Front <span className="indicator-arrow">↓</span>
                  </div>
                  <div className="queue-rear-indicator">
                    Rear <span className="indicator-arrow">↓</span>
                  </div>
                </>
              )}

              {elements.length > 0 ? (
                elements.map((element, index) => (
                  <motion.div
                    key={getElementKey(index, "queue")}
                    className={`queue-element ${
                      highlightedIndices.includes(index) ? "highlighted" : ""
                    }`}
                    data-index={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...spring,
                      delay: index * 0.05,
                    }}
                  >
                    {element}
                  </motion.div>
                ))
              ) : (
                <div className="queue-empty-message">Queue is empty</div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Animation variants for framer motion
  const spring = {
    type: "spring",
    stiffness: 250,
    damping: 30,
    mass: 1,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <VisualizationContainer title={`${getDisplayName()} Visualization`}>
      <motion.div
        className="data-structures-visualizer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="controls" layout transition={spring}>
          <button
            onClick={handleReset}
            disabled={isVisualizing && !isPaused}
            className="tooltip"
          >
            <FaRedo /> Reset
            <span className="tooltip-text">Reset the visualization</span>
          </button>
          <button
            onClick={generateNewStructure}
            disabled={isVisualizing && !isPaused}
            className="tooltip"
          >
            <FaRandom /> Generate New
            <span className="tooltip-text">Create a new random structure</span>
          </button>
          {isPaused ? (
            <button onClick={handleResume} className="tooltip">
              <FaPlay /> Resume
              <span className="tooltip-text">Continue the visualization</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              disabled={!isVisualizing}
              className="tooltip"
            >
              <FaPause /> Pause
              <span className="tooltip-text">Pause the visualization</span>
            </button>
          )}
          <div className="speed-control">
            <span>Slow</span>
            <input
              type="range"
              min="100"
              max="1000"
              value={1100 - speed}
              onChange={(e) => setSpeed(1100 - e.target.value)}
              disabled={isVisualizing && !isPaused}
            />
            <span>Fast</span>
          </div>
        </motion.div>

        {renderDataStructureControls()}

        {/* Wrap the visualization with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`vis-container-${algorithm}`}
            className="visualization-container"
            layout
            transition={spring}
          >
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={spring}
              style={{
                position: "absolute",
                top: "5px",
                left: "15px",
                margin: 0,
                color: "#2196f3",
              }}
            >
              {getDisplayName()} Visualization
            </motion.h3>
            {renderElementsVisualization()}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="message-log-container"
          layout
          transition={spring}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="message-log-header">
            <h4 className="message-log-title">
              <FaHistory /> Operation Log
            </h4>
            {currentAnimation && (
              <div className="current-operation">
                Current: {currentAnimation.type}
              </div>
            )}
          </div>
          <div className="message-log" ref={messageLogRef}>
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message-item ${
                    index === messages.length - 1 ? "highlight" : ""
                  }`}
                  variants={itemVariants}
                >
                  <span className="message-step">{index + 1}</span>
                  {message}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <ToastContainer position="top-right" autoClose={3000} />
      </motion.div>
    </VisualizationContainer>
  );
};

export default DataStructuresVisualizer;

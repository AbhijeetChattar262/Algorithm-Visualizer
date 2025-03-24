import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./PathfindingVisualizer.module.css";
import pathfinding from "../../algorithms/pathfinding";
import SpeedControl from "../UI/SpeedControl/SpeedControl";
import VisualizationContainer from "../UI/VisualizationContainer/VisualizationContainer";

const PathfindingVisualizer = ({ algorithm }) => {
  const [grid, setGrid] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isSettingStart, setIsSettingStart] = useState(false);
  const [isSettingEnd, setIsSettingEnd] = useState(false);
  const [isAddingWalls, setIsAddingWalls] = useState(true); // Default to wall building mode
  const [messages, setMessages] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);

  const isPausedRef = useRef(isPaused);
  const messageLogRef = useRef(null);

  // Number of rows and columns in the grid
  const numRows = 15;
  const numCols = 30;

  // Update ref when state changes
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Initialize grid on component mount
  useEffect(() => {
    initializeGrid();
  }, [algorithm]);

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

  // Create a node object with default properties
  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: false,
      isEnd: false,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      isPath: false,
      previous: null,
      f: Infinity, // For A* algorithm
      g: Infinity, // For A* algorithm
      h: Infinity, // For A* algorithm
    };
  };

  // Initialize grid with nodes
  const initializeGrid = () => {
    const initialGrid = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        currentRow.push(createNode(row, col));
      }
      initialGrid.push(currentRow);
    }

    // Set default start and end nodes
    const startRow = 7;
    const startCol = 5;
    const endRow = 7;
    const endCol = 25;

    initialGrid[startRow][startCol].isStart = true;
    initialGrid[endRow][endCol].isEnd = true;

    setStartNode(initialGrid[startRow][startCol]);
    setEndNode(initialGrid[endRow][endCol]);
    setGrid(initialGrid);

    // Reset visualization states
    setIsVisualizing(false);
    setAnimationComplete(false);
    setMessages([]);
  };

  // Handle node click or drag actions
  const handleNodeClick = (row, col) => {
    if (isVisualizing) return;

    // If we're starting to drag the start or end node
    if (grid[row][col].isStart) {
      setIsDraggingStart(true);
      return;
    }

    if (grid[row][col].isEnd) {
      setIsDraggingEnd(true);
      return;
    }

    // Regular node clicking/wall building
    if (!isDraggingStart && !isDraggingEnd) {
      if (isSettingStart) {
        updateStartNode(row, col);
      } else if (isSettingEnd) {
        updateEndNode(row, col);
      } else if (isAddingWalls) {
        toggleWall(row, col);
      }
    }
  };

  // Update start node position
  const updateStartNode = (row, col) => {
    if (grid[row][col].isEnd) return; // Don't set start on end node
    if (grid[row][col].isWall) return; // Don't set start on wall

    const newGrid = grid.map((gridRow) =>
      gridRow.map((node) => {
        if (node.isStart) {
          return { ...node, isStart: false };
        }
        if (node.row === row && node.col === col) {
          return { ...node, isStart: true };
        }
        return node;
      })
    );

    setStartNode(newGrid[row][col]);
    setGrid(newGrid);
    if (isSettingStart) {
      setIsSettingStart(false);
      toast.info("Start position updated!", {
        style: { backgroundColor: "black" },
        autoClose: 2000,
      });
    }
  };

  // Update end node position
  const updateEndNode = (row, col) => {
    if (grid[row][col].isStart) return; // Don't set end on start node
    if (grid[row][col].isWall) return; // Don't set end on wall

    const newGrid = grid.map((gridRow) =>
      gridRow.map((node) => {
        if (node.isEnd) {
          return { ...node, isEnd: false };
        }
        if (node.row === row && node.col === col) {
          return { ...node, isEnd: true };
        }
        return node;
      })
    );

    setEndNode(newGrid[row][col]);
    setGrid(newGrid);
    if (isSettingEnd) {
      setIsSettingEnd(false);
      toast.info("End position updated!", {
        style: { backgroundColor: "black" },
        autoClose: 2000,
      });
    }
  };

  // Toggle wall status
  const toggleWall = (row, col) => {
    if (grid[row][col].isStart || grid[row][col].isEnd) return;

    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;

    setGrid(newGrid);
  };

  // Handle mouse events
  const handleMouseDown = (row, col) => {
    if (isVisualizing) return;
    setMouseIsPressed(true);
    handleNodeClick(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isVisualizing) return;

    // Handle dragging start node
    if (isDraggingStart) {
      updateStartNode(row, col);
      return;
    }

    // Handle dragging end node
    if (isDraggingEnd) {
      updateEndNode(row, col);
      return;
    }

    // Handle wall toggle while dragging
    if (isAddingWalls) {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Visualize the pathfinding algorithm
  const visualizePathfinding = async () => {
    if (isVisualizing) return;

    // Reset previous visualization
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previous: null,
        f: Infinity,
        g: Infinity,
        h: Infinity,
      }))
    );

    setGrid(newGrid);
    setIsVisualizing(true);
    setAnimationComplete(false);
    setMessages([]);

    // Run the selected algorithm
    const startNodeCopy = newGrid[startNode.row][startNode.col];
    const endNodeCopy = newGrid[endNode.row][endNode.col];

    const animations = pathfinding[algorithm](
      newGrid,
      startNodeCopy,
      endNodeCopy
    );

    // Visualize the animations
    for (let i = 0; i < animations.length; i++) {
      if (isPausedRef.current) {
        // Wait until unpaused
        while (isPausedRef.current) {
          await delay(100);
        }
      }

      const animation = animations[i];
      setMessages((prev) => [...prev, animation.message]);

      switch (animation.type) {
        case "evaluating":
        case "visited":
          setGrid((prev) => {
            const newGrid = [...prev];
            const node = newGrid[animation.node.row][animation.node.col];
            newGrid[animation.node.row][animation.node.col] = {
              ...node,
              isVisited: true,
            };
            return newGrid;
          });
          await delay(speed);
          break;

        case "final-path":
          // Visualize the final path found
          await delay(speed);

          for (const node of animation.path) {
            if (isPausedRef.current) {
              while (isPausedRef.current) {
                await delay(100);
              }
            }

            setGrid((prev) => {
              const newGrid = [...prev];
              const pathNode = newGrid[node.row][node.col];
              if (!pathNode.isStart && !pathNode.isEnd) {
                newGrid[node.row][node.col] = {
                  ...pathNode,
                  isPath: true,
                };
              }
              return newGrid;
            });

            await delay(speed * 2);
          }

          toast.success("Path found successfully!", {
            style: { backgroundColor: "black" },
          });
          break;

        case "no-path":
          toast.error("No path found to destination!", {
            style: { backgroundColor: "black" },
          });
          break;

        default:
          break;
      }
    }

    setAnimationComplete(true);
    setIsVisualizing(false);
  };

  const handleClearBoard = () => {
    if (isVisualizing) return;
    initializeGrid();
  };

  const handleClearPath = () => {
    if (isVisualizing) return;

    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previous: null,
      }))
    );

    setGrid(newGrid);
    setMessages([]);
    setAnimationComplete(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    toast.info("Visualization paused", {
      style: { backgroundColor: "black" },
      autoClose: 2000,
    });
  };

  const handleResume = () => {
    setIsPaused(false);
    toast.info("Visualization resumed", {
      style: { backgroundColor: "black" },
      autoClose: 2000,
    });
  };

  const handleSetStart = () => {
    if (isVisualizing) return;
    setIsSettingStart(true);
    setIsSettingEnd(false);
    setIsAddingWalls(false);
    toast.info("Click on a cell to set the start position", {
      style: { backgroundColor: "black" },
      autoClose: 2000,
    });
  };

  const handleSetEnd = () => {
    if (isVisualizing) return;
    setIsSettingStart(false);
    setIsSettingEnd(true);
    setIsAddingWalls(false);
    toast.info("Click on a cell to set the end position", {
      style: { backgroundColor: "black" },
      autoClose: 2000,
    });
  };

  const handleToggleWalls = () => {
    if (isVisualizing) return;
    setIsSettingStart(false);
    setIsSettingEnd(false);
    setIsAddingWalls(!isAddingWalls);

    if (!isAddingWalls) {
      toast.info("Click or drag to add/remove walls", {
        style: { backgroundColor: "black" },
        autoClose: 2000,
      });
    }
  };

  const getNodeClassName = (node) => {
    if (node.isStart) return `${styles.node} ${styles.nodeStart}`;
    if (node.isEnd) return `${styles.node} ${styles.nodeEnd}`;
    if (node.isWall) return `${styles.node} ${styles.nodeWall}`;
    if (node.isPath) return `${styles.node} ${styles.nodePath}`;
    if (node.isVisited) return `${styles.node} ${styles.nodeVisited}`;
    return styles.node;
  };

  return (
    <VisualizationContainer title="Pathfinding Visualization">
      <div className={styles.pathfindingVisualizer}>
        <div className={styles.controls}>
          <div className={styles.algorithmInfo}>
            <h3>
              {algorithm === "astar" ? "A* Search" : "Dijkstra's Algorithm"}
            </h3>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <button
                onClick={visualizePathfinding}
                disabled={isVisualizing}
                className={`${styles.button} ${styles.visualize}`}
              >
                {isVisualizing ? "Visualizing..." : "Visualize"}
              </button>

              {isVisualizing ? (
                isPaused ? (
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
                )
              ) : null}

              <button
                onClick={handleClearPath}
                disabled={isVisualizing}
                className={`${styles.button} ${styles.clearPath}`}
              >
                Clear Path
              </button>

              <button
                onClick={handleClearBoard}
                disabled={isVisualizing}
                className={`${styles.button} ${styles.clearBoard}`}
              >
                Clear Board
              </button>
              <button
                onClick={handleSetStart}
                disabled={isVisualizing}
                className={`${styles.button} ${
                  isSettingStart ? styles.active : ""
                }`}
              >
                Set Start
              </button>

              <button
                onClick={handleSetEnd}
                disabled={isVisualizing}
                className={`${styles.button} ${
                  isSettingEnd ? styles.active : ""
                }`}
              >
                Set End
              </button>

              <button
                onClick={handleToggleWalls}
                disabled={isVisualizing}
                className={`${styles.button} ${
                  isAddingWalls ? styles.active : ""
                }`}
              >
                {isAddingWalls ? "Drawing Walls" : "Draw Walls"}
              </button>

              <div style={{ marginLeft: "auto" }}></div>
            </div>

            <SpeedControl
              value={510 - speed}
              onChange={(value) => setSpeed(510 - value)}
              min={10}
              max={500}
              disabled={isVisualizing && !isPaused}
              isReversed={false}
              className={styles.speedControlWrapper}
            />
          </div>
        </div>

        <div className={styles.visualizationArea}>
          <div className={styles.gridContainer}>
            <div
              className={styles.grid}
              onMouseLeave={() => {
                setMouseIsPressed(false);
                setIsDraggingStart(false);
                setIsDraggingEnd(false);
              }}
            >
              {grid.map((row, rowIdx) => (
                <div key={rowIdx} className={styles.gridRow}>
                  {row.map((node, nodeIdx) => (
                    <div
                      key={nodeIdx}
                      className={getNodeClassName(node)}
                      onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                      onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                      onMouseUp={handleMouseUp}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.messageLogContainer}>
            <h4>Algorithm Steps</h4>
            <div className={styles.messageLog} ref={messageLogRef}>
              {messages.map((message, index) => (
                <div key={index} className={styles.logEntry}>
                  {message}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.start}`}></div>
            <span>Start</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.end}`}></div>
            <span>End</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.wall}`}></div>
            <span>Wall</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.visited}`}></div>
            <span>Visited</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.path}`}></div>
            <span>Path</span>
          </div>
        </div>

        <ToastContainer />
      </div>
    </VisualizationContainer>
  );
};

export default PathfindingVisualizer;

import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./GraphVisualizer.module.css";
import algorithms from "../../algorithms/graph";
import { motion } from "framer-motion";
import SpeedControl from "../UI/SpeedControl/SpeedControl";
import Button from "../UI/Button/Button";
import VisualizationContainer from "../UI/VisualizationContainer/VisualizationContainer";
import MessageLog from "../UI/MessageLog/MessageLog";

const GraphVisualizer = ({ algorithm, sidebarCollapsed }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [speed, setSpeed] = useState(500);
  const [dataStructure, setDataStructure] = useState({
    queue: [],
    stack: [],
    visitedList: [],
  });
  const canvasRef = useRef(null);
  const lastGeneratedRef = useRef(Date.now());

  const MIN_DISTANCE = 100; // Minimum distance between nodes

  // Check if a new node would overlap with existing nodes
  const checkNodeOverlap = (newNode, existingNodes) => {
    for (const node of existingNodes) {
      const dx = newNode.x - node.x;
      const dy = newNode.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < MIN_DISTANCE) return true;
    }
    return false;
  };

  // Improved graph generation with more random connections
  const generateRandomGraph = () => {
    // Reset all states
    setVisitedNodes([]);
    setCurrentNode(null);
    setMessages([]);
    setDataStructure({ queue: [], stack: [], visitedList: [] });
    setIsVisualizing(false);

    const numNodes = 6;
    const newNodes = [];
    const padding = 50;
    const width = canvasRef.current
      ? canvasRef.current.width - 2 * padding
      : 600;
    const height = canvasRef.current
      ? canvasRef.current.height - 2 * padding
      : 350;

    // Generate nodes with better positioning
    for (let i = 0; i < numNodes; i++) {
      let newNode;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        newNode = {
          id: i,
          x: Math.random() * width + padding,
          y: Math.random() * height + padding,
        };
        attempts++;
      } while (checkNodeOverlap(newNode, newNodes) && attempts < maxAttempts);

      newNodes.push(newNode);
    }

    // Generate edges with improved randomness
    const newEdges = [];

    // First ensure the graph is connected using a random spanning tree
    // Shuffle node indices to avoid always connecting in ascending order
    const shuffledIndices = Array.from({ length: numNodes }, (_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [
        shuffledIndices[j],
        shuffledIndices[i],
      ];
    }

    // Create a random spanning tree (to ensure connectivity)
    const connectedNodes = [shuffledIndices[0]]; // Start with first node
    const remainingNodes = shuffledIndices.slice(1);

    while (remainingNodes.length > 0) {
      const toNodeIndex = Math.floor(Math.random() * remainingNodes.length);
      const toNode = remainingNodes[toNodeIndex];

      // Connect to a random node from the already connected set
      const fromNodeIndex = Math.floor(Math.random() * connectedNodes.length);
      const fromNode = connectedNodes[fromNodeIndex];

      newEdges.push({
        from: fromNode,
        to: toNode,
        weight: Math.floor(Math.random() * 9) + 1,
      });

      // Move the node from remaining to connected
      connectedNodes.push(toNode);
      remainingNodes.splice(toNodeIndex, 1);
    }

    // Add some additional random edges (but avoid duplicates)
    const edgeExists = (from, to) => {
      return newEdges.some(
        (edge) =>
          (edge.from === from && edge.to === to) ||
          (edge.from === to && edge.to === from)
      );
    };

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        // Skip if edge already exists or with low probability
        if (edgeExists(i, j) || Math.random() > 0.15) continue;

        newEdges.push({
          from: i,
          to: j,
          weight: Math.floor(Math.random() * 9) + 1,
        });
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);

    // Trigger a redraw
    setTimeout(() => drawGraph(), 0);
  };

  const visualize = async () => {
    if (isVisualizing) return;
    setIsVisualizing(true);

    // Keep the existing graph by only resetting the visualization states
    setVisitedNodes([]);
    setCurrentNode(null);
    setMessages([]);
    setDataStructure({ queue: [], stack: [], visitedList: [] });

    try {
      const graphAlgorithm = algorithms[algorithm];
      const animations = graphAlgorithm(nodes, edges, 0);

      for (const {
        node,
        visited,
        message,
        queue,
        stack,
        visitedList,
      } of animations) {
        setCurrentNode(node);
        if (visited) setVisitedNodes((prev) => [...prev, node]);
        setMessages((prev) => [...prev, message]);
        setDataStructure({
          queue: queue || [],
          stack: stack || [],
          visitedList: visitedList || [],
        });

        await new Promise((r) => setTimeout(r, speed));
      }

      toast.success("Visualization completed!", {
        style: { backgroundColor: "black" },
      });
    } catch (error) {
      console.error("Visualization error:", error);
      toast.error("An error occurred during visualization", {
        style: { backgroundColor: "black" },
      });
    } finally {
      setIsVisualizing(false);
    }
  };

  // Initialize and resize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          // Leave some margin around the canvas
          canvasRef.current.width = Math.min(700, container.clientWidth - 20);
          canvasRef.current.height = Math.min(400, window.innerHeight * 0.5);
          drawGraph();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Call handleResize when the sidebar collapse state changes
    if (sidebarCollapsed !== undefined) {
      setTimeout(handleResize, 300); // Add delay to let the sidebar animation complete
    }

    // Only generate a new graph if there are no nodes yet
    if (nodes.length === 0) {
      generateRandomGraph();
      lastGeneratedRef.current = Date.now();
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [algorithm, sidebarCollapsed]);

  // Draw the graph whenever nodes, edges, or visited nodes change
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges with improved styling
    edges.forEach((edge) => {
      const start = nodes[edge.from];
      const end = nodes[edge.to];
      if (!start || !end) return;

      // Path between nodes
      ctx.beginPath();
      ctx.strokeStyle = "#2196F3";
      ctx.lineWidth = 2;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      // Add weight with better visibility
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;

      // Add background for weight text
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.beginPath();
      ctx.arc(midX, midY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Draw weight text
      ctx.fillStyle = "white";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(edge.weight, midX, midY);
    });

    // Draw nodes with improved styling
    nodes.forEach((node, i) => {
      // First draw a shadow for 3D effect
      ctx.beginPath();
      ctx.arc(node.x, node.y, 22, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fill();

      // Then draw the node itself
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);

      // Different colors based on node state
      if (visitedNodes.includes(i)) {
        ctx.fillStyle = "#4CAF50";
      } else if (currentNode === i) {
        ctx.fillStyle = "#2196F3";
      } else {
        ctx.fillStyle = "#34495e";
      }
      ctx.fill();

      // Node border
      ctx.strokeStyle = visitedNodes.includes(i) ? "#45a049" : "#2196F3";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = "white";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(i + 1, node.x, node.y);
    });
  };

  useEffect(() => {
    drawGraph();
  }, [nodes, edges, visitedNodes, currentNode]);

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
  };

  const handleGenerateGraph = () => {
    generateRandomGraph();
    lastGeneratedRef.current = Date.now();
  };

  return (
    <VisualizationContainer title="Graph Algorithm Visualization">
      <div className={styles.graphVisualizer}>
        <div className={styles.controls}>
          <Button
            variant="primary"
            onClick={handleGenerateGraph} // Use the new handler
            disabled={isVisualizing}
          >
            Generate New Graph
          </Button>
          <Button
            variant="success"
            onClick={visualize}
            disabled={isVisualizing}
          >
            Visualize {algorithm.replace("graph_", "").toUpperCase()}
          </Button>
          <div className={styles.speedControlWrapper}>
            <SpeedControl
              value={1100 - speed}
              onChange={(value) => setSpeed(1100 - value)}
              min={100}
              max={1000}
              disabled={isVisualizing}
            />
          </div>
        </div>

        <div className={styles.visualizationArea}>
          <div className={styles.canvasContainer}>
            <canvas
              ref={canvasRef}
              className={styles.graphCanvas}
              width={700}
              height={400}
            />
          </div>
          <div className={styles.infoContainer}>
            <MessageLog
              messages={messages}
              title="Algorithm Steps"
              className={styles.messageLog}
            />
            {algorithm !== "graph_dijkstra" && (
              <div className={styles.dataStructureInfo}>
                {algorithm === "graph_bfs" && (
                  <div className={styles.queueInfo}>
                    <h4>Queue:</h4>
                    <div className={styles.dataStructureContainer}>
                      {dataStructure.queue.length > 0
                        ? dataStructure.queue
                            .map((node) => `${node + 1}`)
                            .join(" → ")
                        : "Empty"}
                    </div>
                  </div>
                )}
                {algorithm === "graph_dfs" && (
                  <div className={styles.stackInfo}>
                    <h4>Stack:</h4>
                    <div className={styles.dataStructureContainer}>
                      {dataStructure.stack.length > 0
                        ? dataStructure.stack
                            .map((node) => `${node + 1}`)
                            .join(" → ")
                        : "Empty"}
                    </div>
                  </div>
                )}
                <div className={styles.visitedInfo}>
                  <h4>Visited Nodes:</h4>
                  <div className={styles.dataStructureContainer}>
                    {dataStructure.visitedList.length > 0
                      ? dataStructure.visitedList
                          .map((node) => `${node + 1}`)
                          .join(", ")
                      : "None"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.unvisited}`}></div>
            <span>Unvisited</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.current}`}></div>
            <span>Current</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.visited}`}></div>
            <span>Visited</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </VisualizationContainer>
  );
};

export default GraphVisualizer;

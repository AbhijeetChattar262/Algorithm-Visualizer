import React, { useState, useEffect, useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GraphVisualizer.css';
import algorithms from '../../algorithms/graph';
import { ChatbotContext } from '../../context/ChatbotContext';
import { motion } from 'framer-motion'; // Import motion

const GraphVisualizer = ({ algorithm }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [speed, setSpeed] = useState(500);
  const messageLogRef = useRef(null);
  const canvasRef = useRef(null);
  const [dataStructure, setDataStructure] = useState({ queue: [], stack: [], visitedList: [] });
  const { isExpanded } = useContext(ChatbotContext); // Use context

  const MIN_DISTANCE = 100; // Minimum distance between nodes
  
  const checkNodeOverlap = (newNode, existingNodes) => {
    for (const node of existingNodes) {
      const dx = newNode.x - node.x;
      const dy = newNode.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < MIN_DISTANCE) return true;
    }
    return false;
  };

  const generateRandomGraph = () => {
    const numNodes = 6;
    const newNodes = [];
    const padding = 40;  // Reduced padding
    const width = 620;   // Adjusted for new canvas size
    const height = 270;  // Adjusted for new canvas size

    // Generate nodes with adjusted positioning
    for (let i = 0; i < numNodes; i++) {
      let newNode;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        newNode = {
          id: i,
          x: Math.random() * width + padding,
          y: Math.random() * height + padding
        };
        attempts++;
      } while (checkNodeOverlap(newNode, newNodes) && attempts < maxAttempts);

      newNodes.push(newNode);
    }

    // Generate edges ensuring connectivity
    const newEdges = [];
    
    // First, ensure all nodes are connected in a minimum spanning tree
    for (let i = 1; i < numNodes; i++) {
      newEdges.push({
        from: i - 1,
        to: i,
        weight: Math.floor(Math.random() * 9) + 1
      });
    }

    // Add some random additional edges
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 2; j < numNodes; j++) {
        if (Math.random() < 0.15) {  // Reduced probability for additional edges
          newEdges.push({
            from: i,
            to: j,
            weight: Math.floor(Math.random() * 9) + 1
          });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setVisitedNodes([]);
    setCurrentNode(null);
    setMessages([]);
  };

  const visualize = async () => {
    if (isVisualizing) return;
    setIsVisualizing(true);
    setVisitedNodes([]);
    setMessages([]);
    setDataStructure({ queue: [], stack: [], visitedList: [] });

    const graphAlgorithm = algorithms[algorithm];
    const animations = graphAlgorithm(nodes, edges, 0);

    for (const { node, visited, message, queue, stack, visitedList } of animations) {
      setCurrentNode(node);
      if (visited) setVisitedNodes(prev => [...prev, node]);
      setMessages(prev => [...prev, message]);
      setDataStructure({
        queue: queue || [],
        stack: stack || [],
        visitedList: visitedList || []
      });
      await new Promise(r => setTimeout(r, speed));
    }

    setIsVisualizing(false);
    toast.success('Visualization completed!', {
      style: { backgroundColor: 'black' },
    });
  };

  const scrollToBottom = () => {
    if (messageLogRef.current) {
      messageLogRef.current.scrollTo({
        top: messageLogRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    generateRandomGraph();
  }, [algorithm]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges with improved styling
    edges.forEach(edge => {
      const start = nodes[edge.from];
      const end = nodes[edge.to];
      
      ctx.beginPath();
      ctx.strokeStyle = '#2196F3';
      ctx.lineWidth = 2;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      // Draw weight with better visibility
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(edge.weight, midX, midY);
    });

    // Draw nodes with improved styling
    nodes.forEach((node, i) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = visitedNodes.includes(i) ? '#4CAF50' : 
                     currentNode === i ? '#2196F3' : '#34495e';
      ctx.fill();
      ctx.strokeStyle = '#2196F3';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw node label
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i+1, node.x, node.y);
    });
  };

  useEffect(() => {
    drawGraph();
  }, [nodes, edges, visitedNodes, currentNode]);

  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  };

  return (
    <div className="graph-visualizer">
      <motion.div className="controls" layout transition={spring}>
        <button onClick={generateRandomGraph} disabled={isVisualizing}>
          Generate New Graph
        </button>
        <button onClick={visualize} disabled={isVisualizing}>
          Visualize
        </button>
        <div className="speed-control">
          <label>Animation Speed</label>
          <input
            type="range"
            min="100"
            max="1000"
            value={1100 - speed}
            onChange={(e) => setSpeed(1100 - e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div className="graph-section" style={{ flexDirection: isExpanded ? 'column' : 'row' }} layout transition={spring}>
        <motion.canvas
          ref={canvasRef}
          width={700}
          height={350}
          className="graph-canvas"
          layout
          transition={spring}
        />
        <motion.div className="visualization-info" style={{ flexDirection: isExpanded ? 'row' : 'column' }} layout transition={spring}>
          <div className="message-log" ref={messageLogRef} style={{minHeight: '200px', width: isExpanded ? '400px' : ''}}>
            {messages.map((msg, idx) => (
              <div key={idx} className="log-entry">{msg}</div>
            ))}
          </div>
          {algorithm !== 'graph_dijkstra' && (<div className="data-structure-info" style={{ width: isExpanded ? '280px' : ''}}>
            {algorithm === 'graph_bfs' && (
              <div className="queue-info">
                <h4>Queue:</h4>
                <div className="data-structure-container">
                  {dataStructure.queue.map(node => `${node + 1}`).join(' → ')}
                </div>
              </div>
            )}
            {algorithm === 'graph_dfs' && (
              <div className="stack-info">
                <h4>Stack:</h4>
                <div className="data-structure-container">
                  {dataStructure.stack.map(node => `${node + 1}`).join(' → ')}
                </div>
              </div>
            )}
            <div className="visited-info">
              <h4>Visited Nodes:</h4>
              <div className="data-structure-container">
                {dataStructure.visitedList.map(node => `${node + 1}`).join(', ')}
              </div>
            </div>
          </div>)}
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default GraphVisualizer;

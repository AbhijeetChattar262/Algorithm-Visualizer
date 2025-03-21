const graph_bfs = (nodes, edges, startNode) => {
  const animations = [];
  const visited = new Set();
  const queue = [startNode];
  const adjList = buildAdjList(nodes.length, edges);

  animations.push({
    node: startNode,
    visited: false,
    message: `BFS: Starting from node ${startNode + 1}`,
    queue: [...queue],
    visitedList: Array.from(visited),
  });

  while (queue.length > 0) {
    const current = queue.shift();

    if (!visited.has(current)) {
      animations.push({
        node: current,
        visited: true,
        message: `BFS: Visiting node ${
          current + 1
        }. Processing all unvisited neighbors.`,
        queue: [...queue],
        visitedList: Array.from(visited),
      });

      visited.add(current);

      for (const neighbor of adjList[current]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          animations.push({
            node: neighbor,
            visited: false,
            message: `BFS: Found unvisited neighbor ${neighbor + 1} of node ${
              current + 1
            }. Adding to queue.`,
            queue: [...queue],
            visitedList: Array.from(visited),
          });
        } else {
          animations.push({
            node: neighbor,
            visited: true,
            message: `BFS: Neighbor ${
              neighbor + 1
            } has already been visited, skipping.`,
            queue: [...queue],
            visitedList: Array.from(visited),
          });
        }
      }
    }
  }

  animations.push({
    node: null,
    visited: false,
    message: `BFS: Complete. All reachable nodes have been visited.`,
    queue: [],
    visitedList: Array.from(visited),
  });

  return animations;
};

const graph_dfs = (nodes, edges, startNode) => {
  const animations = [];
  const visited = new Set();
  const stack = [];
  const adjList = buildAdjList(nodes.length, edges);

  function dfsHelper(node) {
    if (visited.has(node)) return;

    stack.push(node);
    animations.push({
      node: node,
      visited: true,
      message: `DFS: Exploring node ${node + 1} deeply.`,
      stack: [...stack],
      visitedList: Array.from(visited),
    });

    visited.add(node);

    for (const neighbor of adjList[node]) {
      if (!visited.has(neighbor)) {
        animations.push({
          node: neighbor,
          visited: false,
          message: `DFS: Found unvisited neighbor ${neighbor + 1} of node ${
            node + 1
          }. Exploring it recursively.`,
          stack: [...stack],
          visitedList: Array.from(visited),
        });
        dfsHelper(neighbor);
      } else {
        animations.push({
          node: neighbor,
          visited: true,
          message: `DFS: Neighbor ${
            neighbor + 1
          } has already been visited, skipping.`,
          stack: [...stack],
          visitedList: Array.from(visited),
        });
      }
    }

    const poppedNode = stack.pop();
    if (stack.length > 0) {
      animations.push({
        node: stack[stack.length - 1],
        visited: true,
        message: `DFS: Finished exploring all paths from node ${
          poppedNode + 1
        }. Returning to node ${stack[stack.length - 1] + 1}.`,
        stack: [...stack],
        visitedList: Array.from(visited),
      });
    }
  }

  animations.push({
    node: startNode,
    visited: false,
    message: `DFS: Starting from node ${startNode + 1}`,
    stack: [],
    visitedList: [],
  });

  dfsHelper(startNode);

  animations.push({
    node: null,
    visited: false,
    message: `DFS: Complete. All reachable nodes have been visited.`,
    stack: [],
    visitedList: Array.from(visited),
  });

  return animations;
};

const graph_dijkstra = (nodes, edges, startNode) => {
  const animations = [];
  const distances = new Array(nodes.length).fill(Infinity);
  const visited = new Set();
  const adjList = buildWeightedAdjList(nodes.length, edges);
  const predecessors = new Array(nodes.length).fill(null);

  distances[startNode] = 0;

  animations.push({
    node: startNode,
    visited: false,
    message: `Dijkstra: Starting from node ${
      startNode + 1
    }. Setting distance to 0.`,
  });

  while (visited.size < nodes.length) {
    const current = getMinDistanceNode(distances, visited);

    if (current === -1 || distances[current] === Infinity) {
      animations.push({
        node: null,
        visited: false,
        message: `Dijkstra: No more reachable nodes.`,
      });
      break;
    }

    animations.push({
      node: current,
      visited: true,
      message: `Dijkstra: Selected node ${
        current + 1
      } with shortest distance = ${distances[current]}.`,
    });

    visited.add(current);

    for (const [neighbor, weight] of adjList[current]) {
      if (!visited.has(neighbor)) {
        const newDist = distances[current] + weight;

        animations.push({
          node: neighbor,
          visited: false,
          message: `Dijkstra: Checking neighbor ${
            neighbor + 1
          }. Current distance: ${
            distances[neighbor] === Infinity ? "∞" : distances[neighbor]
          }, New potential distance: ${newDist}.`,
        });

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          predecessors[neighbor] = current;

          animations.push({
            node: neighbor,
            visited: false,
            message: `Dijkstra: Found shorter path to ${
              neighbor + 1
            } through node ${current + 1}. Updated distance to ${newDist}.`,
          });
        }
      }
    }
  }

  // Add final message showing all shortest paths
  let finalMessage =
    "Dijkstra completed. Final shortest distances from node " +
    (startNode + 1) +
    ":\n";
  distances.forEach((dist, node) => {
    const pathStr = getShortestPathString(startNode, node, predecessors);
    finalMessage += `  Node ${node + 1}: ${
      dist === Infinity ? "∞ (unreachable)" : dist
    } ${pathStr ? `[Path: ${pathStr}]` : ""}`;

    // Add newline for all but the last item
    if (node < distances.length - 1) finalMessage += "\n";
  });

  animations.push({
    node: null,
    visited: false,
    message: finalMessage,
  });

  return animations;
};

// Helper functions
function buildAdjList(numNodes, edges) {
  const adjList = Array.from({ length: numNodes }, () => []);
  for (const edge of edges) {
    adjList[edge.from].push(edge.to);
    adjList[edge.to].push(edge.from); // Undirected graph
  }
  return adjList;
}

function buildWeightedAdjList(numNodes, edges) {
  const adjList = Array.from({ length: numNodes }, () => []);
  for (const edge of edges) {
    adjList[edge.from].push([edge.to, edge.weight]);
    adjList[edge.to].push([edge.from, edge.weight]); // Undirected graph
  }
  return adjList;
}

function getMinDistanceNode(distances, visited) {
  let minDist = Infinity;
  let minNode = -1;
  distances.forEach((dist, node) => {
    if (!visited.has(node) && dist < minDist) {
      minDist = dist;
      minNode = node;
    }
  });
  return minNode;
}

function getShortestPathString(start, end, predecessors) {
  if (start === end) return `${start + 1}`;
  if (predecessors[end] === null) return "";

  const path = [];
  let current = end;

  while (current !== null) {
    path.unshift(current + 1); // Add node number (1-indexed)
    current = predecessors[current];
  }

  return path.join(" → ");
}

const algorithms = {
  graph_bfs,
  graph_dfs,
  graph_dijkstra,
};

export default algorithms;

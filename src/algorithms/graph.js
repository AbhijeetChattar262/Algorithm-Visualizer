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
    visitedList: Array.from(visited)
  });

  while (queue.length > 0) {
    const current = queue.shift();
    
    if (!visited.has(current)) {
      animations.push({
        node: current,
        visited: true,
        message: `BFS: Visiting node ${current + 1}. Processing all unvisited neighbors.`,
        queue: [...queue],
        visitedList: Array.from(visited)
      });
      
      visited.add(current);
      
      for (const neighbor of adjList[current]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          animations.push({
            node: neighbor,
            visited: false,
            message: `BFS: Found unvisited neighbor ${neighbor + 1} of node ${current + 1}.`,
            queue: [...queue],
            visitedList: Array.from(visited)
          });
        }
      }
    }
  }
  
  return animations;
};

const graph_dfs = (nodes, edges, startNode) => {
  const animations = [];
  const visited = new Set();
  const stack = [];
  const adjList = buildAdjList(nodes.length, edges);

  function dfsHelper(node) {
    stack.push(node);
    animations.push({
      node: node,
      visited: true,
      message: `DFS: Exploring node ${node + 1} deeply.`,
      stack: [...stack],
      visitedList: Array.from(visited)
    });
    
    visited.add(node);
    
    for (const neighbor of adjList[node]) {
      if (!visited.has(neighbor)) {
        animations.push({
          node: neighbor,
          visited: false,
          message: `DFS: Found unvisited neighbor ${neighbor + 1} of node ${node + 1}.`,
          stack: [...stack],
          visitedList: Array.from(visited)
        });
        dfsHelper(neighbor);
      }
    }
    stack.pop();
  }

  dfsHelper(startNode);
  return animations;
};

const graph_dijkstra = (nodes, edges, startNode) => {
  const animations = [];
  const distances = new Array(nodes.length).fill(Infinity);
  const visited = new Set();
  const adjList = buildWeightedAdjList(nodes.length, edges);
  
  distances[startNode] = 0;

  while (visited.size < nodes.length) {
    const current = getMinDistanceNode(distances, visited);
    
    if (distances[current] === Infinity) break;
    
    animations.push({
      node: current,
      visited: true,
      message: `Dijkstra: Selected node ${current + 1} (shortest distance = ${distances[current]}) as it has the minimum distance among unvisited nodes.`
    });
    
    visited.add(current);
    
    for (const [neighbor, weight] of adjList[current]) {
      if (!visited.has(neighbor)) {
        const newDist = distances[current] + weight;
        if (newDist < distances[neighbor]) {
          animations.push({
            node: neighbor,
            visited: false,
            message: `Dijkstra: Found shorter path to node ${neighbor + 1} through node ${current + 1}. Updated distance: ${newDist} (previous: ${distances[neighbor] === Infinity ? '∞' : distances[neighbor]})`
          });
          distances[neighbor] = newDist;
        }
      }
    }
  }
  
  return animations;
};

// Helper functions
function buildAdjList(numNodes, edges) {
  const adjList = Array.from({ length: numNodes }, () => []);
  for (const edge of edges) {
    adjList[edge.from].push(edge.to);
    adjList[edge.to].push(edge.from);
  }
  return adjList;
}

function buildWeightedAdjList(numNodes, edges) {
  const adjList = Array.from({ length: numNodes }, () => []);
  for (const edge of edges) {
    adjList[edge.from].push([edge.to, edge.weight]);
    adjList[edge.to].push([edge.from, edge.weight]);
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

const algorithms = {
  graph_bfs,
  graph_dfs,
  graph_dijkstra
};

export default algorithms;

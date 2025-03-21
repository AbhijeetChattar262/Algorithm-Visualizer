const astar = (grid, startNode, endNode) => {
  const animations = [];

  // Initialize open and closed sets
  const openSet = [startNode];
  const closedSet = [];

  // g score is cost from start to current node
  // f score is g score + heuristic (estimated cost to end)
  startNode.g = 0;
  startNode.f = heuristic(startNode, endNode);

  while (openSet.length > 0) {
    // Find node with lowest f score
    let current = lowestFScore(openSet);

    // Add animation for current node evaluation
    animations.push({
      type: "evaluating",
      node: current,
      message: `Evaluating node at (${current.row}, ${current.col}) with f-score: ${current.f}`,
    });

    // If we reached the end
    if (current === endNode) {
      // Reconstruct path
      let path = [];
      let temp = current;
      while (temp.previous) {
        path.push(temp);
        temp = temp.previous;
      }

      // Add final path animation
      animations.push({
        type: "final-path",
        path: path.reverse(),
        message: `Path found with length ${path.length}!`,
      });

      return animations;
    }

    // Remove current from open set and add to closed set
    removeFromArray(openSet, current);
    closedSet.push(current);

    animations.push({
      type: "closed",
      node: current,
      message: `Marking node (${current.row}, ${current.col}) as evaluated`,
    });

    // Check all neighbors
    const neighbors = getNeighbors(current, grid);
    for (let neighbor of neighbors) {
      // Skip if neighbor is in closed set
      if (closedSet.includes(neighbor)) continue;

      animations.push({
        type: "checking-neighbor",
        node: neighbor,
        message: `Checking neighbor at (${neighbor.row}, ${neighbor.col})`,
      });

      // Calculate tentative g score
      let tempG = current.g + 1;

      // If neighbor is in open set and this path is better
      let newPath = false;
      if (openSet.includes(neighbor)) {
        if (tempG < neighbor.g) {
          neighbor.g = tempG;
          newPath = true;
        }
      } else {
        neighbor.g = tempG;
        newPath = true;
        openSet.push(neighbor);

        animations.push({
          type: "open",
          node: neighbor,
          message: `Adding node (${neighbor.row}, ${neighbor.col}) to open set`,
        });
      }

      // Update neighbor's scores if we have a better path
      if (newPath) {
        neighbor.h = heuristic(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;

        animations.push({
          type: "update",
          node: neighbor,
          f: neighbor.f,
          g: neighbor.g,
          h: neighbor.h,
          message: `Updated node (${neighbor.row}, ${neighbor.col}) with f=${neighbor.f}, g=${neighbor.g}, h=${neighbor.h}`,
        });
      }
    }
  }

  // No solution
  animations.push({
    type: "no-path",
    message: "No path found to destination!",
  });

  return animations;
};

// Manhattan distance heuristic
const heuristic = (a, b) => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
};

// Helper function to get node with lowest f score
const lowestFScore = (openSet) => {
  let winner = 0;
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[winner].f) {
      winner = i;
    }
  }
  return openSet[winner];
};

// Helper to remove element from array
const removeFromArray = (arr, element) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === element) {
      arr.splice(i, 1);
    }
  }
};

// Get neighboring nodes
const getNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;

  // Check four directions
  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right

  return neighbors.filter((neighbor) => !neighbor.isWall);
};

// Dijkstra's algorithm for pathfinding
const dijkstra = (grid, startNode, endNode) => {
  const animations = [];

  // Create a clean deep copy of the grid to avoid reference issues
  const gridCopy = JSON.parse(JSON.stringify(grid));

  // Map nodes from the copy back to original grid nodes for visualization
  const nodeMap = new Map();
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      nodeMap.set(`${r}-${c}`, grid[r][c]);
    }
  }

  // Reset all node properties
  for (let row of grid) {
    for (let node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.previous = null;
    }
  }

  // Set start node distance to 0
  startNode.distance = 0;

  // Create queue for unvisited nodes (using array for simplicity)
  const unvisitedQueue = [startNode];

  // While there are nodes to visit
  while (unvisitedQueue.length > 0) {
    // Sort by distance and get the closest node
    unvisitedQueue.sort((a, b) => a.distance - b.distance);
    const currentNode = unvisitedQueue.shift();

    // Skip if node is a wall
    if (currentNode.isWall) continue;

    // If we're stuck (closest node is at infinity)
    if (currentNode.distance === Infinity) {
      animations.push({
        type: "no-path",
        message: "No path found to destination!",
      });
      return animations;
    }

    // Mark as visited
    currentNode.isVisited = true;

    // Add animation for visiting this node
    animations.push({
      type: "evaluating",
      node: currentNode,
      message: `Evaluating node at (${currentNode.row}, ${currentNode.col}) with distance: ${currentNode.distance}`,
    });

    // If we found the end node
    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      // Build path
      const path = [];
      let current = currentNode;
      while (current.previous) {
        path.push(current);
        current = current.previous;
      }

      animations.push({
        type: "final-path",
        path: path.reverse(),
        message: `Path found with length ${path.length}!`,
      });

      return animations;
    }

    // Get unvisited neighbors
    const neighbors = [];
    const { row, col } = currentNode;

    // Check the four adjacent neighbors
    if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall)
      neighbors.push(grid[row - 1][col]); // Up

    if (
      row < grid.length - 1 &&
      !grid[row + 1][col].isVisited &&
      !grid[row + 1][col].isWall
    )
      neighbors.push(grid[row + 1][col]); // Down

    if (col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall)
      neighbors.push(grid[row][col - 1]); // Left

    if (
      col < grid[0].length - 1 &&
      !grid[row][col + 1].isVisited &&
      !grid[row][col + 1].isWall
    )
      neighbors.push(grid[row][col + 1]); // Right

    // Update each neighbor
    for (const neighbor of neighbors) {
      // Calculate distance
      const distance = currentNode.distance + 1;

      animations.push({
        type: "checking-neighbor",
        node: neighbor,
        message: `Checking neighbor at (${neighbor.row}, ${neighbor.col})`,
      });

      // If this path is better than previous ones
      if (distance < neighbor.distance) {
        // Update distance and previous node
        neighbor.distance = distance;
        neighbor.previous = currentNode;

        // Add to unvisited queue if not already included
        if (!unvisitedQueue.includes(neighbor)) {
          unvisitedQueue.push(neighbor);
        }

        animations.push({
          type: "update",
          node: neighbor,
          distance: neighbor.distance,
          message: `Updated node (${neighbor.row}, ${neighbor.col}) with distance=${distance}`,
        });
      }
    }
  }

  // If we've explored the entire graph and didn't find the end
  animations.push({
    type: "no-path",
    message: "No path found to destination!",
  });

  return animations;
};

// Get unvisited neighbors
const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;

  // Check the four neighboring positions
  if (row > 0) neighbors.push(grid[row - 1][col]); // up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right

  // Filter to get only unvisited neighbors that aren't walls
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
};

// Trace the path from end node back to start
const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previous;
  }
  // Remove the start node from the path if it exists
  if (nodesInShortestPathOrder.length > 0) {
    nodesInShortestPathOrder.shift();
  }
  return nodesInShortestPathOrder;
};

// Helper function to get all nodes from grid
const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

// Sort nodes by distance
const sortNodesByDistance = (nodes) => {
  nodes.sort((a, b) => a.distance - b.distance);
};

const pathfinding = {
  astar,
  dijkstra,
};

export default pathfinding;

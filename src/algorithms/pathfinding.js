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

  // Initialize distances
  for (let row of grid) {
    for (let node of row) {
      node.distance = Infinity;
    }
  }
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    // Sort by distance
    sortNodesByDistance(unvisitedNodes);

    // Get closest node
    const closestNode = unvisitedNodes.shift();

    // If we encounter a wall, skip it
    if (closestNode.isWall) continue;

    animations.push({
      type: "evaluating",
      node: closestNode,
      message: `Evaluating node at (${closestNode.row}, ${closestNode.col}) with distance: ${closestNode.distance}`,
    });

    // If the closest node is the finish, we're done
    if (closestNode === endNode) {
      // Reconstruct path
      const path = [];
      let current = endNode;
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

    // If we're trapped, exit
    if (closestNode.distance === Infinity) {
      animations.push({
        type: "no-path",
        message: "No path found to destination!",
      });
      return animations;
    }

    // Mark as visited
    closestNode.isVisited = true;
    animations.push({
      type: "visited",
      node: closestNode,
      message: `Marking node (${closestNode.row}, ${closestNode.col}) as visited`,
    });

    // Update all neighbors
    const neighbors = getNeighbors(closestNode, grid);
    for (const neighbor of neighbors) {
      animations.push({
        type: "checking-neighbor",
        node: neighbor,
        message: `Checking neighbor at (${neighbor.row}, ${neighbor.col})`,
      });

      const distance = closestNode.distance + 1;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.previous = closestNode;

        animations.push({
          type: "update",
          node: neighbor,
          distance: neighbor.distance,
          message: `Updated node (${neighbor.row}, ${neighbor.col}) with distance=${distance}`,
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

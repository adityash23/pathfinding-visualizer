import { NodesMinHeap } from "./minHeap";

export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];

  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid); // univisited nodes in a Min Heap

  while (unvisitedNodes.size() > 0) {
    console.log(unvisitedNodes.size());
    const closestNode = unvisitedNodes.extractMin(); // closest node is min value in heap

    if (closestNode.isWall) continue; // skip a wall

    if (closestNode.distance === Infinity) return visitedNodesInOrder; // no shortest path exists
    // practical scenario - walls surrounding the startNode in all directions

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === endNode) return visitedNodesInOrder;
    updateUnivisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const minHeap = new NodesMinHeap();

  for (const row of grid) {
    for (const node of row) {
      minHeap.insert(node);
    }
  }

  return minHeap;
}

function updateUnivisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnivisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1; // increment distance of all neighbors
    neighbor.previousNode = node; // remember prev node to backtrack
  }
}

function getUnivisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesShortestPath(endNode) {
  const nodeShortestPath = [];
  let currentNode = endNode;

  while (currentNode !== null) {
    nodeShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodeShortestPath;
}

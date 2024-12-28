import React from "react";
import Node from "./Node/node";

import './visualizer.css';
import { dijkstra, getNodesShortestPath } from "../Algorithms/dijkstra";

const ROWS = 15;
const COLS = 48; 
const START_COL = 5;
const START_ROW = 10;
const END_ROW = 10;
const END_COL = 20;

export default class Visualizer extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            grid : [],
            mousePressed : false,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    doMouseDown(row, col) {
        const newGrid = getNewGridWithWall(this.state.grid, row, col);
        this.setState({grid : newGrid, mousePressed : true});
    }

    doMouseEnter(row, col) {
        if (!this.state.mousePressed) return ;
        const newGrid = getNewGridWithWall(this.state.grid, row, col); // make a wall at this cell when mouse drag
        this.setState({grid : newGrid});
    }

    doMouseUp() {
        this.setState({mousePressed : false});
    }

    animateDjikstra(visitedNodesInOrder, nodesShortestPath) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            // visited all nodes to be visited -> do shortest path animation
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesShortestPath);
                }, 10 * i);
                return;
            }
            
            // still visiting the nodes
            setTimeout(() => {
                const node = visitedNodesInOrder[i];

                // re-rendering the whole grid - lag issues
                /*
                const newGrid = this.state.grid.slice();
                const newNode = {
                    ...node, 
                    isVisited : true,
                };

                newGrid[node.row][node.col] = newNode;
                this.setState({grid : newGrid}); 
                */

                // directly changing class name instead of re-render
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'; 
            }, 10 * i);
        }
    }

    animateShortestPath(nodesShortestPath) {
        for (let i = 0; i < nodesShortestPath.length; i++) {
            setTimeout(() => {
                const node = nodesShortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'; 
            }, 10 * i);
        }
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_ROW][START_COL];
        const endNode = grid[END_ROW][END_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        const nodesShortestPath = getNodesShortestPath(endNode);
        this.animateDjikstra(visitedNodesInOrder, nodesShortestPath);
    }

    render () {
        const {grid, mousePressed} = this.state;
        
        return (
            <>
            <button onClick={() => this.visualizeDijkstra()}>
                Visualize Djikstra's Algorithm
            </button>
            <div className="grid">
                {grid.map((row, rowIndex) => {
                    return (
                        <div key = {rowIndex}>
                            {row.map((node, nodeIndex) => {
                                const {row, col, isStart, isFinish, isWall} = node;
                                return (
                                    <Node
                                        key = {nodeIndex}
                                        col = {col}
                                        isStart = {isStart}
                                        isFinish = {isFinish}
                                        isWall = {isWall}
                                        mousePressed = {mousePressed}
                                        onMouseDown = {(row, col) => this.doMouseDown(row, col)}
                                        onMouseEnter = {(row, col) => this.doMouseEnter(row, col)}
                                        onMouseUp = {() => this.doMouseUp()}
                                        row = {row}></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < ROWS; row++){
        const currentRow = [];
        for (let col = 0; col < COLS; col++){
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart : row === START_ROW && col === START_COL,
        isFinish : row === END_ROW && col === END_COL,
        distance : Infinity,
        isVisited : false,
        isWall : false,
        previousNode : null,
    };
};

const getNewGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node, 
        isWall : !node.isWall,
    };

    newGrid[row][col] = newNode;
    return newGrid;
};
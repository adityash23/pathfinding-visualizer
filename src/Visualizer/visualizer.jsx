import React from "react";
import Node from "./Node/node";

import './visualizer.css';
import { dijkstra } from "../Algorithms/dijkstra";

const ROWS = 15;
const COLS = 48; 
const START_COL = 5;
const START_ROW = 10;
const END_ROW = 10;
const END_COL = 45;

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

    animateDjikstra(visitedNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const newGrid = this.state.grid.slice();
                const newNode = {
                    ...node, 
                    isVisited : true,
                };

                newGrid[node.row][node.col] = newNode;
                // this.setState({grid : newGrid}); // re-rendering the whole grid - lag issues

                // directly changing class name instead of re-render
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'; 
            }, 20 * i);
        }
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_ROW][START_COL];
        const endNode = grid[END_ROW][END_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        this.animateDjikstra(visitedNodesInOrder);
    }


/*    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < ROWS; row++){
            const currentRow = [];
            for (let col = 0; col < COLS; col++){
                const currentNode = {
                    col, 
                    row, 
                    isStart : row === 10 && col === 5,
                    isFinish : row === 10 && col === 45,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes});
    }
*/

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
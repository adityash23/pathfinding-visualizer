import React from "react";
import Node from "./Node/node";

import './visualizer.css';

const ROWS = 15;
const COLS = 48; 

export default class Visualizer extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            nodes : [],
        };
    }

    componentDidMount() {
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

    render () {
        const {nodes} = this.state;
        
        return (
            <div className="grid">
                {nodes.map((row, rowIndex) => {
                    return (
                        <div key = {rowIndex}>
                            {row.map((node, nodeIndex) => {
                                const {isStart, isFinish} = node;
                                return (
                                    <Node
                                        key = {nodeIndex}
                                        isStart = {isStart}
                                        isFinish = {isFinish}></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
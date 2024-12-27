import React from "react";
import "./node.css";

export default class Node extends React.Component {
    render() {
        const {
            col,
            isFinish, 
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp, 
            row, } = this.props;
        const secondClassName = 
        isFinish ? 'node-finish' : 
        isStart ? 'node-start' : 
        isWall ? 'node-wall' : '' ;

        return (
            <div 
                id={`node-${row}-${col}`}
                className={`node ${secondClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}  
            ></div>
        ) ;
    }
}
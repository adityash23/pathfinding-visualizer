import React from "react";
import "./node.css";

export default class Node extends React.Component {
    constructor(props) {
        super (props);
        this.state = {};
    }
    

    render() {
        const {isFinish, isStart} = this.props;
        const secondClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '' ;

        return <div className={`node ${secondClassName}`}></div> ;
    }
}

export const DEFAULT_NODE = {row : 0, col : 0};
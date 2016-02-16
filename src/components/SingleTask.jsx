import React from 'react';

import Button from 'react-bootstrap/lib/Button';



export default class SingleTask extends React.Component {

    handleStartStopClick = () => {
        this.props.onToggleStartStop(this.props.task);
    };

    handleClearClick = () => {
        this.props.onClearTask(this.props.task);
    };

    handleStartDeleteClick = () => {
        this.props.onDeleteTask(this.props.task);
    };

    render() {
        const task = this.props.task;
        if (!task) {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
        }

        return (
            <tr>
                <td>{task.name}</td>
                <td>{task.spentTime}</td>
                <td><Button onClick={this.handleStartStopClick} >
                        { task.isActive ? 'Stop' : 'Start' }
                    </Button>
                </td>
                <td><Button onClick={this.handleClearClick} >Clear</Button></td>
                <td><Button onClick={this.handleStartDeleteClick} >Delete</Button></td>
            </tr>
        );
    }
}

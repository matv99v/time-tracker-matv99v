import React from 'react';

import Button from 'react-bootstrap/lib/Button';



export default class SingleTask extends React.Component {

    handleStartStopClick = () => {
        console.log('start/stop', this.props.task.name);
    };

    handleClearClick = () => {
        console.log('clear', this.props.task.name);
    };

    handleStartDeleteClick = () => {
        console.log('SingleTask: delete', this.props.task.name);
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
                <td><Button onClick={this.handleStartStopClick} >Start/Stop</Button></td>
                <td><Button onClick={this.handleClearClick} >Clear</Button></td>
                <td><Button onClick={this.handleStartDeleteClick} >Delete</Button></td>
            </tr>
        );
    }
}

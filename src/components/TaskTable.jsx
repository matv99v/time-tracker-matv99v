import React from 'react';

import SingleTask from './SingleTask.jsx';
import Table from 'react-bootstrap/lib/Table';
import './TaskTable.less';




export default class TaskTable extends React.Component {
    render() {
        const tasks = this.props.tasks;
        return (
            <Table responsive className='TaskTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Spent time</th>
                        <th>Start/Stop</th>
                        <th>Clear</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map( (task) => {
                            return (
                                <SingleTask key={task.id}
                                            task={task}
                                            onDeleteTask={this.props.onDeleteTask}
                                />
                            );
                        })
                    }
                    <SingleTask />
                </tbody>
            </Table>




        );
    }
}

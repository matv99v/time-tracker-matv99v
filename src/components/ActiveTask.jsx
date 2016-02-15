import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


export default class ActiveTask extends React.Component {
    render() {

        const tasks = this.props.tasks;
        const activeTask = tasks.find( (task) => {
            return task.isActive === true;
        }) || {name: 'none'};

        return (
            <div className='text-center'>
                <h2>Active task: {activeTask.name} {activeTask.spentTime}</h2>
            </div>


        );
    }
}

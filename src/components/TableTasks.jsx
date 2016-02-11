import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import HeadRow from './TableTasks/HeadRow.jsx';
import OneRow from './TableTasks/OneRow.jsx';

export default React.createClass({
    render() {
        const tasks = this.props.activeTasks;
        return (
            <Table striped bordered condensed hover>

                <thead>
                    <HeadRow />
                </thead>

                <tbody>
                    {
                        tasks.map( (task, indx) => {
                            return <OneRow
                                        key={indx}
                                        name={task.name}
                                        spentTime={task.spentTime}
                                        isActive={task.isActive} />;
                        })
                    }
                </tbody>
            </Table>
        );
    }
});

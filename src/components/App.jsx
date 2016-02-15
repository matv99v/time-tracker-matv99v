import React from 'react';

import Header from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import TaskTable from './TaskTable.jsx';


export default class App extends React.Component {
    state = {
        tasks : []
    };

    handleNewTaskSubmit = (newTaskName) => {
        const {tasks} = this.state; // tasks = this.state.tasks;

        tasks.push({
            id: Date.now(),
            name: newTaskName,
            isActive: false,
            spentTime: 0
        });

        this.setState({tasks}); // {tasks: tasks}
    };

    handleTaskDelete = (taskToDelete) => {
        const storedTask = this.state.tasks;
        const ind = storedTask.indexOf(taskToDelete);

        if (ind > -1) {
            storedTask.splice(ind, 1);
            this.setState({tasks: storedTask});
        }


    }

    render() {
        return (
            <div>
                <Header />
                <CreateTask onSubmit={this.handleNewTaskSubmit} />
                <TaskTable
                    tasks={this.state.tasks}
                    onDeleteTask={this.handleTaskDelete}
                />
            </div>
        );
    }
}

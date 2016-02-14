import React from 'react';

import Header from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import TaskList from './TaskList.jsx';

export default class App extends React.Component {
    state = {
        tasks : []
    };

    handleNewTaskSubmit = (newTaskName) => {
        const {tasks} = this.state; // tasks = this.state.tasks;

        tasks.push({
            id: Date.now(),
            name: newTaskName,
            isActive: false
        });

        console.log('New tasks:');
        console.dir(tasks);

        this.setState({tasks}); // {tasks: tasks}
    };

    render() {

        return (
            <div>
                <Header />
                <CreateTask onSubmit={this.handleNewTaskSubmit} />
                <TaskList />
            </div>
        );
    }
}

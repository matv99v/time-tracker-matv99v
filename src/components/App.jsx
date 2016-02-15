import React from 'react';

import Header from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import TaskTable from './TaskTable.jsx';
import ActiveTask from './ActiveTask.jsx';

import Timer from '../Timer.js';

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
            spentTime: 0,
            timerAPI: new Timer()
        });

        this.setState({tasks}); // {tasks: tasks}
    };

    handleTaskDelete = (taskToDelete) => {
        const storedTasks = this.state.tasks;
        const ind = storedTasks.indexOf(taskToDelete);

        if (ind > -1) {
            storedTasks.splice(ind, 1);
            this.setState({tasks: storedTasks});
        }
    };

    handleTaskClear = (taskToClear) => {
        const storedTasks = this.state.tasks;
        const ind = storedTasks.indexOf(taskToClear);

        storedTasks[ind].spentTime = 100;
        this.setState({tasks: storedTasks});
    };

    handleTaskStartStop = (taskToToggleStartStop) => {
        const storedTasks = this.state.tasks;
        const ind = storedTasks.indexOf(taskToToggleStartStop);
        const currActiveTask = storedTasks[ind];

        if (!storedTasks[ind].isActive) { // reset all 'isActive' states
            storedTasks.forEach( (task) => {
                task.isActive = false;
            });
        }

        storedTasks[ind].isActive = !storedTasks[ind].isActive; // toggle isActive state

        this.setState({tasks: storedTasks});
    };



    render() {
        return (
            <div>
                <Header />
                <CreateTask onSubmit={this.handleNewTaskSubmit} />
                <ActiveTask tasks={this.state.tasks} />
                <TaskTable
                    tasks={this.state.tasks}
                    onDeleteTask={this.handleTaskDelete}
                    onClearTask={this.handleTaskClear}
                    onToggleStartStop={this.handleTaskStartStop}
                />
            </div>
        );
    }
}

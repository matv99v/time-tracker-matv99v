import React from 'react';

import Header from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import TaskTable from './TaskTable.jsx';
import ActiveTask from './ActiveTask.jsx';

import Timer from '../Timer.js';

export default class App extends React.Component {
    state = {
        tasks : [],
        activeTaskId : null
    };

    handleNewTaskSubmit = (newTaskName) => {
        const {tasks} = this.state; // tasks = this.state.tasks;

        tasks.push({
            id: Date.now(),
            name: newTaskName,
            isActive: false,
            spentTime: '00:00:00',
            timerAPI: new Timer()
        });

        this.setState({tasks}); // {tasks: tasks}
    };

    handleTaskDelete = (taskToDelete) => {
        const storedTasks = this.state.tasks;
        const ind = storedTasks.indexOf(taskToDelete);

        storedTasks.splice(ind, 1);

        if (taskToDelete.isActive) {
            clearInterval(this.interval);
        }

        this.setState({
            tasks: storedTasks,
            activeTaskId: null
        });
    };

    handleTaskClear = (taskToClear) => {
        const storedTasks = this.state.tasks;

        taskToClear.timerAPI.clear();
        taskToClear.spentTime = this.parseTimeString(
            taskToClear.timerAPI.getSpentTime()
        );

        this.setState({tasks: storedTasks});
    };

    handleTaskStartStop = (taskToToggleStartStop) => {
        const storedTasks = this.state.tasks;
        const ind = storedTasks.indexOf(taskToToggleStartStop);

        if (!taskToToggleStartStop.isActive) {
            clearInterval(this.interval);

            storedTasks.forEach( (task) => {
                task.timerAPI.stop();
                task.isActive = false;
            });

            taskToToggleStartStop.isActive = true;
            taskToToggleStartStop.timerAPI.start();

            this.interval = setInterval( () => {
                taskToToggleStartStop.spentTime = this.parseTimeString(
                    taskToToggleStartStop.timerAPI.getSpentTime()
                );

                this.setState({tasks: storedTasks});
            }, 1000);

        } else {
            taskToToggleStartStop.timerAPI.stop();
            taskToToggleStartStop.isActive = false;
            clearInterval(this.interval);
        }

        this.setState({ tasks: storedTasks,
                        activeTaskId:   taskToToggleStartStop.isActive
                                        ? taskToToggleStartStop.id
                                        : null
        });
    };

    parseTimeString = (timeNum) => {
        function addZero(arg) {
            const numOfDigits = (arg + '').length;
            return '00'.slice(0, 2 - numOfDigits);
        }

        const seconds = (timeNum / 1000).toFixed() % 60;
        const minutes =  Math.floor(timeNum / 60000) % 60;
        const hours =  Math.floor( timeNum / (60000 * 60) );

        return (addZero(hours) + hours + ':' +
                addZero(minutes) + minutes + ':' +
                addZero(seconds) + seconds
        );
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

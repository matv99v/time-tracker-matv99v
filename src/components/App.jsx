import React      from 'react';
import Header     from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import ActiveTask from './ActiveTask.jsx';
import TasksList  from './TasksList.jsx';

import Timer  from '../Timer.js';

export default class App extends React.Component {
    interval = null;

    state = {
        tasks        : [],
        activeTaskId : null
    };


    handleNewTaskSubmit = (taskName) => {
        this.state.tasks.push({
            name     : taskName,
            spentTime: 0,
            isActive : false,
            id       : Date.now(),
            timer    : new Timer()
        });
        this.setState({tasks: this.state.tasks});
    };

    handleStartTask = (taskID) => {
        clearInterval(this.interval);
        const prevActiveTaskId = this.state.activeTaskId;

        const tasks = this.state.tasks.map( (task) => {
            if (task.id === taskID) {
                task.isActive = true;
                task.timer.start();
            } else if (task.id === prevActiveTaskId) {
                task.isActive = false;
                task.timer.stop();
            }
            return task;
        });

        this.initTimerInterval();
        this.setState({
            tasks,
            activeTaskId: taskID
        });
    };

    handleStopTask = (taskID) => {
        clearInterval(this.interval);

        const tasks = this.state.tasks.map( (task) => {
            if (task.id === taskID) {
                task.isActive = false;
                task.timer.stop();
            }
            return task;
        });

        this.setState({
            tasks,
            activeTaskId: null
        });

    };

    handleClearTimer = (taskID) => {
        const tasks = this.state.tasks.map( (task) => {
            if (task.id === taskID) {
                task.timer.clear();
                task.spentTime = task.timer.getSpentTime();
            }
            return task;
        });

        this.setState({tasks});
    };

    handleDeleteTask = (taskID) => {
        if (this.state.activeTaskId === taskID) clearInterval(this.interval);
        const tasks = this.state.tasks.filter( (task) => task.id !== taskID );

        this.setState({
            tasks,
            activeTaskId: null
        });
    };

    initTimerInterval = () => {
        this.interval = setInterval( () => {
            const tasks = this.state.tasks.map( (task) => {
                if (task.isActive) task.spentTime = task.timer.getSpentTime();
                return task;
            });

            this.setState({tasks});
        }, 1000);

    };

    handleParseTimeString = (timeNum) => {
        function addZero(arg) {
            const numOfDigits = (arg + '').length;
            return '00'.slice(0, 2 - numOfDigits);
        }

        const seconds = (timeNum / 1000).toFixed() % 60;
        const minutes = Math.floor(timeNum / 60000) % 60;
        const hours   = Math.floor( timeNum / (60000 * 60) );

        return (addZero(hours)   + hours   + ':' +
                addZero(minutes) + minutes + ':' +
                addZero(seconds) + seconds
        );
    };

    render() {
        return (
            <div>
                <Header />
                <CreateTask onSubmit   = { this.handleNewTaskSubmit } />

                <ActiveTask activeTask      = { this.state.tasks.find( (task) => task.id === this.state.activeTaskId )}
                            parseTimeString = {this.handleParseTimeString}
                />

                <TasksList tasks           = {this.state.tasks}
                           onStartTask     = {this.handleStartTask}
                           onStopTask      = {this.handleStopTask}
                           onClearTimer    = {this.handleClearTimer}
                           onDeleteTask    = {this.handleDeleteTask}
                           parseTimeString = {this.handleParseTimeString}
                />
            </div>
        );
    }
}

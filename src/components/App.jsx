import React      from 'react';
import Header     from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import ActiveTask from './ActiveTask.jsx';
import TasksList  from './TasksList.jsx';

import Timer      from '../Timer.js';

export default class App extends React.Component {
    interval = null;

    state = {
        tasks        : [],
        activeTaskId : null
    };

    timersStorage = {
        addTimer    : (id) => this.timersStorage[id] = new Timer(),
        deleteTimer : (id) => delete this.timersStorage[id]
    };

    handleNewTaskSubmit = (taskName) => {
        const initTaskState = {
            name     : taskName,
            spentTime: 0,
            isActive : false,
            id       : Date.now()
        };
        const newState = JSON.parse(JSON.stringify(this.state));

        newState.tasks.push(initTaskState);
        this.timersStorage.addTimer(initTaskState.id);
        this.setState(newState);
    };

    handleStartTask = (taskId) => {
        clearInterval(this.interval);
        const newState = JSON.parse(JSON.stringify(this.state));
        const prevActiveTaskId = newState.activeTaskId;

        newState.tasks.forEach( (task) => {
            if (task.id === taskId) {
                task.isActive = true;
                this.timersStorage[task.id].start();
            }
            if (task.id === prevActiveTaskId) {
                task.isActive = false;
                this.timersStorage[task.id].stop();
            }
        });

        newState.activeTaskId = taskId;
        this.initTimerInterval();
        this.setState(newState);
    };

    handleStopTask = (taskId) => {
        clearInterval(this.interval);
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.activeTaskId = null;

        newState.tasks.forEach( (task) => {
            if (task.id === taskId) {
                task.isActive = false;
                this.timersStorage[taskId].stop();
            }
        });

        this.setState(newState);
    };

    handleClearTimer = (taskId) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.tasks.forEach( (task) => {
            if (task.id === taskId) {
                this.timersStorage[taskId].clear();
                task.spentTime = this.timersStorage[taskId].getSpentTime();
            }
        });

        this.setState(newState);
    };

    handleDeleteTask = (taskId) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.tasks = this.state.tasks.filter( (task) => task.id !== taskId );

        if (newState.activeTaskId === taskId) {
            clearInterval(this.interval);
            newState.activeTaskId = null;
            this.setState(newState);
        }
        else this.setState(newState);
    };

    initTimerInterval = () => {
        this.interval = setInterval( () => {
            const newState = JSON.parse(JSON.stringify(this.state));

            newState.tasks.forEach( (task) => {
                if (task.isActive) task.spentTime = this.timersStorage[task.id].getSpentTime();
            });

            this.setState(newState);
        }, 1000);

    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        return JSON.stringify(this.state) !== JSON.stringify(nextState);
    };

    render() {
        return (
            <div >
                <Header />
                <CreateTask onSubmit   = { this.handleNewTaskSubmit } />

                <ActiveTask activeTask      = { this.state.tasks.find( (task) => task.id === this.state.activeTaskId )}
                />

                <TasksList tasks           = {this.state.tasks}
                           onStartTask     = {this.handleStartTask}
                           onStopTask      = {this.handleStopTask}
                           onClearTimer    = {this.handleClearTimer}
                           onDeleteTask    = {this.handleDeleteTask}
                />
            </div>
        );
    }
}

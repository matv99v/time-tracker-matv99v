import React      from 'react';
import Header     from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import ActiveTask from './ActiveTask.jsx';
import TasksList  from './TasksList.jsx';
import Reminder  from './Reminder.jsx';

import Timer      from '../Timer.js';

export default class App extends React.Component {
    interval = null;

    state = {
        tasks        : [],
        activeTaskId : null
    };

    timersStorage = {
        addTimer    : (id, startTime = 0) => this.timersStorage[id] = new Timer(startTime),
        deleteTimer : (id) => delete this.timersStorage[id]
    };

    handleNewTaskSubmit = (taskName, spentTime) => {
        const taskState = this.getTaskState(taskName, spentTime);
        const newState = JSON.parse(JSON.stringify(this.state));

        newState.tasks.push(taskState);
        this.timersStorage.addTimer(taskState.id);
        this.setState(newState);
    };

    getTaskState = (taskName, spentTime = 0) => {
        return {
            name     : taskName,
            spentTime: spentTime,
            isActive : false,
            id       : Date.now()
        };
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
        if (confirm('Are you sure want to clear time?')) {
            const newState = JSON.parse(JSON.stringify(this.state));
            newState.tasks.forEach( (task) => {
                if (task.id === taskId) {
                    this.timersStorage[taskId].clear();
                    task.spentTime = this.timersStorage[taskId].getSpentTime();
                }
            });

            this.setState(newState);
        }
    };

    handleDeleteTask = (taskId) => {
        if (confirm('Are you sure want to delete task?')) {
            const newState = JSON.parse(JSON.stringify(this.state));
            newState.tasks = this.state.tasks.filter( (task) => task.id !== taskId );

            if (newState.activeTaskId === taskId) {
                clearInterval(this.interval);
                newState.activeTaskId = null;
                this.setState(newState);
            }
            else this.setState(newState);
        }

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

    getGeneralTime = () => {
        return this.state.tasks.reduce((sum, task) => sum + task.spentTime, 0);
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
        // window.removeEventListener('beforeunload', this.hanldeWindowClose);
    };

    componentWillMount = () => {
        const restoredState = JSON.parse(localStorage.getItem('timer'));
        console.log('restoredState', restoredState);

        if (restoredState && restoredState.tasks.length) {
            let activeTask = null;

            restoredState.tasks.forEach(task => {
                this.timersStorage.addTimer(task.id, task.spentTime);
                if (task.isActive) activeTask = task;
            });

            this.setState(restoredState);

            if (activeTask) {
                this.handleStartTask(activeTask.id);
            }
        }
    };

    // componentDidMount = () => {
    //     console.log('beforeunload');
    //     window.addEventListener('beforeunload', this.hanldeWindowClose);
    // };

    // hanldeWindowClose = (e) => {
        // e.preventDefault();
        // if (!JSON.parse(localStorage.getItem('timer')).tasks.length) {
        // }
        // debugger;
        // const test = JSON.parse(localStorage.getItem('timer').tasks.length);
        // if (test) {
        //     localStorage.setItem('timer', JSON.stringify(this.state));
        // }
    // };

    shouldComponentUpdate = (nextProps, nextState) => {
        return JSON.stringify(this.state) !== JSON.stringify(nextState);
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.tasks.length) {
            localStorage.setItem('timer', JSON.stringify(this.state));
        }
    };

    stopActiveTaskHandler = () => {
        console.log('stopActiveTaskHandler');
        this.handleStopTask(this.state.activeTaskId);
    };


    render() {
        return (
            <div>
                <Reminder stopActiveTask = { this.stopActiveTaskHandler } />
                <CreateTask onSubmit = { this.handleNewTaskSubmit } />
                <Header
                    generalTime = {this.getGeneralTime()}
                    isVisible   = {this.state.tasks.length}
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

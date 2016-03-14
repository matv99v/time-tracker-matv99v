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

        this.state.tasks.push(initTaskState);
        this.timersStorage.addTimer(initTaskState.id);
        this.setState({tasks: this.state.tasks});
    };

    handleStartTask = (taskId) => {
        clearInterval(this.interval);
        const prevActiveTaskId = this.state.activeTaskId;

        const tasks = this.state.tasks.map( (task) => {
            if (task.id === taskId) {
                task.isActive = true;
                this.timersStorage[taskId].start();
            } else if (task.id === prevActiveTaskId) {
                task.isActive = false;
                this.timersStorage[taskId].stop();
            }
            return task;
        });

        this.initTimerInterval();
        this.setState({
            tasks,
            activeTaskId: taskId
        });
    };

    handleStopTask = (taskId) => {
        clearInterval(this.interval);

        const tasks = this.state.tasks.map( (task) => {
            if (task.id === taskId) {
                task.isActive = false;
                this.timersStorage[taskId].stop();
            }
            return task;
        });

        this.setState({
            tasks,
            activeTaskId: null
        });

    };

    handleClearTimer = (taskId) => {
        const tasks = this.state.tasks.map( (task) => {
            if (task.id === taskId) {
                this.timersStorage[taskId].clear();
                task.spentTime = this.timersStorage[taskId].getSpentTime();
            }
            return task;
        });

        this.setState({tasks});
    };

    handleDeleteTask = (taskId) => {
        const tasks = this.state.tasks.filter( (task) => task.id !== taskId );

        if (this.state.activeTaskId === taskId) {
            clearInterval(this.interval);
            this.setState({
                tasks,
                activeTaskId: null
            });
        }
        else this.setState({tasks});
    };

    initTimerInterval = () => {
        this.interval = setInterval( () => {
            const tasks = this.state.tasks.map( (task) => {
                if (task.isActive) task.spentTime = this.timersStorage[task.id].getSpentTime();
                return task;
            });

            this.setState({tasks});
        }, 1000);

    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
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

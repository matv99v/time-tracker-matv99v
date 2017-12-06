import React      from 'react';
import Header     from './Header.jsx';
import CreateTask from './CreateTask.jsx';
import ActiveTask from './ActiveTask.jsx';
import TasksList  from './TasksList.jsx';
import Reminder  from './Reminder.jsx';
import ModalDialog   from './ModalDialog.jsx';
import Timer      from '../Timer.js';
import tabTitler   from '../tabTitler.js';



export default class App extends React.Component {
    state = {
        tasks              : [],
        activeTaskId       : null,
        remindTime         : (1000 * 5),
        absenceTime        : (1000 * 5),
        activationTimeStamp: Date.now(),
        areYouHereTimeStamp: null,
        isWatcherActive    : false,
        areYouHereModal    : false
    };

    timersStorage = {
        addTimer    : (id, startTime = 0) => this.timersStorage[id] = new Timer(startTime),
        deleteTimer : (id) => delete this.timersStorage[id]
    };

    handleNewTaskSubmit = (taskName) => {
        const id = Date.now();
        const newTasks = [
            ...this.state.tasks,
            {
                name     : taskName,
                spentTime: 0,
                isActive : false,
                id
            }
        ];
        this.timersStorage.addTimer(id);
        this.setState({tasks: newTasks});
    };

    handleStartTask = (taskId) => {
        clearInterval(this.intervalId);
        const prevActiveTaskId = this.state.activeTaskId;
        const newStateTasks = [...this.state.tasks];

        newStateTasks.forEach( (task) => {
            if (task.id === taskId) {
                task.isActive = true;
                this.timersStorage[task.id].start();
            }
            if (task.id === prevActiveTaskId) {
                task.isActive = false;
                this.timersStorage[task.id].stop();
            }
        });

        this.initTimerInterval();
        this.setState({tasks: newStateTasks, activeTaskId: taskId});
    };

    handleStopTask = (taskId) => {
        clearInterval(this.intervalId);
        const newStateTasks = [...this.state.tasks];
        const targetTask = newStateTasks.find((task) => task.id === taskId);
        targetTask.isActive = false;
        this.timersStorage[targetTask.id].stop();
        this.setState({tasks: newStateTasks, activeTaskId: null});
    };

    handleClearTimer = (taskId) => {
        if (confirm('Are you sure want to clear time?')) {
            const newStateTasks = [...this.state.tasks];
            const targetTask = newStateTasks.find((task) => task.id === taskId);
            targetTask.spentTime = this.timersStorage[taskId].getSpentTime();
            this.timersStorage[taskId].clear();
            this.setState({tasks: newStateTasks});
        }
    };

    handleDeleteTask = (taskId) => {
        if (confirm('Are you sure want to delete task?')) {
            const newStateTasks = this.state.tasks.filter( (task) => task.id !== taskId );

            if (this.state.activeTaskId === taskId) {
                clearInterval(this.intervalId);
                this.setState({tasks: newStateTasks, activeTaskId: null});
            } else {
                this.setState({tasks: newStateTasks});
            }
        }

    };

    intervalId = null;

    initTimerInterval = () => {
        this.intervalId = setInterval( () => {
            const newStateTasks = [...this.state.tasks];
            const activeTask = newStateTasks.find(task => task.isActive);
            activeTask.spentTime = this.timersStorage[activeTask.id].getSpentTime();

            this.setState({tasks: newStateTasks});
            this.check();

        }, 1000);

    };

    check = () => {
        function msToSec(ms) {
            return Math.floor(ms / 1000);
        }

        const diffSec = msToSec(Date.now() - this.state.activationTimeStamp);
        const remindSec = msToSec(this.state.remindTime);

        console.log(diffSec);
        if (!(diffSec % remindSec) && !this.state.areYouHereModal) {
            console.log('start absence timer');
            tabTitler.startSprites();
            this.setState({areYouHereModal: true});
        }
    };

    getGeneralTime = () => {
        return this.state.tasks.reduce((sum, task) => sum + task.spentTime, 0);
    };

    componentWillUnmount = () => {
        clearInterval(this.intervalId);
    };

    stopActiveTaskHandler = () => {
        console.log('stopActiveTaskHandler');
        this.handleStopTask(this.state.activeTaskId);
    };

    toggleWatcherHandler = () => {
        this.setState({isWatcherActive: !this.state.isWatcherActive});
        console.log('toggleWatcherHandler');
    };

    confirmPresenceClickHandler = () => {
        console.log('confirmPresenceClickHandler, stop absence timer');
        tabTitler.stopSprites();
        this.setState({areYouHereModal: false});
    };

    startAbsenceTimer = () => {
        console.log('startAbsenceTimer');
    };



    render() {
        return (
            <div>
                <Reminder
                    stopActiveTask  = {this.stopActiveTaskHandler}
                    reminderTime    = {this.state.reminderTime}
                    absenceTime     = {this.state.absenceTime}
                    isWatcherActive = {this.state.isWatcherActive}
                    toggleWatcher   = {this.toggleWatcherHandler}
                />

                <CreateTask
                    onSubmit = {this.handleNewTaskSubmit}
                />

                <Header
                    generalTime = {this.getGeneralTime()}
                    isVisible   = {this.state.tasks.length}
                />

                <TasksList
                    tasks           = {this.state.tasks}
                    onStartTask     = {this.handleStartTask}
                    onStopTask      = {this.handleStopTask}
                    onClearTimer    = {this.handleClearTimer}
                    onDeleteTask    = {this.handleDeleteTask}
                />

                <ModalDialog
                    isVisible     = {this.state.areYouHereModal}
                    header        = {'Watcher'}
                    body          = {'Are you here?'}
                    btnWording    = {'yes'}
                    clickYesCb    = {this.confirmPresenceClickHandler}
                />

            </div>
        );
    }
}

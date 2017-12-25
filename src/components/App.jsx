import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import moment      from 'moment';

import CreateTask  from './CreateTask.jsx';
import TasksList   from './TasksList.jsx';
import Settings    from './Settings.jsx';
import ModalDialog from './ModalDialog.jsx';
import Test        from './Test.jsx';
import tabTitler   from '../tabTitler.js';
import ts          from '../timersStorage.js';
import notifyMe    from '../notifyMe';





// const initId = Date.now();
//
// const initTasks = [
//     {
//         name     : 'test1',
//         spentTime: 3000
//     },
//     {
//         name     : 'test2',
//         spentTime: 5000
//     },
//     {
//         name     : 'test3',
//         spentTime: 1000 * 62
//     }
// ];
//
// initTasks.forEach((task, i) => {
//     task.id = initId + i;
//     ts.setTimer(task.id, task.spentTime);
//
// });


export default class App extends React.Component {
    state = {
        tasks           : [], // initTasks
        activeTaskId    : null,
        remindTimeout   : (1000 * 60) * 0.08,
        isWatcherActive : false,
        areYouHereModal : false,
        sessionTime     : null,
        absenceTime     : null
    };

    handleNewTaskSubmit = (taskName) => {
        const newTask = {
            name     : taskName,
            spentTime: 0,
            id       : Date.now()
        };

        const newTasks = [...this.state.tasks, newTask];
        ts.setTimer(newTask.id);
        this.setState({tasks: newTasks}, this.presenceConfirmed);
    };

    handleStartTask = (taskId) => {
        this.setState((prevState, props) => {
            ts.getTimer(taskId).start();

            if (prevState.activeTaskId) {
                ts.getTimer(prevState.activeTaskId).stop();
            }

            this.presenceConfirmed();
            return {activeTaskId: taskId};
        });

        tabTitler.setPlay();
    };

    handleStopTask = (taskId) => {
        ts.getTimer(taskId).stop();
        this.setState({activeTaskId: null}, this.presenceConfirmed);
        tabTitler.setStop();
    };

    handleClearTimer = (taskId) => {
        if (!confirm('Are you sure want to clear time?')) {
            return;
        }
        const newStateTasks = [...this.state.tasks];
        const targetTask = newStateTasks.find(task => task.id === taskId);
        targetTask.spentTime = ts.getTimer(taskId).getSpentTime();
        ts.getTimer(taskId).clear();
        this.setState({tasks: newStateTasks}, this.presenceConfirmed);
    };

    handleDeleteTask = (taskId) => {
        if (!confirm('Are you sure want to delete task?')) {
            return;
        }

        ts.deleteTimer(taskId);

        const newStateTasks = this.state.tasks.filter(task => task.id !== taskId );

        this.setState({
            tasks: newStateTasks,
            activeTaskId: this.state.activeTaskId === taskId ? null : this.state.activeTaskId
        }, this.presenceConfirmed);
    };

    presenceConfirmed = () => {
        ts.getTimer('absence').clear();
        this.backupTimers();
    };

    getGeneralTime = () => {
        return this.state.tasks.reduce((sum, task) => sum + task.spentTime, 0);
    };

    componentWillUnmount = () => {
        this.backupTimers();
        clearInterval(this.intervalRef);
    };

    componentWillMount = () => {
        ts.setTimer('absence').start();
        ts.setTimer('session').start();

        const timersStr = localStorage.getItem('timers');

        if (timersStr) {
            const tasks = JSON.parse(timersStr);
            tasks.forEach(task => {
                ts.setTimer(task.id, task.spentTime);
            });

            this.setState({
                tasks
            });
        }

    };

    intervalRef = setTimeout(() => {
        this.tick();
    }, 1000);

    tick = () => {
        const newTasks = [...this.state.tasks];

        if (this.state.activeTaskId) {
            const activeTask = newTasks.find(task => task.id === this.state.activeTaskId);
            activeTask.spentTime = ts.getTimer(this.state.activeTaskId).getSpentTime();
        }

        this.setState({
            sessionTime: ts.getTimer('session').getSpentTime(),
            absenceTime: ts.getTimer('absence').getSpentTime(),
            tasks: newTasks
        });

        this.intervalRef = setTimeout(this.tick, 1000);

        this.checkPresence();
        this.checkBackup();
    }

    intervalRef = null;

    checkPresence = () => {
        const notificationPredicate = this.state.isWatcherActive &&
            this.state.activeTaskId &&
            !this.state.areYouHereModal &&
            ts.getTimer('absence').getSpentTime() > this.state.remindTimeout;

        if (notificationPredicate) {
            notifyMe.spawnNotification();
            this.setState({areYouHereModal: true});
            tabTitler.startSprites();
        }
    };

    checkBackup = () => {
        const seconds = +moment.duration(this.state.sessionTime).format({
            template: 'ss',
            trim: false
        });

        const backupLocalStoragePredicate = !(seconds % 60); // make record to localStorage every 60 seconds

        if (backupLocalStoragePredicate) {
            this.backupTimers();
        }
    };

    backupTimers = () => {
        console.log('backup to localStorage');
        localStorage.setItem('timers', JSON.stringify(this.state.tasks));
    };

    stopActiveTaskHandler = () => {
        this.handleStopTask(this.state.activeTaskId);
    };

    toggleWatcherHandler = () => {
        this.setState({isWatcherActive: !this.state.isWatcherActive});
        this.presenceConfirmed();
    };

    leaveAsIsCb = () => {
        tabTitler.stopSprites();
        this.setState({areYouHereModal: false});
        this.presenceConfirmed();
    };

    revertTime = () => {
        const newTasks = [...this.state.tasks];
        const activeTask = newTasks.find(task => task.id = this.state.activeTaskId);

        ts.getTimer(activeTask.id).subtract(
            ts.getTimer('absence').getSpentTime()
        );

        tabTitler.stopSprites();
        this.setState({areYouHereModal: false, tasks: newTasks});
        this.presenceConfirmed();
    };

    changeRemindTimeHandler = (event) => {
        this.presenceConfirmed();
        this.setState({remindTimeout: event.target.value * 60 * 1000});
    };

    render() {
        return (
            <Grid>

                <Row>
                    <Test />
                </Row>
                <Row>
                    <Col>
                        <Settings
                            isWatcherActive  = {this.state.isWatcherActive}
                            toggleWatcher    = {this.toggleWatcherHandler}
                            accumulatedTime  = {this.getGeneralTime()}
                            absenceTime      = {this.state.sessionTime}
                            sessionTime      = {this.state.absenceTime}
                            remindTimeout    = {this.state.remindTimeout}
                            changeRemindTime = {this.changeRemindTimeHandler}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <CreateTask
                            onSubmit = {this.handleNewTaskSubmit}
                        />
                    </Col>
                </Row>

                <Row>
                    <TasksList
                        tasks        = {this.state.tasks}
                        onStartTask  = {this.handleStartTask}
                        onStopTask   = {this.handleStopTask}
                        onClearTimer = {this.handleClearTimer}
                        onDeleteTask = {this.handleDeleteTask}
                        activeTaskId = {this.state.activeTaskId}
                    />
                </Row>

                <Row>
                    <ModalDialog
                        isVisible   = {this.state.areYouHereModal}
                        leaveAsIsCb = {this.leaveAsIsCb}
                        revertTime  = {this.revertTime}
                        idleTime    = {ts.getTimer('absence').getSpentTime()}
                    />
                </Row>

            </Grid>

        );
    }
}

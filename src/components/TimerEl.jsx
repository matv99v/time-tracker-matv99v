import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import Button      from 'react-bootstrap/lib/Button';

import TimerElBaseLifecycle      from './TimerElBaseLifecycle.jsx';
import CreateTask      from './CreateTask.jsx';
import TasksList       from './TasksList.jsx';
import AreYouHereModal from './AreYouHereModal.jsx';
import Settings        from './Settings.jsx';
import Navigation      from './Navigation.jsx';
import ts              from '../timersStorage.js';
import utils              from '../utils.js';

import './TimerEl.less';



export default class TimerEl extends TimerElBaseLifecycle {
    state = {
        tasks: [],
        activeTaskId: null,
        areYouHereModal: false,
        showSettingsModal: false,
        settings: {
            isWatcherActive: false,
            remindTimeout: (1000 * 60) * 0.08
        }
    };

    // tasks control

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
    };

    handleStopTask = (taskId) => {
        ts.getTimer(taskId).stop();
        this.setState({activeTaskId: null}, this.presenceConfirmed);
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

    getGeneralTime = () => {
        return this.state.tasks.reduce((sum, task) => sum + task.spentTime, 0);
    };

    // interval update

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
            tasks: newTasks
        });

        this.intervalRef = setTimeout(this.tick, 1000);

        this.checkPresence();
        this.checkBackup();
    }

    checkPresence = () => {
        const notificationPredicate = this.state.settings.isWatcherActive &&
            this.state.activeTaskId &&
            !this.state.areYouHereModal &&
            ts.getTimer('absence').getSpentTime() > this.state.settings.remindTimeout;

        if (notificationPredicate) {
            this.setState({areYouHereModal: true});
        }
    };

    presenceConfirmed = () => {
        ts.getTimer('absence').clear();
        this.backupTimers();
    };

    checkBackup = () => {
        const sessionTime =  ts.getTimer('session').getSpentTime();
        const seconds = +utils.getSeconds(sessionTime);
        const backupLocalStoragePredicate = !(seconds % 60); // make record to localStorage every 60 seconds

        if (backupLocalStoragePredicate) {
            this.backupTimers();
        }
    };

    backupTimers = () => {
        console.log('backup to localStorage');
        localStorage.setItem('timers', JSON.stringify(this.state.tasks));
    };

    // are you here modal

    leaveAsIsCb = () => {
        this.setState({areYouHereModal: false});
        this.presenceConfirmed();
    };

    revertTime = () => {
        const newTasks = [...this.state.tasks];
        const activeTask = newTasks.find(task => task.id = this.state.activeTaskId);

        ts.getTimer(activeTask.id).subtract(
            ts.getTimer('absence').getSpentTime()
        );

        this.setState({areYouHereModal: false, tasks: newTasks});
        this.presenceConfirmed();
    };

    // settings

    toggleSettingsModal = (newSettings) => {
        let newState = {showSettingsModal: !this.state.showSettingsModal};

        if (this.state.showSettingsModal) {
            newState = {
                ...newState,
                settings: {...newSettings}
            };
        }

        this.setState(newState);
    };

    render() {
        const gt = utils.formatTime(this.getGeneralTime());
        return (
            <Grid>

                <Row>
                    <Col className='Timer__settingsBtn'>
                        <Button onClick={this.toggleSettingsModal} >
                            Settings
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col className='Timer__accumulatedTime'>
                        <h3>Accumulated time: {gt}</h3>
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
                    <AreYouHereModal
                        isVisible   = {this.state.areYouHereModal}
                        leaveAsIsCb = {this.leaveAsIsCb}
                        revertTime  = {this.revertTime}
                        idleTime    = {ts.getTimer('absence').getSpentTime()}
                    />
                </Row>

                <Row>
                    <Settings
                        isVisible      = {this.state.showSettingsModal}
                        settings       = {this.state.settings}
                        updateSettings = {this.toggleSettingsModal}
                    />
                </Row>

            </Grid>

        );
    }
}

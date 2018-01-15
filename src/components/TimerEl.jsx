import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import Button      from 'react-bootstrap/lib/Button';

import CreateTask      from './CreateTask.jsx';
import TasksList       from './TasksList.jsx';
import AreYouHereModal from './AreYouHereModal.jsx';
import Settings        from './Settings.jsx';
import Navigation      from './Navigation.jsx';
import ts              from '../timersStorage.js';
import utils              from '../utils.js';

import './TimerEl.less';



export default class TimerEl extends React.Component {
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

    handleNewTaskSubmit = (name, spentTime = 0, id = Date.now()) => {
        utils.log(`handleNewTaskSubmit name: ${name}, spentTime: ${spentTime}, id: ${id}`);
        const newTask = { name, spentTime, id };
        const newTasks = this.state.tasks.map(t => ({...t})); // clone array of objects
        this.setState({tasks: [newTask, ...newTasks]}, () => {
            ts.setTimer(newTask.id, spentTime);
        });
    };

    handleStartTask = (taskId) => {
        utils.log(`handleStartTask ${taskId}`);
        this.setState((prevState, props) => {
            if (prevState.activeTaskId) { // stop prev active task
                ts.getTimer(prevState.activeTaskId).stop();
            }
            return { activeTaskId: taskId };
        }, () => {
            ts.getTimer(taskId).start();
        });
    };

    handleStopTask = (taskId) => {
        utils.log(`handleStopTask ${taskId}`);
        this.setState({activeTaskId: null}, () => {
            ts.getTimer(taskId).stop();
        });
    };

    handleClearTimer = (taskId) => {
        utils.log(`handleClearTimer ${taskId}`);
        // if (!confirm('Are you sure want to clear time?')) {
        //     return;
        // }
        const newTasks = this.state.tasks.map(t => ({...t})); // clone array of objects
        const targetTask = newTasks.find(task => task.id === taskId);
        targetTask.spentTime = 0;
        this.setState({tasks: newTasks}, () => {
            ts.getTimer(taskId).clear();
        });
    };

    handleDeleteTask = (taskId) => {
        utils.log(`handleDeleteTask ${taskId}`);
        // if (!confirm('Are you sure want to delete task?')) {
        //     return;
        // }
        const newTasks = this.state.tasks
            .map(t => ({...t})) // clone array of objects
            .filter(task => task.id !== taskId); // filter without deleted task
        this.setState({
            tasks: newTasks,
            activeTaskId: this.state.activeTaskId === taskId ? null : this.state.activeTaskId
        }, () => {
            ts.deleteTimer(taskId);
        });
    };

    getGeneralTime = () => {
        return this.state.tasks.reduce((sum, task) => sum + task.spentTime, 0);
    };

    // interval update

    intervalRef = setTimeout(() => {
        this.tick();
    }, 1000);

    tick = () => {
        // update active task spent time
        const newTasks = this.state.tasks.map(t => ({...t})); // clone array of objects
        if (this.state.activeTaskId) {
            const activeTask = newTasks.find(task => task.id === this.state.activeTaskId);
            activeTask.spentTime = ts.getTimer(this.state.activeTaskId).getSpentTime();
        }
        let newState = { tasks: newTasks };
        // check absence state
        const notificationPredicate = this.state.settings.isWatcherActive &&
            this.state.activeTaskId &&
            !this.state.areYouHereModal &&
            ts.getTimer('absence').getSpentTime() > this.state.settings.remindTimeout;
        if (notificationPredicate) {
            newState = {...newState,  ...{areYouHereModal: true} };
        }
        this.setState(newState, () => {
            this.intervalRef = setTimeout(this.tick, 1000); // restart 1 sec update tick
        });
    }

    // are you here modal

    leaveAsIsCb = () => {
        this.setState({areYouHereModal: false});
    };

    revertTime = () => {
        const newTasks = this.state.tasks.map(t => ({...t})); // clone array of objects
        const activeTask = newTasks.find(task => task.id = this.state.activeTaskId);
        const targetTimer = ts.getTimer(activeTask.id);
        const absenceTimer = ts.getTimer('absence');
        this.setState({areYouHereModal: false, tasks: newTasks}, () => {
            targetTimer.subtract( absenceTimer.getSpentTime() );
        });
    };

    // settings

    toggleSettingsModal = (newSettings) => {
        utils.log('toggleSettingsModal');
        let newState = {showSettingsModal: !this.state.showSettingsModal};
        if (this.state.showSettingsModal) {
            newState = {
                ...newState,
                settings: {...newSettings}
            };
        }
        this.setState(newState);
    };

    // restore data

    restoreTasks = () => {
        utils.log('restoreTasks');
        const tasks = utils.restore('tasks');
        this.setState({ tasks }, () => {
            ts.setMultipleTimers(tasks);
        });
    };

    // lifecycle

    componentWillUnmount = () => {
        clearInterval(this.intervalRef);
    };

    componentWillMount = () => {
        ts.setTimer('absence').start();
        ts.setTimer('session').start();
        this.restoreTasks();
    };

    componentDidUpdate = (nextProps, nextState) => {
        const haveTasksChanged = !utils.areArraysEqual(nextState.tasks, this.state.tasks);
        // track any changes in this.state.tasks
        if (haveTasksChanged) {
            utils.log('backup tasks');
            utils.backup('tasks', this.state.tasks);
        }
    };

    // not used
    presenceConfirmed = () => {
        utils.log('presenceConfirmed');
        ts.getTimer('absence').clear();
        utils.backup('tasks', this.state.tasks);
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

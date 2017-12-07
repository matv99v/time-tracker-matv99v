import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';

import CreateTask  from './CreateTask.jsx';
import ActiveTask  from './ActiveTask.jsx';
import TasksList   from './TasksList.jsx';
import Settings    from './Settings.jsx';
import ModalDialog from './ModalDialog.jsx';
import tabTitler   from '../tabTitler.js';
import utilities   from '../utilities.js';
import ts          from '../timersStorage.js';




export default class App extends React.Component {
    state = {
        tasks              : [],
        activeTaskId       : null,
        remindTime         : (1000 * 60) * 30,
        absenceTime        : (1000 * 60),
        activationTimeStamp: Date.now(),
        areYouHereTimeStamp: null,
        isWatcherActive    : false,
        areYouHereModal    : false
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
        ts.addTimer(id);
        this.setState({tasks: newTasks});
    };

    handleStartTask = (taskId) => {
        clearInterval(this.intervalId);
        const prevActiveTaskId = this.state.activeTaskId;
        const newStateTasks = [...this.state.tasks];

        newStateTasks.forEach( (task) => {
            if (task.id === taskId) {
                task.isActive = true;
                ts[task.id].start();
            }
            if (task.id === prevActiveTaskId) {
                task.isActive = false;
                ts[task.id].stop();
            }
        });

        this.initTimerInterval();
        this.setState({tasks: newStateTasks, activeTaskId: taskId}, this.activeTaskIdChanged);
    };

    activeTaskIdChanged = () => {
        console.log('activeTaskIdChanged');
        // if (this.state.activeTaskId) {
        //     ts[this.state.activeTaskId].start();
        // } else {
        //     ts[this.state.activeTaskId].stop();
        // }
    };

    handleStopTask = (taskId) => {
        clearInterval(this.intervalId);
        const newTasks = [...this.state.tasks];
        const targetTask = utilities.getTaskById(newTasks, taskId);
        targetTask.isActive = false;
        ts[targetTask.id].stop();

        this.setState({tasks: newTasks, activeTaskId: null}, this.activeTaskIdChanged);
    };

    handleClearTimer = (taskId) => {
        if (confirm('Are you sure want to clear time?')) {
            const newStateTasks = [...this.state.tasks];
            const targetTask = newStateTasks.find((task) => task.id === taskId);
            targetTask.spentTime = ts[taskId].getSpentTime();
            ts[taskId].clear();
            this.setState({tasks: newStateTasks});
        }
    };

    handleDeleteTask = (taskId) => {
        if (confirm('Are you sure want to delete task?')) {
            const newStateTasks = this.state.tasks.filter( (task) => task.id !== taskId );

            if (this.state.activeTaskId === taskId) {
                clearInterval(this.intervalId);
                this.setState({tasks: newStateTasks, activeTaskId: null}, this.activeTaskIdChanged);
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
            activeTask.spentTime = ts[activeTask.id].getSpentTime();

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
            <Grid>

                <Row>
                    <Col>
                        <Settings
                            stopActiveTask  = {this.stopActiveTaskHandler}
                            reminderTime    = {this.state.reminderTime}
                            absenceTime     = {this.state.absenceTime}
                            isWatcherActive = {this.state.isWatcherActive}
                            toggleWatcher   = {this.toggleWatcherHandler}
                            generalTime = {this.getGeneralTime()}
                            isVisible   = {this.state.tasks.length}

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
                        tasks           = {this.state.tasks}
                        onStartTask     = {this.handleStartTask}
                        onStopTask      = {this.handleStopTask}
                        onClearTimer    = {this.handleClearTimer}
                        onDeleteTask    = {this.handleDeleteTask}
                    />
                </Row>

                <Row>
                    <ModalDialog
                        isVisible     = {this.state.areYouHereModal}
                        header        = {'Watcher'}
                        body          = {'Are you here?'}
                        btnWording    = {'yes'}
                        clickYesCb    = {this.confirmPresenceClickHandler}
                    />
                </Row>

            </Grid>

        );
    }
}

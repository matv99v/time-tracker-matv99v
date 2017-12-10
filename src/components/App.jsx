import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';

import CreateTask  from './CreateTask.jsx';
import TasksList   from './TasksList.jsx';
import Settings    from './Settings.jsx';
import ModalDialog from './ModalDialog.jsx';
import tabTitler   from '../tabTitler.js';
import utilities   from '../utilities.js';
import ts          from '../timersStorage.js';
import notifyMe    from '../notifyMe';



const initId = Date.now();

const initTasks = [
    {
        name     : 'test1',
        spentTime: 3000,
        isActive : false,
        // id: initId
    },
    {
        name     : 'test2',
        spentTime: 5000,
        isActive : false,
        // id: initId + 1
    },
    {
        name     : 'test3',
        spentTime: 1000 * 62,
        isActive : false,
        // id: initId + 2
    }
];

initTasks.forEach((task, i) => {
    task.id = initId + i;
    ts.addTimer(task.id, task.spentTime);

});


export default class App extends React.Component {
    state = {
        tasks              : initTasks,
        activeTaskId       : null,
        remindTime         : (1000 * 60) * 0.08,
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
        this.presenceConfirmed();
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
        this.setState({tasks: newStateTasks, activeTaskId: taskId});
        this.presenceConfirmed();
        tabTitler.setPlay();
    };

    handleStopTask = (taskId) => {
        clearInterval(this.intervalId);
        const newTasks = [...this.state.tasks];
        const targetTask = utilities.getTaskById(newTasks, taskId);
        targetTask.isActive = false;
        ts[targetTask.id].stop();

        this.setState({tasks: newTasks, activeTaskId: null}, this.activeTaskIdChanged);
        this.presenceConfirmed();
        tabTitler.setStop();
    };

    handleClearTimer = (taskId) => {
        this.presenceConfirmed();

        if (!confirm('Are you sure want to clear time?')) {
            return;
        }
        const newStateTasks = [...this.state.tasks];
        const targetTask = newStateTasks.find((task) => task.id === taskId);
        targetTask.spentTime = ts[taskId].getSpentTime();
        ts[taskId].clear();
        this.setState({tasks: newStateTasks});
    };

    handleDeleteTask = (taskId) => {
        this.presenceConfirmed();

        if (!confirm('Are you sure want to delete task?')) {
            return;
        }

        const newStateTasks = this.state.tasks.filter( (task) => task.id !== taskId );

        if (this.state.activeTaskId === taskId) {
            clearInterval(this.intervalId);
            this.setState({tasks: newStateTasks, activeTaskId: null});
        } else {
            this.setState({tasks: newStateTasks});
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
        if (this.state.isWatcherActive && !this.state.areYouHereModal && ts.idleTimer.getSpentTime() > this.state.remindTime) {
            notifyMe.spawnNotification();
            this.setState({areYouHereModal: true});
            tabTitler.startSprites();
        }
    };

    presenceConfirmed = () => {
        ts.idleTimer.clear();
    };

    getGeneralTime = () => {
        return this.state.tasks.reduce((sum, task) => sum + task.spentTime, 0);
    };

    componentWillUnmount = () => {
        clearInterval(this.intervalId);
    };

    componentWillMount = () => {
        console.log('componentWilMount');
        ts.startIdleTimer();
    };

    stopActiveTaskHandler = () => {
        console.log('stopActiveTaskHandler');
        this.handleStopTask(this.state.activeTaskId);
    };

    toggleWatcherHandler = () => {
        this.setState({isWatcherActive: !this.state.isWatcherActive});
        console.log('toggleWatcherHandler');
        this.presenceConfirmed();
    };

    leaveAsIsCb = () => {
        console.log('leaveAsIsCb');
        tabTitler.stopSprites();
        this.setState({areYouHereModal: false});
        this.presenceConfirmed();
    };

    revertTime = () => {
        console.log('revertTime');
        const newTasks = [...this.state.tasks];
        const activeTask = newTasks.find(task => task.isActive);

        ts[activeTask.id].subtract(
            ts.idleTimer.getSpentTime()
        );

        const test1 = ts[activeTask.id].getSpentTime();
        const test2 = ts.idleTimer.getSpentTime();
        const test3 = test1 - test2;


        tabTitler.stopSprites();
        this.setState({areYouHereModal: false, tasks: newTasks});
        this.presenceConfirmed();
    };

    changeRemindTimeHandler = (event) => {
        console.log('changeRemindTimeHandler');
        this.presenceConfirmed();
        this.setState({remindTime: event.target.value * 60 * 1000});
    };

    render() {
        return (
            <Grid>

                <Row>
                    <Col>
                        <Settings
                            isWatcherActive = {this.state.isWatcherActive}
                            toggleWatcher   = {this.toggleWatcherHandler}
                            generalTime = {this.getGeneralTime()}
                            idleTime = {ts.idleTimer.getSpentTime()}
                            remindTime = {this.state.remindTime / 60000}
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
                        leaveAsIsCb    = {this.leaveAsIsCb}
                        revertTime    = {this.revertTime}
                        idleTime = {ts.idleTimer.getSpentTime()}
                    />
                </Row>

            </Grid>

        );
    }
}

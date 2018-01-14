import React       from 'react';
import ts              from '../timersStorage.js';



export default class TimerElBaseLifecycle extends React.Component {
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
        }

    };
}

'use strict';
import Timer from './Timer.js';

const timers = {};

const retIt = {};

retIt.setTimer = (id, startTime = 0) => {
    timers[id] = new Timer(startTime);
    return timers[id];
};

retIt.getTimer = (id) => {
    return timers[id];
};

retIt.deleteTimer = (id) => {
    delete timers[id];
};

retIt.getAllTimers = () => {
    return timers;
};

// retIt.startAbsenceTimer = () => {
//     retIt.absenceTimer = new Timer();
//     retIt.absenceTimer.start();
// };
//
// retIt.startSessionTimer = () => {
//     retIt.sessionTimer = new Timer();
//     retIt.sessionTimer.start();
// };


module.exports = retIt;

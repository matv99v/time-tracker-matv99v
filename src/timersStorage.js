'use strict';
import Timer from './Timer.js';


const ts = {};

ts.deleteTimer = (id) => {
    delete ts[id];
};

ts.addTimer = (id, startTime = 0) => {
    ts[id] = new Timer(startTime);
};

ts.startIdleTimer = () => {
    ts.idleTimer = new Timer();
    ts.idleTimer.start();
};


module.exports = ts;

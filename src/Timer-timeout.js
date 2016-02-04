'use strict';

class Timer {
    constructor() {
        this.currentTime = 0;   // actual evaluating time
        this.timerID = 0;       // timer ID for clearTimeout
        this.interval = 50;     // time division

        this.tick = () => {
            this.currentTime += this.interval;
            console.log(this.currentTime);
            this.timerID = setTimeout(this.tick, this.interval);   // recursive timeOut call with specified interval
        };
    }

    start() {
        this.currentTime += this.interval;
        this.timerID = setTimeout(this.tick, this.interval);
    }

    stop() {
        clearTimeout(this.timerID);
    }

    getSpentTime() {
        return this.currentTime;
    }

    clear() {
        this.currentTime = 0;
    }
}

module.exports = Timer;

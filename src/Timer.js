'use strict';

class Timer {
    constructor() {
        this.isPlaying = false;
        this.startTimeStamp = 0;
        this.accumulatedTime = 0;
    }

    start() {
        if (!this.isPlaying) {
            this.startTimeStamp = Date.now();
        }
        this.isPlaying = true;
    }

    stop() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.accumulatedTime += (Date.now() - this.startTimeStamp);
        }
    }

    getSpentTime() {
        if (this.isPlaying && this.startTimeStamp ) {
            return Date.now() - this.startTimeStamp + this.accumulatedTime;
        }
        return this.accumulatedTime;
    }

    clear() {
        this.startTimeStamp = 0;
        this.accumulatedTime = 0;
    }
}

module.exports = Timer;

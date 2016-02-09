'use strict';

const Timer  = require('../src/Timer');
const assert = require('chai').assert;

suite('Timer Matv99v test');

test('Check one second time measurment custom test', (done) => {
    const timer = new Timer();
    timer.start();

    setTimeout(() => {
        timer.clear();
    }, 1000);

    setTimeout(() => {
        assert.closeTo(timer.getSpentTime(), 1000, 50);
        done();
    }, 2000);
});

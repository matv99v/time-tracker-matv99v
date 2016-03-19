'use strict';

const Timer      = require('../src/Timer');
const dump       = require('./dump');
const express    = require('express');
const bodyParser = require('body-parser');
const mongojs    = require('mongojs');
const db         = mongojs('timerTracker', ['tasks']);
const Promise    = require('bluebird');
const LIVR       = require('livr');
LIVR.Validator.defaultAutoTrim(true);

Promise.promisifyAll([
    require('mongojs/lib/collection'),
    require('mongojs/lib/database'),
    require('mongojs/lib/cursor')
]);

const app = express();
app.use( bodyParser.json() );

// db.tasks.remove();

app.get('/api/v1/tasks', (request, response) => {
    db.tasks.findAsync()
    .then(tasks => response.json({
        status: 1,
        data: tasks
    }))
    .catch(console.error);
});

app.post('/api/v1/tasks', (request, response) => {
    const validator = new LIVR.Validator({
        data: ['required', {'nested_object': {
            name: [ 'required', {'min_length': 3} ]
        }}]
    });
    const validData = validator.validate(request.body);

    if (validData) {
        const taskData = {
            name: validData.data.name,
            spent: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            status: 'INACTIVE'
        };

        db.tasks.saveAsync(taskData)
        .then(savedTask => {
            response.json({
                status: 1,
                data: savedTask
            })
            dump(db.tasks);
        }).catch(console.error);
    } else {
        response.json({
            status: 0,
            error: validator.getErrors()
        });
    }

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

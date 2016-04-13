'use strict';

const Timer      = require('../src/Timer');
const utils      = require('./utils');
const express    = require('express');
const bodyParser = require('body-parser');
const mongojs    = require('mongojs');
const Promise    = require('bluebird');
const LIVR       = require('livr');
const db         = mongojs('timerTracker', ['tasks']);
LIVR.Validator.defaultAutoTrim(true);

Promise.promisifyAll([
    require('mongojs/lib/collection'),
    require('mongojs/lib/database'),
    require('mongojs/lib/cursor')
]);

const app = express();
app.use( bodyParser.json() );

// list all tasks
app.get('/api/v1/tasks', (request, response) => {
    db.tasks.findAsync()
    .then(savedTasks => response.json({
        status: 1,
        data: savedTasks.map(task => utils.format(task))
    }))
    .catch(console.error);
});

// get task by id
app.get('/api/v1/tasks/:id', (request, response) => {
    db.tasks.findOneAsync( {_id: mongojs.ObjectID(request.params.id)} )
    .then(task => {
        response.json({
            status: 1,
            data: utils.format(task)
        });
    })
    .catch(err => console.error);
});

// delete task by id
app.delete('/api/v1/tasks/:id', (request, response) => {
    db.tasks.findOneAsync( {_id: mongojs.ObjectID(request.params.id)} )
    .then(taskToDelete => {
        if (taskToDelete) {
            db.tasks.remove(taskToDelete);
            response.json({status: 1});
        } else {
            response.json({status: 1, msg: 'unknown task id'});
        }
    })
    .catch(err => console.error);
});

// delete task collection
app.delete('/api/v1/tasks', (request, response) => {
    db.tasks.removeAsync()
    .then(() => {
        response.json({
            status: 1,
            msg  : 'all tasks deleted'
        });
    })
    .catch(err => console.error);
});

// create task
app.post('/api/v1/tasks', (request, response) => {
    const validator = new LIVR.Validator({
        data: ['required', {'nested_object': {
            name: [ 'required', {'min_length': 3} ]
        }}]
    });
    const validData = validator.validate(request.body);

    if (validData) {
        const task = {
            name     : validData.data.name,
            spent    : 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            status   : 'INACTIVE'
        };
        db.tasks.insertAsync(task)
        .then(task => response.json({
            status: 1,
            data: utils.format(task)
        }))
        .catch(err => console.error);
    } else {
        response.json({
            status: 0,
            error: validator.getErrors()
        });
    }
});

// start
app.put('/api/v1/tasks/:id/start', (request, response) => {
    const validator = new LIVR.Validator({
        data: ['required', {'nested_object': {
            id: [ 'required' ]
        }}]
    });

    const validData = validator.validate(request.body);

    if (validData) {
        db.tasks.findOneAsync( {_id: mongojs.ObjectID(request.params.id)} )
        .then(task => {
            task.spent     = 'toDo:::getTimerSpentTime';  // TO DO
            task.updatedAt = Date.now();
            task.status    = 'ACTIVE';
            return task;
        }).then(task => {
            db.tasks.update({_id: mongojs.ObjectID(request.params.id)}, {$set: task});
            response.json({
                status: 1,
                data: utils.format(task)
            });
        })
        .then(() => db.tasks.updateAsync({
            _id: {$ne: mongojs.ObjectID(request.params.id)},
            status: 'ACTIVE'
        },
        {$set: {
            status: 'INACTIVE',
            updatedAt: Date.now()
        }}
        ))
        .catch(err => console.error);

    } else {
        response.json({
            status: 0,
            error: validator.getErrors()
        });
    }
});

// stop
app.put('/api/v1/tasks/:id/stop', (request, response) => {
    const validator = new LIVR.Validator({
        data: ['required', {'nested_object': {
            id: [ 'required' ]
        }}]
    });

    const validData = validator.validate(request.body);

    if (validData) {
        db.tasks.findOneAsync( {_id: mongojs.ObjectID(request.params.id)} )
        .then(task => {
            task.spent     = 'toDo:::getTimerSpentTime';  // TO DO
            task.updatedAt = Date.now();
            task.status    = 'INACTIVE';
            return task;
        }).then(task => {
            db.tasks.update({_id: mongojs.ObjectID(request.params.id)}, {$set: task});
            response.json({
                status: 1,
                data: utils.format(task)
            });
        })
        .catch(err => console.error);

    } else {
        response.json({
            status: 0,
            error: validator.getErrors()
        });
    }
});

// clear
app.put('/api/v1/tasks/:id/clear', (request, response) => {
    const validator = new LIVR.Validator({
        data: ['required', {'nested_object': {
            id: [ 'required' ]
        }}]
    });

    const validData = validator.validate(request.body);

    if (validData) {
        db.tasks.findOneAsync( {_id: mongojs.ObjectID(request.params.id)} )
        .then(task => {
            task.spent     = 0;
            task.updatedAt = Date.now();
            return task;
        }).then(task => {
            db.tasks.update({_id: mongojs.ObjectID(request.params.id)}, {$set: task});
            response.json({
                status: 1,
                data: utils.format(task)
            });
        })
        .catch(err => console.error);

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

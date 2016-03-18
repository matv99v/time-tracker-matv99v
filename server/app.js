'use strict';

const dump       = require('./dump');
const express    = require('express');
const bodyParser = require('body-parser');
const LIVR       = require('livr');
const mongojs    = require('mongojs');
const db         = mongojs('timerTracker', ['tasks']);
const Promise    = require('bluebird');

Promise.promisifyAll([
    require('mongojs/lib/collection'),
    require('mongojs/lib/database'),
    require('mongojs/lib/cursor')
]);

LIVR.Validator.defaultAutoTrim(true);
const app = express();
app.use( bodyParser.json() );

app.get('/api/v1/tasks', (request, response) => {
    db.tasks.findAsync()
    .then(tasks => response.json(tasks)).catch(console.error)
    ;
});

app.post('/api/v1/tasks', (request, response) => {
    const data = request.body;
    db.tasks.insert(data);
    dump(db);
    response.send('done');
});

app.post('/api/v1/tasks', (request, response) => {
    db.tasks.insert(request.body);
    dump(db);
    response.send('done');
});


app.delete('/api/v1/tasks', (request, response) => {
    db.tasks.remove();
    dump(db);
    response.send('done');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

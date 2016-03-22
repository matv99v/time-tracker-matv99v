const moment = require('moment');


module.exports = {
    format: (task) => {
        return {
            id       : task._id,
            name     : task.name,
            spent    : task.spent,
            createdAt: moment(task.createdAt).utc(),
            updatedAt: moment(task.updatedAt).utc(),
            status   : task.status
        };
    }
}

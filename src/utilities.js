const retIt = {};

retIt.getTaskById = (tasks, id) => {
    return tasks.find((task) => task.id === id);
};


module.exports = retIt;

module.exports = (db) => {
    const fs = require('fs');
    const data = db.tasks.find((err, result) => {

            result = JSON.stringify(result, null, 4);

            fs.writeFile("dataBase.json", result, (err) => {
                if(err) return console.log(err);
            });
});
};

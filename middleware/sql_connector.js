const mysql = require('mysql')

const executeQuery = async (query) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1qaz2wsx',
        database: 'diybiller'
    });

    let result, isError= false;

    await connection.connect(function (err) {
        if (err) {
            isError = true;
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) {
                isError = true;
                // throw error;
                reject(error);
            }
            // console.log(results);
            // connection.end()
            resolve(results);
            // return { results, isError }
        })
    })
}

module.exports = executeQuery


const { connection } = require('./model/postgres');

connection
    .sync({
        alter: true,
    })
    .then(() => {
        console.log('Database synced');
        connection.close();
    });

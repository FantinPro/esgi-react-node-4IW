require('./src/core/env');
const User = require('./src/model/postgres/User.postgres');

// const connection = require('./src/core/db/postgres/db.postgres');

// connection
//     .sync({ force: true })
//     .then(() => {
//         console.log('Database synced');
//     })
//     .catch((err) => {
//         console.error('Error while syncing database', err);
//     }).finally(() => {
//         connection.close();
//         process.exit(0);
//     });

User.sync({ force: true }).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Error while syncing database', err);
}).finally(() => {
    process.exit(0);
});

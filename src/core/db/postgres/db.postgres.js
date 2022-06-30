require('../../env');
const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.POSTGRES_DATABASE_URL, {
    newUrlParser: true,
});

connection.authenticate().then(() => {
    console.log('Postgres (with sequelize) default connection open.');
}).catch((err) => {
    console.error(`Unable to connect to the database >> ${process.env.POSTGRES_DATABASE_URL}:`, err);
}).finally(() => {
    if (process.env.AUTO_SYNC_DATABASE) {
        return connection.sync({ alter: true }).then(() => {
            console.log('database synced');
        }).catch((err) => {
            console.error('Error while synced database', err);
        });
    }
    return 0;
});

module.exports = connection;

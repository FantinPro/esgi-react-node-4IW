/* eslint-disable no-undef */
require('../src/core/env');
require('../src/core/db/postgres/db.postgres');

const fixture = async () => {
    await connect();
    const fixtures = [];
    // await Entity.deleteMany({});
    console.log(`${restaurants.length} restaurants to be inserted`);
    // await Entity.insertMany(restaurants);
};

fixture().then(
    () => {
        console.log('Entity fixtures done');
        process.exit(0);
    },
)
    .catch((e) => {
        console.error('error :>> ', e);
        process.exit(1);
    });

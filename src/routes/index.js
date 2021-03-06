const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const messageRoutes = require('./message.routes');
const friendRoutes = require('./friend.routes');

const router = express.Router();

const routes = [
    {
        path: 'auth',
        routes: authRoutes,
    },
    {
        path: 'users',
        routes: userRoutes,
    },
    {
        path: 'messages',
        routes: messageRoutes,
    },
    {
        path: 'friends',
        routes: friendRoutes,
    },
];

routes.forEach((route) => {
    router.use(`/${route.path}`, route.routes);
});

module.exports = router;

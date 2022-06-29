const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

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
];

routes.forEach((route) => {
    router.use(`/${route.path}`, route.routes);
});

module.exports = router;

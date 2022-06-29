require('./core/env');
require('./core/db/mongodb/db.mongodb');
const express = require('express');
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const config = require('./config/config');
const passportConfig = require('./config/passport');
const { authorized } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error');
const routes = require('./routes/index');
const User = require('./model/postgres/User.postgres');

const server = express();

server.use(
    cors({
        origin: [config.frontBaseUrl], // only allow front call
        credentials: true,
    }),
);
server.use(bodyParser.json());
morganBody(server, {
    logResponseBody: true,
});
server.use(express.json());

passportConfig.initialize(server);

server.get('/', async (req, res) => {
    res.json('Welcome ! <3 damn c la meilleur api du monde, svp mettez bonne note');
});

server.get('/test-authorize', authorized(), async (req, res) => {
    res.json('authorized :)');
});

server.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    }),
);

server.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    (req, res, next) => {
        try {
            const { user, token } = req.user;
            res.redirect(
                `${config.frontBaseUrl}/auth/google/callback?user=${JSON.stringify(
                    user,
                )}&token=${token}`,
            );
        } catch (e) {
            next(e);
        }
    },
);

server.use(routes);

server.use(errorHandler);

server.listen(config.expressPort, () => console.log(`server started on port ${config.expressPort} with env ${config.env}`));

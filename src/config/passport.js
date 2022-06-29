const { ExtractJwt } = require('passport-jwt/lib');
const JwtStrategy = require('passport-jwt/lib/strategy');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config');
const usersService = require('../services/user.service');
const tokensService = require('../services/token.service');
const User = require('../model/postgres/User.postgres');

const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findByPk(payload.id);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const googleVerify = async (accessToken, refreshToken, profile, cb) => {
    try {
        const { id, emails } = profile;
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await usersService.createUser({
                googleId: id,
                email: emails[0].value,
            });
            // dont't need to do this but if we want to store display name in the future, we will update it.
            User.update({ googleId: id }, { where: { id: user.id } });
        }
        const token = await tokensService.getAccessTokens(user);

        cb(null, { user, token });
    } catch (error) {
        cb(error, false);
    }
};

const initialize = function (app) {
    // init default passport behavior
    app.use(passport.initialize());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // add jwt strategy
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret,
    };
    passport.use(
        new JwtStrategy(opts, jwtVerify),
    );

    // google strategy
    passport.use(new GoogleStrategy.Strategy({
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
    }, googleVerify));
};

module.exports = {
    initialize,
};

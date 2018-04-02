const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const keys = require('./keys');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new OAuth2Strategy(
    {
      //options for the typeform strategy
      authorizationURL: 'https://api.typeform.com/oauth/authorize',
      tokenURL: 'https://api.typeform.com/oauth/token',
      clientID: keys.typeform.clientID,
      clientSecret: keys.typeform.clientSecret,
      callbackURL: '/auth/typeform/redirect'
    },
    (accessToken, refreshToken, profile, cb) => {
      // passport callback function fires AFTER exchanging code for profile info
      // check if user already exists in the DB
      cb(null, { access_token: accessToken });
    }
  )
);

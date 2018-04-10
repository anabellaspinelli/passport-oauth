const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new OAuth2Strategy(
    {
      //options for the typeform strategy
      authorizationURL: 'https://api.typeform.com/oauth/authorize',
      tokenURL: 'https://api.typeform.com/oauth/token',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/typeform/redirect'
    },
    (accessToken, refreshToken, profile, cb) => {
      // passport callback function fires after exchanging code for profile info
      cb(null, { access_token: accessToken });
    }
  )
);

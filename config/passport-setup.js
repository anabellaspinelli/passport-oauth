const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    clientID:
      '468235828330-60laqlu9nv57ki2o67qv8fvefbjnkvgq.apps.googleusercontent.com',
    clientSecret: '3LHTkx5Se5pvMOTSSgPHnzF6'
  }),
  () => {
    // passport callback function
  }
);

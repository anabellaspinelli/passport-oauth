const router = require('express').Router();
const passport = require('passport');
const fs = require('fs');
const path = require('path');

const scopes = JSON.parse(
  fs.readFileSync(path.resolve('./config/scopes.json'))
);

// login page
router.get('/login', (req, res) => {
  res.render('login', { user: req.user, scopes });
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//auth with typeform
router.get('/typeform', (req, res) => {
  passport.authenticate('oauth2', {
    scope: Object.keys(req.query).filter(scope => req.query[scope] == 'on')
  })(req, res);
});

// callback route for google to redirect to
router.get(
  '/typeform/redirect',
  passport.authenticate('oauth2'),
  (req, res) => {
    // this fires AFTER the passport callback function
    // the user obj comes in the request as per passport.serialize/deserialize

    res.redirect('/dashboard');
  }
);

module.exports = router;

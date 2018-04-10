const router = require('express').Router();
const passport = require('passport');
const scopes = require('../config/scopes');
const querystring = require('querystring');

let selectedScopes;

// login page
router.get('/login', (req, res) => {
  res.render('login', { scopes });
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//auth with typeform
router.get('/typeform', (req, res) => {
  selectedScopes = Object.keys(req.query).filter(
    scope => req.query[scope] == 'on'
  );

  passport.authenticate('oauth2', {
    scope: selectedScopes
  })(req, res);
});

// callback route for typeform to redirect to
router.get(
  '/typeform/redirect',
  passport.authenticate('oauth2'),
  (req, res) => {
    // this fires AFTER the passport callback function
    // the user obj comes in the request as per passport.serialize/deserialize
    const query = querystring.stringify({ selectedScopes: selectedScopes });
    res.redirect('/dashboard?' + query);
  }
);

module.exports = router;

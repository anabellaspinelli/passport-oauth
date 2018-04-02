const router = require('express').Router();
const passport = require('passport');

// login page
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//auth with google
router.get(
  '/typeform',
  passport.authenticate('oauth2', {
    scope: ['forms:read']
  })
);

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

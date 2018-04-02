const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    // user is not logged in
    return res.redirect('/auth/login');
  }
  next();
};

router.use('/', authCheck, (req, res) => {
  res.send(`you are logged in, this is your profile: ${req.user.username}`);
});

module.exports = router;

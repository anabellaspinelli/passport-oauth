const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    // user is not logged in
    return res.redirect('/auth/login');
  }
  next();
};

router.use('/', authCheck, (req, res) => {
  res.render('profile', {
    user: req.user
  });
});

module.exports = router;

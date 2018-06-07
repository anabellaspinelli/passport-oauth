const router = require('express').Router()
const typeformScopes = require('../../config/scopes')

const authCheck = (req, res, next) => {
  if (!req.isAuthenticated) {
    // user is not logged in
    return res.redirect('/auth/login')
  }
  next()
}

router.use('/', authCheck, (req, res) => {
  res.render('dashboard', {
    user: req.user,
    typeformScopes,
    selectedScopes: req.query.selectedScopes
  })
})

module.exports = router

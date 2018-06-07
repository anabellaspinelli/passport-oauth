const router = require('express').Router()
const passport = require('passport')
const TypeformStrategy = require('passport-typeform')
const querystring = require('querystring')

const scopes = require('../../config/scopes')

let selectedScopes

// login page
router.get('/login', (req, res) => {
  res.render('login', { scopes })
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// auth with typeform
router.get('/typeform', (req, res) => {
  selectedScopes = Object.keys(req.query).filter(
    scope => req.query[scope] == 'on'
  )

  passport.use(
    new TypeformStrategy(
      {
        // options for the typeform strategy
        authorizationURL: process.env.AUTHORIZATION_URL,
        tokenURL: process.env.TOKEN_URL,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URL || '/auth/typeform/redirect',
        scope: selectedScopes
      },
      (accessToken, refreshToken, profile, cb) => {
        // passport callback function fires after exchanging code for profile info
        cb(null, { access_token: accessToken, profile })
      }
    )
  )

  passport.authenticate('typeform')(req, res)
})

// callback route for typeform to redirect to
router.get(
  '/typeform/redirect',
  (req, res, next) => {
    if (!req.query.code) {
      return res.redirect('/auth/login')
    }

    passport.authenticate('typeform')(req, res, next)
  },
  (req, res) => {
    // this fires AFTER the passport callback function
    // the user obj comes in the request as per passport.serialize/deserialize
    const query = querystring.stringify({ selectedScopes })
    res.redirect('/dashboard?' + query)
  }
)

module.exports = router

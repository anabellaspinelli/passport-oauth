const path = require('path')

const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
const dotenv = require('dotenv')

// eslint-disable-next-line no-unused-vars
const passportSetup = require('./config/passport-setup')

const authRoutes = require('./routes/auth-routes')
const dashboardRoutes = require('./routes/dashboard-routes')
const typeformRoutes = require('./routes/typeform-api-routes')

const app = express()
require('dotenv').config() // export .env variables
app.set('view engine', 'ejs')

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['aCookieKey']
  })
)

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/typeform', typeformRoutes)

app.get('/', (req, res) => {
  res.render('home', { user: req.user })
})

app.get('/disclaimer', (req, res) => {
  res.render('disclaimer', { user: req.user })
})

// Start app
const port = process.env.PORT || 9031

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app and running at http://localhost:${port}`)
})

const express = require('express');
const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});

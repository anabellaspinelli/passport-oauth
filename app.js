const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const typeformRoutes = require('./routes/typeform-api-routes');

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

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/typeform', typeformRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const path = require('path');
const authController = require('./controllers/auth.js');
const comicsController = require('./controllers/comics.js');
const usersController = require('./controllers/users.js');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Locked and loading @ ${mongoose.connection.name}.`);
});

mongoose.connection.once('error', () => {
  console.log(`Watch yourself, mongo is trippin' again`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(passUserToView);



app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/comics`);
  } else {
    res.render('index.ejs');
  }
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/comics', comicsController);
app.use('/users', usersController);

app.listen(port, () => {
  console.log(`Express is locked in @ ${port}!`);
});

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();

require('dotenv').config();


dotenv.config();

const app = express();

//testing
app.get("/", (req, res) => {
  res.send("<h1>Server Started</h1>");
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", // React client URL
    credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport')(passport);

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/letters', require('./routes/letters'));

const PORT = process.env.PORT || 5000;
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

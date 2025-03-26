// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const dotenv = require('dotenv');
// const cors = require('cors');
// require('dotenv').config();

// require('dotenv').config();
// const url = process.env.CLIENT_URL || 'https://letter-writer-app.netlify.app';

// dotenv.config();

// const app = express();

// //testing
// app.get("/", (req, res) => {
//   res.send("<h1>Server Started</h1>");
// })

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: url, // React client URL
//     credentials: true
// }));

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'secret',
//   resave: false,
//   saveUninitialized: false,
// }));

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport configuration
// require('./config/passport')(passport);

// // Routes
// app.use('/auth', require('./routes/auth'));
// app.use('/letters', require('./routes/letters'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port:  ${PORT}`));


const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();

dotenv.config();
const url = process.env.CLIENT_URL || 'https://letter-writer-app.netlify.app';

const app = express();

// Testing route
app.get("/", (req, res) => {
  res.send("<h1>Server Started</h1>");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: url,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // 'lax' for local development
  }
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
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

const express = require('express');
const passport = require('passport');
const router = express.Router();

const frontendUrl = process.env.CLIENT_URL || 'https://letter-writer-app-frontend.vercel.app';

router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
  accessType: 'offline',
  prompt: 'consent'
}));

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: `${frontendUrl}/?login_failed=true`,
    session: true
  }),
  (req, res) => {
    // Successful authentication
    res.redirect(`${frontendUrl}/home`);
  }
);

router.get('/failure', (req, res) => {
  res.redirect(`${frontendUrl}/?login_failed=true`);
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.redirect(frontendUrl);
    });
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        emails: req.user.emails,
        accessToken: req.user.accessToken
      } 
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
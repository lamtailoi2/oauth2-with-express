import "dotenv/config";
import express from "express";
import { googleStrategy } from "./configs/passport/googleStrategy.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
const app = express();
const port = 3000;

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to MongoDB");
})
passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1>
              <a href="/auth/google">Login with Google</a>`);
  });
  
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/profile');
    }
  );
  
  app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }
    res.send(`<h1>Profile</h1>
              <p>${req.user.displayName}</p>
              <a href="/logout">Logout</a>`);
  });
  
  app.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
  });
  
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
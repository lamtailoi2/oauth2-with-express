import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import "dotenv/config";
import usersOAuthModel from '../../models/usersOAuth.model.js';

export const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        
        
        let user = await usersOAuthModel.findOne({ googleId: profile.id });
        if (!user) {
            user = await usersOAuthModel.create({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
});

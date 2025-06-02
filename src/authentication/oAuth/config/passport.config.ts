import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import OAuthUser from '../models/oauthUser.model.js';

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL!,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        let user = await OAuthUser.findOne({ githubId: profile.id });

        if (!user) {
          user = await OAuthUser.create({
            githubId: profile.id,
            email: profile.emails[0].value,
            username: profile.username,
            displayName: profile.displayName || profile.username,
            profileUrl: profile.profileUrl,
            avatarUrl: profile.photos[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id || user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await OAuthUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport; 
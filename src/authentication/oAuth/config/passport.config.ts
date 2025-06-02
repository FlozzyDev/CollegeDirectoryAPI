import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import OAuthUser from '../models/oauthUser.model.js';

const isProduction = process.env.NODE_ENV === 'production';

const clientID = isProduction
  ? process.env.GITHUB_CLIENT_ID!
  : process.env.DEV_GITHUB_CLIENT_ID!;

const clientSecret = isProduction
  ? process.env.GITHUB_CLIENT_SECRET!
  : process.env.DEV_GITHUB_CLIENT_SECRET!;

const callbackURL = isProduction
  ? process.env.CALLBACK_URL!
  : process.env.DEV_CALLBACK_URL!;

const baseUrl = isProduction 
  ? 'https://collegedirectoryapi.onrender.com'
  : 'http://localhost:3000';

passport.use(
  new GitHubStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        console.log('GitHub OAuth callback info:', { //debug info
          profileId: profile.id,
          username: profile.username,
          hasEmails: !!profile.emails,
        });

        let user = await OAuthUser.findOne({ githubId: profile.id });

        // The main thing we need is the ID, all else I don't care about for now
        if (!user) {
          user = await OAuthUser.create({
            githubId: profile.id,
            username: profile.username || `github_user_${profile.id}`,
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : `github_${profile.id}@placeholder.com`,
            displayName: profile.displayName || profile.username || `GitHub User ${profile.id}`,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error('Error in GitHub OAuth callback:', error);
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

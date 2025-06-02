import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import indexRoute from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from './authentication/oAuth/config/passport.config.js';
import session from 'express-session';

const app = express();
app.set('trust proxy', 1); // needed for both render and local development

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = isProduction 
  ? ['https://collegedirectoryapi.onrender.com']
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'wtfakfbkajbtrwhert31!#123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction, // Only use secure cookies in production, need to test locally
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: isProduction ? 'none' : 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRoute);

export default app;

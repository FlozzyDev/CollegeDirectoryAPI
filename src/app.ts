import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import indexRoute from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from './authentication/oAuth/config/passport.config.js';
import session from 'express-session';

const app = express();

app.use(
  cors({
    origin: ['https://collegedirectoryapi.onrender.com', 'http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// We have to add this for OAuth to work as the custom session doesn't have the proper logic to handle the exchange
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'wtfakfbkajbtrwhert31!#123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRoute);

export default app;

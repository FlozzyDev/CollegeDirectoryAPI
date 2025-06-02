import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import indexRoute from './routes/index.js';
import cookieParser from 'cookie-parser';
import passport from './authentication/oAuth/config/passport.config.js';

const app = express();

app.use(
  cors({
    origin: ['https://collegedirectoryapi.onrender.com', 'http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRoute);

export default app;

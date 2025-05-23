import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import indexRoute from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: ['https://collegedirectoryapi.onrender.com', 'http://localhost:3000'],
  })
);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRoute);

export default app;

import dotenv from 'dotenv';
import initDb from './db/connection.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    await initDb();
    console.log(`Server started, database connected. Running on port ${PORT}.`);
  } catch (error) {
    console.error(`Server failed to launch`, (error as Error).message);
  }
};

startServer();

app.listen(PORT, () => {
  console.log(`Server started, database connected. Running on port ${PORT}.`);
});

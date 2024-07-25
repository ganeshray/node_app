import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router/index.js'
import errorHandler from './middleware/errorMiddleware.js';
import { con } from './config/db.js';
import path from 'path';
import fileUpload from 'express-fileupload';
dotenv.config();
const dbStr = process.env.MONGO_URI;

con(dbStr);
const app = express();
const port = process.env.PORT;
app.use(
  fileUpload({
      limits: {
          fileSize: 10000000,
      },
      abortOnLimit: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./')));

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});
app.use('/api',router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
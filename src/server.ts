import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { config } from './config/config';
import getScheduleRoutes from './routes/ScheduleRoutes';

const app = express();

export function initServer() {
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.use(express.json());

  app.use(bodyParser.json());
  app.use(cors());

  app.use('/', getScheduleRoutes());

  app.use((err: any, req: express.Request, res: express.Response) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });


}

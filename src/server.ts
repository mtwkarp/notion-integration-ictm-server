import bodyParser from 'body-parser';
import { config } from './config/config';
import ScheduleRoutes from './routes/ScheduleRoutes';
import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(bodyParser.json());
app.use(
  cors({
    origin: config.allowedOrigins
  })
);

app.use('/', ScheduleRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

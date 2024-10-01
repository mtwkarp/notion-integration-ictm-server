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

  type DateRecord = Record<string, string[]>;

  function removeMatchingDates(obj1: DateRecord, obj2: DateRecord): DateRecord {
    // Create a copy of the first object to avoid mutating the original
    const result = { ...obj1 };

    for (const key in obj2) {
      if (result[key]) {
        // Filter out dates that match those in the second object
        result[key] = result[key].filter(date => !obj2[key].includes(date));

        // If there are no more dates left, delete the property
        if (result[key].length === 0) {
          delete result[key];
        }
      }
    }

    return result;
  }

// Example usage
  const obj1: DateRecord = {
    userId1: ["2024-10-03", "2024-09-27", "2024-10-05"],
    userId2: ["2024-09-30", "2024-10-01"]
  };

  const obj2: DateRecord = {
    userId1: ["2024-10-03", "2024-09-27"],
    userId2: ["2024-09-30"]
  };

  const result = removeMatchingDates(obj1, obj2);
  console.log(result);
}

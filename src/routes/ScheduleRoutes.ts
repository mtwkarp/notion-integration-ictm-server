import { Router } from 'express';
import SchedulePublishController from '../controllers/implementations/notion/SchedulePublishController';

const router = Router();
const mainController = new SchedulePublishController();

router.post('/scheduleData', mainController.handleRequest);

export default router;

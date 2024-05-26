import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';

const router = Router();
const mainController = new ScheduleController();

router.post('/api/request', mainController.handleRequest);

export default router;

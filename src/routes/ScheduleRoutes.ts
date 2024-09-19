import { Router } from 'express';
import SchedulePublishController from '../controllers/implementations/notion/SchedulePublishController';
import CourseInstructorsUpdateController from '../controllers/implementations/notion/CourseInstructorsUpdateController';

const router = Router();
const schedulePublishController = new SchedulePublishController();
const courseInstructorsUpdateController = new CourseInstructorsUpdateController();

router.post('/scheduleData', schedulePublishController.handleRequest);
router.post('/updateCoursesAvailableInstructors', courseInstructorsUpdateController.handleRequest);

export default router;

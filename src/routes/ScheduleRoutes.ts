import { Router } from 'express';
import dependenciesContainer from '../IoC/dependenciesContainer';
import { Types } from '../IoC/Types';
import { IController } from '../controllers/types/interfaces';

const router = Router();
const schedulePublishController: IController = dependenciesContainer.get(Types.SchedulePublishController);
const courseInstructorsUpdateController: IController = dependenciesContainer.get(Types.CourseInstructorsUpdateController);

router.post('/scheduleData', schedulePublishController.handleRequest);
router.post('/updateCoursesAvailableInstructors', courseInstructorsUpdateController.handleRequest);

export default router;

import { ContainerModule, interfaces } from 'inversify';
import { Types } from '../Types';
import { IController } from '../../controllers/types/interfaces';
import CourseInstructorsUpdateController from '../../controllers/implementations/notion/CourseInstructorsUpdateController';
import SchedulePublishController from '../../controllers/implementations/notion/SchedulePublishController';

export const controllersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IController>(Types.CourseInstructorsUpdateController).to(CourseInstructorsUpdateController);
  bind<IController>(Types.SchedulePublishController).to(SchedulePublishController);
});

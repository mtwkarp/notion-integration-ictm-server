import { ContainerModule, interfaces } from 'inversify';
import { IService } from '../../services/types/interfaces';
import { Types } from '../Types';
import CourseInstructorsUpdateService from '../../services/implementations/notion/CourseInstructorsUpdateService';
import SchedulePublishService from '../../services/implementations/notion/SchedulePublishService';

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IService>(Types.CourseInstructorsUpdateService).to(CourseInstructorsUpdateService);
  bind<IService>(Types.SchedulePublishService).to(SchedulePublishService);
});

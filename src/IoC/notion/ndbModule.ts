import { ContainerModule, interfaces } from 'inversify';
import { Types } from '../Types';
import CoursesScheduleNDB from '../../notion/databases/coursesSchedule/CoursesScheduleNDB';
import CoursesScheduleNDBEditWatcher from '../../notion/databases/editWatchers/implementations/CoursesScheduleNDBEditWatcher';
import InstructorPersonalAvailabilityNDB from '../../notion/databases/instructors/InstructorPersonalAvailabilityNDB';
import InstructorsNDB from '../../notion/databases/instructors/InstructorsNDB';
import InstructorsAvailabilityNDB from '../../notion/databases/instructors/schedule/InstructorsAvailabilityNDB';
import { ICoursesScheduleNDB } from '../../notion/databases/coursesSchedule/types/interfaces';
import { INDBEditWatcher } from '../../notion/databases/editWatchers/types/interfaces';
import {
  IInstructorPersonalAvailabilityNDB,
  IInstructorsAvailabilityNDB,
  IInstructorsNDB,
} from '../../notion/databases/instructors/types/interfaces';

export const ndbModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICoursesScheduleNDB>(Types.CoursesScheduleNDB).to(CoursesScheduleNDB);
  bind<INDBEditWatcher>(Types.CoursesScheduleNDBEditWatcher).to(CoursesScheduleNDBEditWatcher);
  bind<IInstructorPersonalAvailabilityNDB>(Types.InstructorsPersonalAvailabilityNDB).to(InstructorPersonalAvailabilityNDB);
  bind<IInstructorsNDB>(Types.InstructorsNDB).to(InstructorsNDB);
  bind<IInstructorsAvailabilityNDB>(Types.InstructorsAvailabilityNDB).to(InstructorsAvailabilityNDB);
});

import AbstractService from '../../AbstractService';
import CoursesScheduleDatabaseEditWatcher from '../../../notion/databases/editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import CoursesScheduleDatabase from '../../../notion/databases/coursesSchedule/CoursesScheduleDatabase';
import InstructorsDatabase from '../../../notion/databases/instructors/InstructorsDatabase';
import InstructorsAvailabilityDatabase from '../../../notion/databases/instructors/schedule/InstructorsAvailabilityDatabase';

export default class SchedulePublishService extends AbstractService {
  constructor() {
    super();
  }
}

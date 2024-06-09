import AbstractService from '../../AbstractService';
import CoursesScheduleDatabaseEditWatcher from '../../../notion/databases/editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import CoursesScheduleDatabase from '../../../notion/databases/coursesSchedule/CoursesScheduleDatabase';

export default class SchedulePublishService extends AbstractService {
  constructor() {
    super();

    const d = new CoursesScheduleDatabase();
  }
}

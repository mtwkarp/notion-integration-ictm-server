import AbstractService from '../../AbstractService';
import CoursesScheduleDatabaseEditWatcher from '../../../notion/databases/editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import CoursesScheduleDatabase from '../../../notion/databases/coursesSchedule/CoursesScheduleDatabase';
import InstructorsDatabase from '../../../notion/databases/instructors/InstructorsDatabase';
import InstructorsAvailabilityDatabase from '../../../notion/databases/instructors/schedule/InstructorsAvailabilityDatabase';
import InstructorPersonalAvailabilityDatabase from '../../../notion/databases/instructors/InstructorPersonalAvailabilityDatabase';
import { Client } from '@notionhq/client';
import { IUsersScheduleCollection } from '../../../db/collections/implementations/types/interfaces';
import UsersScheduleCollection from '../../../db/collections/implementations/UsersScheduleCollection';
import { ICoursesScheduleDB } from '../../../notion/databases/coursesSchedule/types/interfaces';

export default class CourseInstructorsUpdateService extends AbstractService {
  private readonly coursesScheduleDatabase: ICoursesScheduleDB = new CoursesScheduleDatabase();

  public override handleRequest(data: any): { message: string; receivedData: any } {
    console.log('update available instructors request received');

    this.coursesScheduleDatabase
      .updateAvailableUsersOnCoursePages()
      .then(() => console.log('All available users for courses updated'))
      .catch((err) => console.log(err));

    return {
      message: 'Request received successfully',
      receivedData: data
    };
  }
}

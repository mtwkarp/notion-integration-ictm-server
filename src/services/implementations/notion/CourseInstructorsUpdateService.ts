import AbstractService from '../../AbstractService';
import CoursesScheduleDatabaseEditWatcher from '../../../notion/databases/editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import CoursesScheduleDatabase from '../../../notion/databases/coursesSchedule/CoursesScheduleDatabase';
import InstructorsDatabase from '../../../notion/databases/instructors/InstructorsDatabase';
import InstructorsAvailabilityDatabase from '../../../notion/databases/instructors/schedule/InstructorsAvailabilityDatabase';
import InstructorPersonalAvailabilityDatabase from '../../../notion/databases/instructors/InstructorPersonalAvailabilityDatabase';
import { Client } from '@notionhq/client';
import { IUsersScheduleCollection } from '../../../db/collections/implementations/types/interfaces';
import UsersScheduleCollection from '../../../db/collections/implementations/UsersScheduleCollection';

export default class CourseInstructorsUpdateService extends AbstractService {
  public override handleRequest(data: any): { message: string; receivedData: any } {
    console.log('update available instructors request received');
    return {
      message: 'Request received successfully',
      receivedData: data
    };
  }
}

import AbstractService from '../../AbstractService';
import CoursesScheduleDatabaseEditWatcher from '../../../notion/databases/editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import CoursesScheduleDatabase from '../../../notion/databases/coursesSchedule/CoursesScheduleDatabase';
import InstructorsDatabase from '../../../notion/databases/instructors/InstructorsDatabase';
import InstructorsAvailabilityDatabase from '../../../notion/databases/instructors/schedule/InstructorsAvailabilityDatabase';
import InstructorPersonalAvailabilityDatabase from '../../../notion/databases/instructors/InstructorPersonalAvailabilityDatabase';
import { Client } from '@notionhq/client';
import { IUsersScheduleCollection } from '../../../db/collections/implementations/types/interfaces';
import UsersScheduleCollection from '../../../db/collections/implementations/UsersScheduleCollection';

export default class SchedulePublishService extends AbstractService {
  private readonly usersScheduleCollection: IUsersScheduleCollection = new UsersScheduleCollection();

  constructor() {
    super();
  }

  public override handleRequest(data: { instructorId: string }) {
    this.saveScheduleData(data.instructorId);

    return {
      message: 'Request received successfully',
      receivedData: data
    };
  }

  private async saveScheduleData(userId: string): Promise<void> {
    const instructorAvailabilityDatabase = new InstructorsDatabase();
    const dates = await instructorAvailabilityDatabase.getInstructorAvailableDatesByUserId(userId);

    await this.usersScheduleCollection.setUserSchedule(userId, dates);
  }
}

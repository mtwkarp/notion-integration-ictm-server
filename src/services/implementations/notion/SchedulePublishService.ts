import AbstractService from '../../AbstractService';
import CoursesScheduleDatabaseEditWatcher from '../../../notion/databases/editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import CoursesScheduleDatabase from '../../../notion/databases/coursesSchedule/CoursesScheduleDatabase';
import InstructorsDatabase from '../../../notion/databases/instructors/InstructorsDatabase';
import InstructorsAvailabilityDatabase from '../../../notion/databases/instructors/schedule/InstructorsAvailabilityDatabase';
import InstructorPersonalAvailabilityDatabase from '../../../notion/databases/instructors/InstructorPersonalAvailabilityDatabase';
import { Client } from '@notionhq/client';

export default class SchedulePublishService extends AbstractService {
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

  private async saveScheduleData(instructorId: string): Promise<void> {
    const instructorAvailabilityDatabase = new InstructorsDatabase();
    const dates = await instructorAvailabilityDatabase.getInstructorAvailableDatesByUserId(instructorId);

    console.log(dates);
  }
}

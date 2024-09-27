import { inject, injectable } from 'inversify';
import AbstractService from '../../AbstractService';
import InstructorsNDB from '../../../notion/databases/instructors/InstructorsNDB';
import { IUsersScheduleCollection } from '../../../db/collections/implementations/types/interfaces';
import { Types } from '../../../IoC/Types';

@injectable()
export default class SchedulePublishService extends AbstractService {
  private readonly usersScheduleCollection: IUsersScheduleCollection;

  constructor(@inject(Types.UsersScheduleCollection) usersCollection: IUsersScheduleCollection) {
    super();
    this.usersScheduleCollection = usersCollection;
  }

  public override handleRequest(data: { instructorId: string }): { message: string; receivedData: any } {
    this.saveScheduleData(data.instructorId);

    return {
      message: 'Request received successfully',
      receivedData: data,
    };
  }

  private async saveScheduleData(userId: string): Promise<void> {
    const instructorAvailabilityDatabase = new InstructorsNDB();
    const dates = await instructorAvailabilityDatabase.getInstructorAvailableDatesByUserId(userId);

    await this.usersScheduleCollection.setUserSchedule(userId, dates);
  }
}

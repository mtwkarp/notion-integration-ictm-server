import { inject, injectable } from 'inversify';
import AbstractService from '../../AbstractService';
import { ICoursesScheduleNDBModifier } from '../../../notion/databases/coursesSchedule/types/interfaces';
import { Types } from '../../../IoC/Types';

@injectable()
export default class CourseInstructorsUpdateService extends AbstractService {
  private readonly coursesScheduleNDB: ICoursesScheduleNDBModifier;

  constructor(@inject(Types.CoursesScheduleNDBModifier) scheduleNDB: ICoursesScheduleNDBModifier) {
    super();
    this.coursesScheduleNDB = scheduleNDB;
  }

  public override handleRequest(data: any): { message: string; receivedData: any } {
    console.log('update available instructors request received');

    this.coursesScheduleNDB
      .updateAvailableUsersOnCoursePages()
      .then(() => console.log('All available users for courses updated'))
      .catch((err) => console.log(err));

    return {
      message: 'Request received successfully',
      receivedData: data,
    };
  }
}

import { inject, injectable } from 'inversify';
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import AbstractNDBEditWatcher from '../AbstractNDBEditWatcher';
import { ICoursesScheduleNDBDataGetter, ICoursesScheduleNDBModifier } from '../../coursesSchedule/types/interfaces';
import { Types } from '../../../../IoC/Types';

@injectable()
export default class CoursesScheduleNDBEditWatcher extends AbstractNDBEditWatcher {
  private lastDatabaseAssignedInstructors: string = '';

  private coursesScheduleNDBDataGetter: ICoursesScheduleNDBDataGetter;

  constructor(@inject(Types.CoursesScheduleNDBDataGetter) coursesScheduleNDBDataGetter: ICoursesScheduleNDBDataGetter,) {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);
    this.coursesScheduleNDBDataGetter = coursesScheduleNDBDataGetter
  }

  protected async setLastDatabaseAssignedInstructors(): Promise<void> {
    this.lastDatabaseAssignedInstructors = await this.getAssignedInstructorsJoin();
  }

  protected async getAssignedInstructorsJoin(): Promise<string> {
    const currentCourses = await this.coursesScheduleNDBDataGetter.getCurrentCourses();
    const allOccupiedInstructorsIds: string[] = [];

    for (let i = 0; i < currentCourses.length; i++) {
      const course = currentCourses[i];
      // @ts-ignore
      const assignedInstructors = course.properties['Інструктори'].people as UserObjectResponse[];

      for (let j = 0; j < assignedInstructors.length; j++) {
        allOccupiedInstructorsIds.push(assignedInstructors[j].id);
      }
    }

    return allOccupiedInstructorsIds.join('');
  }

  protected override async checkForEdits(): Promise<void> {
    const assignedInstructors = await this.getAssignedInstructorsJoin();

    if (this.lastDatabaseAssignedInstructors !== assignedInstructors) {
      await this.setLastDatabaseAssignedInstructors();
      this.onRecentEdit();
    }
  }
}

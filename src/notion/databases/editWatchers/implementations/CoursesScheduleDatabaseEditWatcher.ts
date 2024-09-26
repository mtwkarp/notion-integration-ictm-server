import AbstractNotionDatabaseEditWatcher from '../AbstractNotionDatabaseEditWatcher';
import { injectable } from 'inversify';
import { ICoursesScheduleDB } from '../../coursesSchedule/types/interfaces';
import CoursesScheduleDatabase from '../../coursesSchedule/CoursesScheduleDatabase';
import { UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';

@injectable()
export default class CoursesScheduleDatabaseEditWatcher extends AbstractNotionDatabaseEditWatcher {
  private lastDatabaseAssignedInstructors: string = '';
  private scheduleDatabase: ICoursesScheduleDB = new CoursesScheduleDatabase();

  constructor() {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);
  }

  protected async setLastDatabaseAssignedInstructors(): Promise<void> {
    this.lastDatabaseAssignedInstructors = await this.getAssignedInstructorsJoin();
  }

  protected async getAssignedInstructorsJoin(): Promise<string> {
    const currentCourses = await this.scheduleDatabase.getCurrentCourses();
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

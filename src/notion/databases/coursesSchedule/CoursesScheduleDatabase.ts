import AbstractNotionDatabase from '../AbstractNotionDatabase';
import { INotionDatabaseEditWatcher } from '../editWatchers/types/interfaces';
import CoursesScheduleDatabaseEditWatcher from '../editWatchers/implementations/CoursesScheduleDatabaseEditWatcher';
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { DatabaseResult } from '../types/types';
import ASMCoursePage from '../../pages/courses/ASM/ASMCoursePage';

export default class CoursesScheduleDatabase extends AbstractNotionDatabase {
  private editsWatcher: INotionDatabaseEditWatcher;

  constructor() {
    super(process.env.NOTION_COURSES_SCHEDULE_DATABASE_ID);

    this.editsWatcher = new CoursesScheduleDatabaseEditWatcher();
    this.initialize();
  }

  private initialize(): void {
    this.subscribe();
    this.editsWatcher.runWatchInterval();
  }

  private subscribe(): void {
    this.editsWatcher.subscribeObserver(this.onDatabaseEdit, this);
  }

  private async onDatabaseEdit(): Promise<void> {
    const lastEditedCourseDayPage = await this.getLastEditedPage();

    await this.updateAvailableInstructorsAtCourseDayPage(lastEditedCourseDayPage);
  }

  private async updateAvailableInstructorsAtCourseDayPage(databaseObject: DatabaseObjectResponse): Promise<void> {
    const coursePage = new ASMCoursePage(databaseObject.id);

    await coursePage.fillAvailableInstructorsProperty();
  }

  private async getLastEditedPage(): Promise<DatabaseObjectResponse> {
    const results = (await this.getDatabaseResults()) as DatabaseObjectResponse[];

    const lastEditedTimestamps = results.map((result) => {
      return new Date(result.last_edited_time);
    });

    const mostRecentEdit = new Date(
      Math.max.apply(
        null,
        lastEditedTimestamps.map((date) => {
          return date.getTime();
        })
      )
    ).toISOString();

    const mostRecentEditedPage = results.find((result) => {
      return result.last_edited_time === mostRecentEdit;
    });

    if (!mostRecentEditedPage) {
      throw new Error('No overlap in last edited page date.');
    }

    return mostRecentEditedPage;
  }
}
